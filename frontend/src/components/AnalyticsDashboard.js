import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Activity, Users, Globe, Clock, Eye, AlertTriangle, 
  MapPin, Smartphone, TrendingUp, TrendingDown, Wifi, WifiOff
} from 'lucide-react';
import { gsap } from 'gsap';
import axios from 'axios';
import analyticsService from '../services/analyticsService';

const AnalyticsDashboard = ({ backendUrl, getAuthHeaders }) => {
  const [analytics, setAnalytics] = useState(null);
  const [devToolsAlerts, setDevToolsAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const dashboardRef = useRef(null);
  const statsCardsRef = useRef([]);

  useEffect(() => {
    loadAnalyticsData();
    setupRealTimeAlerts();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (analytics && !loading) {
      animateStatsCards();
    }
  }, [analytics, loading]);

  const loadAnalyticsData = async () => {
    try {
      const [statsRes, alertsRes] = await Promise.all([
        axios.get(`${backendUrl}/api/analytics/stats`, { headers: getAuthHeaders() }),
        axios.get(`${backendUrl}/api/analytics/dev-tools-alerts?limit=20`, { headers: getAuthHeaders() })
      ]);

      setAnalytics(statsRes.data);
      setDevToolsAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealTimeAlerts = () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      analyticsService.joinAdminRoom(token);
      analyticsService.onDevToolsAlert((alert) => {
        setRealTimeAlerts(prev => [alert, ...prev.slice(0, 4)]);
        
        // Show notification animation
        gsap.fromTo('.alert-notification', {
          x: 300,
          opacity: 0
        }, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        });
      });
    }
  };

  const animateStatsCards = () => {
    gsap.fromTo(statsCardsRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.9
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)"
    });
  };

  const resolveAlert = async (alertId) => {
    try {
      await axios.put(
        `${backendUrl}/api/analytics/dev-tools-alerts/${alertId}/resolve`,
        {},
        { headers: getAuthHeaders() }
      );
      setDevToolsAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, resolved: true } : alert
        )
      );
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ${seconds % 60}s`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "primary" }) => (
    <div 
      ref={el => statsCardsRef.current.push(el)}
      className={`bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-${color} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-${color}/20 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{subtitle}</div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2 text-white">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div ref={dashboardRef} className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2 text-green-400">
          <Wifi className="w-4 h-4" />
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      {/* Real-time Alert Notifications */}
      {realTimeAlerts.length > 0 && (
        <div className="alert-notification bg-red-900/50 border border-red-500 rounded-lg p-4 mb-6">
          <div className="flex items-center mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <h3 className="text-red-400 font-semibold">Recent Dev Tools Activity</h3>
          </div>
          {realTimeAlerts.slice(0, 2).map((alert, index) => (
            <div key={index} className="text-sm text-gray-300 mb-1">
              User from {alert.location} opened dev tools on {alert.page_url}
            </div>
          ))}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Visitors"
          value={analytics?.total_visitors?.toLocaleString() || '0'}
          subtitle="All time visitors"
          color="blue-500"
        />
        <StatCard
          icon={Activity}
          title="Active Sessions"
          value={analytics?.active_sessions || '0'}
          subtitle="Currently browsing"
          color="green-500"
        />
        <StatCard
          icon={Clock}
          title="Avg. Session"
          value={formatTime(analytics?.avg_session_duration || 0)}
          subtitle="Time spent on site"
          color="purple-500"
        />
        <StatCard
          icon={AlertTriangle}
          title="Dev Tools Alerts"
          value={analytics?.dev_tools_alerts || '0'}
          subtitle="Last 7 days"
          color="red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Most Visited Pages */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <Eye className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-white">Most Visited Pages</h3>
          </div>
          <div className="space-y-3">
            {analytics?.most_visited_pages?.slice(0, 8).map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                <div className="flex-1">
                  <div className="text-white font-medium truncate">{page.page}</div>
                  <div className="text-gray-400 text-sm">
                    Avg. time: {formatTime(page.avg_time_spent)}
                  </div>
                </div>
                <div className="text-primary font-bold">{page.views}</div>
              </div>
            )) || <div className="text-gray-400">No data available</div>}
          </div>
        </div>

        {/* Visitor Countries */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-white">Visitor Locations</h3>
          </div>
          <div className="space-y-3">
            {analytics?.visitor_countries?.slice(0, 8).map((country, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-white">{country.country}</span>
                </div>
                <span className="text-primary font-bold">{country.visitors}</span>
              </div>
            )) || <div className="text-gray-400">No location data</div>}
          </div>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 text-primary mr-2" />
          <h3 className="text-xl font-semibold text-white">Recent Visitors (Last 24h)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-2 text-gray-300">Location</th>
                <th className="text-left p-2 text-gray-300">Browser</th>
                <th className="text-left p-2 text-gray-300">Time Spent</th>
                <th className="text-left p-2 text-gray-300">Visit Time</th>
              </tr>
            </thead>
            <tbody>
              {analytics?.recent_visitors?.slice(0, 10).map((visitor, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="p-2 text-white">
                    {visitor.city}, {visitor.country}
                  </td>
                  <td className="p-2 text-gray-300">{visitor.browser}</td>
                  <td className="p-2 text-gray-300">{formatTime(visitor.time_spent)}</td>
                  <td className="p-2 text-gray-300">
                    {new Date(visitor.timestamp).toLocaleString()}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">
                    No recent visitors
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dev Tools Alerts */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <h3 className="text-xl font-semibold text-white">Developer Tools Alerts</h3>
          </div>
          <div className="text-sm text-gray-400">
            {devToolsAlerts.filter(alert => !alert.resolved).length} unresolved
          </div>
        </div>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {devToolsAlerts.map((alert, index) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded border ${
                alert.resolved 
                  ? 'bg-gray-700/30 border-gray-600' 
                  : 'bg-red-900/20 border-red-500/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    alert.resolved ? 'bg-gray-500' : 'bg-red-500 animate-pulse'
                  }`} />
                  <span className="text-white font-medium">
                    {alert.city}, {alert.country}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(alert.timestamp).toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-gray-300 mb-2">
                <div>Page: {alert.page_url}</div>
                <div>Browser: {alert.browser}</div>
                <div>IP: ***{alert.ip_address?.slice(-3)}</div>
              </div>
              {!alert.resolved && (
                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))}
          {devToolsAlerts.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No developer tools alerts yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;