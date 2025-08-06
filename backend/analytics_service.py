import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import re
from user_agents import parse as parse_user_agent
import requests

class AnalyticsService:
    def __init__(self):
        self.reader = None
        print("Analytics service initialized")

    def get_location_data(self, ip_address: str) -> Dict[str, Optional[str]]:
        """Get location data from IP address using a free IP geolocation service"""
        if ip_address in ['127.0.0.1', 'localhost', '::1']:
            return {
                'country': 'Local',
                'city': 'Local',
                'region': 'Local',
                'latitude': None,
                'longitude': None
            }

        try:
            # Using ipapi.co free service (100 requests per day limit)
            response = requests.get(f'https://ipapi.co/{ip_address}/json/', timeout=5)
            if response.status_code == 200:
                data = response.json()
                return {
                    'country': data.get('country_name', 'Unknown'),
                    'city': data.get('city', 'Unknown'),
                    'region': data.get('region', 'Unknown'),
                    'latitude': float(data.get('latitude')) if data.get('latitude') else None,
                    'longitude': float(data.get('longitude')) if data.get('longitude') else None
                }
        except Exception as e:
            print(f"Error getting location for IP {ip_address}: {e}")

        # Fallback for demo purposes
        return {
            'country': 'Unknown',
            'city': 'Unknown', 
            'region': 'Unknown',
            'latitude': None,
            'longitude': None
        }

    def parse_user_agent(self, user_agent: str) -> Dict[str, str]:
        """Parse user agent string"""
        try:
            ua = parse_user_agent(user_agent)
            return {
                'browser': f"{ua.browser.family} {ua.browser.version_string}",
                'device': f"{ua.device.brand} {ua.device.model}".strip() if ua.device.brand else ua.os.family,
                'os': f"{ua.os.family} {ua.os.version_string}"
            }
        except Exception as e:
            print(f"Error parsing user agent: {e}")
            return {
                'browser': 'Unknown',
                'device': 'Unknown',
                'os': 'Unknown'
            }

    async def calculate_analytics_stats(self, db) -> Dict:
        """Calculate comprehensive analytics statistics"""
        try:
            # Get current time and time ranges
            now = datetime.utcnow()
            last_24h = now - timedelta(hours=24)
            last_7d = now - timedelta(days=7)
            last_30d = now - timedelta(days=30)

            # Total and unique visitors
            total_visitors = await db.visitor_sessions.count_documents({})
            unique_visitors = len(await db.visitor_sessions.distinct("visitor_id"))

            # Active sessions (last 30 minutes)
            active_cutoff = now - timedelta(minutes=30)
            active_sessions = await db.visitor_sessions.count_documents({
                "session_start": {"$gte": active_cutoff},
                "session_end": None
            })

            # Total sessions and page views
            total_sessions = await db.visitor_sessions.count_documents({})
            total_page_views = await db.page_views.count_documents({})

            # Average session duration
            sessions_with_duration = await db.visitor_sessions.find({
                "session_end": {"$ne": None}
            }).to_list(1000)
            
            avg_duration = 0
            if sessions_with_duration:
                durations = [s.get('total_time_spent', 0) for s in sessions_with_duration if s.get('total_time_spent', 0) > 0]
                avg_duration = sum(durations) / len(durations) if durations else 0

            # Most visited pages
            page_views_agg = await db.page_views.aggregate([
                {"$group": {"_id": "$page_url", "count": {"$sum": 1}, "avg_time": {"$avg": "$time_spent"}}},
                {"$sort": {"count": -1}},
                {"$limit": 10}
            ]).to_list(10)

            most_visited = [
                {
                    "page": item["_id"],
                    "views": item["count"],
                    "avg_time_spent": round(item.get("avg_time", 0), 2)
                } for item in page_views_agg
            ]

            # Visitor countries
            countries_agg = await db.visitor_sessions.aggregate([
                {"$match": {"country": {"$ne": None, "$ne": "Unknown"}}},
                {"$group": {"_id": "$country", "count": {"$sum": 1}}},
                {"$sort": {"count": -1}},
                {"$limit": 10}
            ]).to_list(10)

            visitor_countries = [
                {"country": item["_id"], "visitors": item["count"]}
                for item in countries_agg
            ]

            # Recent visitors (last 24 hours)
            recent_visitors_data = await db.visitor_sessions.find({
                "session_start": {"$gte": last_24h}
            }).sort("session_start", -1).limit(20).to_list(20)

            recent_visitors = [
                {
                    "visitor_id": visitor.get("visitor_id"),
                    "country": visitor.get("country", "Unknown"),
                    "city": visitor.get("city", "Unknown"),
                    "browser": visitor.get("browser", "Unknown"),
                    "time_spent": visitor.get("total_time_spent", 0),
                    "timestamp": visitor.get("session_start")
                } for visitor in recent_visitors_data
            ]

            # Dev tools alerts count
            dev_tools_alerts = await db.dev_tools_alerts.count_documents({
                "timestamp": {"$gte": last_7d}
            })

            return {
                "total_visitors": total_visitors,
                "unique_visitors": unique_visitors,
                "total_sessions": total_sessions,
                "avg_session_duration": round(avg_duration, 2),
                "total_page_views": total_page_views,
                "most_visited_pages": most_visited,
                "visitor_countries": visitor_countries,
                "recent_visitors": recent_visitors,
                "dev_tools_alerts": dev_tools_alerts,
                "active_sessions": active_sessions
            }

        except Exception as e:
            print(f"Error calculating analytics stats: {e}")
            return {
                "total_visitors": 0,
                "unique_visitors": 0,
                "total_sessions": 0,
                "avg_session_duration": 0,
                "total_page_views": 0,
                "most_visited_pages": [],
                "visitor_countries": [],
                "recent_visitors": [],
                "dev_tools_alerts": 0,
                "active_sessions": 0
            }

# Global analytics service instance
analytics_service = AnalyticsService()