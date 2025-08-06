from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class VisitorSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    visitor_id: str  # Unique visitor identifier
    session_start: datetime = Field(default_factory=datetime.utcnow)
    session_end: Optional[datetime] = None
    ip_address: str
    user_agent: str
    country: Optional[str] = None
    city: Optional[str] = None
    region: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    pages_visited: List[str] = Field(default_factory=list)
    total_time_spent: int = 0  # in seconds
    referrer: Optional[str] = None
    browser: Optional[str] = None
    device: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PageView(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    visitor_id: str
    session_id: str
    page_url: str
    page_title: str
    time_spent: int = 0  # in seconds
    scroll_depth: Optional[int] = None  # percentage
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class DevToolsAlert(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    visitor_id: str
    session_id: str
    ip_address: str
    user_agent: str
    page_url: str
    country: Optional[str] = None
    city: Optional[str] = None
    browser: Optional[str] = None
    alert_type: str = "dev_tools_opened"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    resolved: bool = False

class AnalyticsStats(BaseModel):
    total_visitors: int = 0
    unique_visitors: int = 0
    total_sessions: int = 0
    avg_session_duration: float = 0.0
    total_page_views: int = 0
    most_visited_pages: List[Dict[str, Any]] = Field(default_factory=list)
    visitor_countries: List[Dict[str, Any]] = Field(default_factory=list)
    recent_visitors: List[Dict[str, Any]] = Field(default_factory=list)
    dev_tools_alerts: int = 0
    active_sessions: int = 0

class VisitorSessionCreate(BaseModel):
    visitor_id: str
    ip_address: str
    user_agent: str
    referrer: Optional[str] = None

class PageViewCreate(BaseModel):
    visitor_id: str
    session_id: str
    page_url: str
    page_title: str
    time_spent: int = 0
    scroll_depth: Optional[int] = None

class DevToolsAlertCreate(BaseModel):
    visitor_id: str
    session_id: str
    ip_address: str
    user_agent: str
    page_url: str