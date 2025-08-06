from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import socketio
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timedelta
import jwt
import bcrypt
from enum import Enum
from contextlib import asynccontextmanager

# Import analytics models and service
from analytics_models import (
    VisitorSession, PageView, DevToolsAlert, AnalyticsStats,
    VisitorSessionCreate, PageViewCreate, DevToolsAlertCreate
)
from analytics_service import analytics_service

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create Socket.IO server
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins="*",
    logger=True,
    engineio_logger=True
)

# JWT settings
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default-secret-key')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_TIME = timedelta(hours=24)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Portfolio Backend API started")
    yield
    # Shutdown
    client.close()
    logger.info("Database connection closed")

# Create the main app with lifespan support
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Admin credentials (in production, store hashed passwords in database)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'admin123')

# Enums
class ProjectStatus(str, Enum):
    planned = "planned"
    development = "development" 
    completed = "completed"

# Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AboutSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    subtitle: str
    description: str
    profile_picture_url: Optional[str] = None
    context: str
    philosophy: str
    academic_focus: List[str]
    technical_skills: List[str]
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class AboutSectionUpdate(BaseModel):
    subtitle: Optional[str] = None
    description: Optional[str] = None
    profile_picture_url: Optional[str] = None
    context: Optional[str] = None
    philosophy: Optional[str] = None
    academic_focus: Optional[List[str]] = None
    technical_skills: Optional[List[str]] = None

class ExperienceSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    technical_skills: List[Dict[str, Any]]  # [{"name": "Python", "level": 90}]
    current_status: Dict[str, str]  # {"academic_level": "...", "learning_focus": "...", "future_goals": "..."}
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ExperienceSectionUpdate(BaseModel):
    technical_skills: Optional[List[Dict[str, Any]]] = None
    current_status: Optional[Dict[str, str]] = None

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    date: str
    status: ProjectStatus
    technologies: List[str]
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str
    description: str
    date: str
    status: ProjectStatus
    technologies: List[str]
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    status: Optional[ProjectStatus] = None
    technologies: Optional[List[str]] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class TimelineEvent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    year: str
    title: str
    description: str
    location: str
    tags: List[str]
    date_range: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class TimelineEventCreate(BaseModel):
    year: str
    title: str
    description: str
    location: str
    tags: List[str]
    date_range: str

class TimelineEventUpdate(BaseModel):
    year: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    tags: Optional[List[str]] = None
    date_range: Optional[str] = None

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    author: str = "Prabashwara"
    published: bool = False
    tags: List[str]
    featured_image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    published: bool = False
    tags: List[str]
    featured_image_url: Optional[str] = None

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    published: Optional[bool] = None
    tags: Optional[List[str]] = None
    featured_image_url: Optional[str] = None

class ContactInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    location: str
    email: str
    phone: Optional[str] = None
    social_links: Dict[str, str]  # {"github": "url", "linkedin": "url", "twitter": "url"}
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInfoUpdate(BaseModel):
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    social_links: Optional[Dict[str, str]] = None

# Utility functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + JWT_EXPIRATION_TIME
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Authentication endpoints
@api_router.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    # Simple username/password check (in production, use hashed passwords)
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        access_token = create_access_token(data={"sub": request.username})
        return {"access_token": access_token, "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Incorrect username or password")

@api_router.get("/auth/verify")
async def verify_auth(current_user: str = Depends(verify_token)):
    return {"message": "Token is valid", "username": current_user}

# Basic endpoints
@api_router.get("/")
async def root():
    return {"message": "Portfolio Backend API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# About Section Management
@api_router.get("/about", response_model=AboutSection)
async def get_about():
    about = await db.about.find_one()
    if about:
        return AboutSection(**about)
    # Return default values if not found
    default_about = {
        "subtitle": "Mathematics Student",
        "description": "My name is Rivibibu Prabashwara, and I'm currently studying in an advanced level in science stream.",
        "context": "I study advanced mathematics, physics, chemistry, programming, networking, and cryptography-like subjects.",
        "philosophy": "I believe in continuous learning and improvement. Every day brings new opportunities to discover, understand, and grow both intellectually and personally.",
        "academic_focus": ["Mathematics (Pure & Applied)", "Physics & Chemistry", "Advanced Level Sciences"],
        "technical_skills": ["Programming & Development", "Networking & Systems", "Cryptography & Security"]
    }
    about_obj = AboutSection(**default_about)
    await db.about.insert_one(about_obj.dict())
    return about_obj

@api_router.put("/about", response_model=AboutSection)
async def update_about(about_update: AboutSectionUpdate, current_user: str = Depends(verify_token)):
    existing_about = await db.about.find_one()
    if existing_about:
        # Update existing
        update_data = {k: v for k, v in about_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        await db.about.update_one({}, {"$set": update_data})
        updated_about = await db.about.find_one()
        return AboutSection(**updated_about)
    else:
        # Create new
        about_dict = about_update.dict()
        about_dict = {k: v for k, v in about_dict.items() if v is not None}
        about_obj = AboutSection(**about_dict)
        await db.about.insert_one(about_obj.dict())
        return about_obj

# Experience Section Management
@api_router.get("/experience", response_model=ExperienceSection)
async def get_experience():
    experience = await db.experience.find_one()
    if experience:
        return ExperienceSection(**experience)
    # Return default values
    default_experience = {
        "technical_skills": [
            {"name": "Mathematics", "level": 90},
            {"name": "Physics", "level": 85},
            {"name": "Chemistry", "level": 80},
            {"name": "Programming", "level": 75},
            {"name": "Networking", "level": 70},
            {"name": "Cryptography", "level": 65}
        ],
        "current_status": {
            "academic_level": "Advanced Level Student specializing in Mathematics and Science stream",
            "learning_focus": "Currently exploring advanced mathematical concepts, theoretical physics, and practical applications in programming and cryptography.",
            "future_goals": "Aspiring to contribute to mathematical research and develop innovative solutions in technology and science."
        }
    }
    exp_obj = ExperienceSection(**default_experience)
    await db.experience.insert_one(exp_obj.dict())
    return exp_obj

@api_router.put("/experience", response_model=ExperienceSection)
async def update_experience(exp_update: ExperienceSectionUpdate, current_user: str = Depends(verify_token)):
    existing_exp = await db.experience.find_one()
    if existing_exp:
        update_data = {k: v for k, v in exp_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        await db.experience.update_one({}, {"$set": update_data})
        updated_exp = await db.experience.find_one()
        return ExperienceSection(**updated_exp)
    else:
        exp_dict = exp_update.dict()
        exp_dict = {k: v for k, v in exp_dict.items() if v is not None}
        exp_obj = ExperienceSection(**exp_dict)
        await db.experience.insert_one(exp_obj.dict())
        return exp_obj

# Projects Management
@api_router.get("/projects", response_model=List[Project])
async def get_projects():
    projects = await db.projects.find().sort("created_at", -1).to_list(100)
    return [Project(**project) for project in projects]

@api_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate, current_user: str = Depends(verify_token)):
    project_dict = project.dict()
    project_obj = Project(**project_dict)
    await db.projects.insert_one(project_obj.dict())
    return project_obj

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return Project(**project)

@api_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project_update: ProjectUpdate, current_user: str = Depends(verify_token)):
    existing_project = await db.projects.find_one({"id": project_id})
    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    update_data = {k: v for k, v in project_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    await db.projects.update_one({"id": project_id}, {"$set": update_data})
    updated_project = await db.projects.find_one({"id": project_id})
    return Project(**updated_project)

@api_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, current_user: str = Depends(verify_token)):
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# Timeline Management
@api_router.get("/timeline", response_model=List[TimelineEvent])
async def get_timeline():
    timeline = await db.timeline.find().sort("year", -1).to_list(100)
    return [TimelineEvent(**event) for event in timeline]

@api_router.post("/timeline", response_model=TimelineEvent)
async def create_timeline_event(event: TimelineEventCreate, current_user: str = Depends(verify_token)):
    event_dict = event.dict()
    event_obj = TimelineEvent(**event_dict)
    await db.timeline.insert_one(event_obj.dict())
    return event_obj

@api_router.get("/timeline/{event_id}", response_model=TimelineEvent)
async def get_timeline_event(event_id: str):
    event = await db.timeline.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    return TimelineEvent(**event)

@api_router.put("/timeline/{event_id}", response_model=TimelineEvent)
async def update_timeline_event(event_id: str, event_update: TimelineEventUpdate, current_user: str = Depends(verify_token)):
    existing_event = await db.timeline.find_one({"id": event_id})
    if not existing_event:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    
    update_data = {k: v for k, v in event_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    await db.timeline.update_one({"id": event_id}, {"$set": update_data})
    updated_event = await db.timeline.find_one({"id": event_id})
    return TimelineEvent(**updated_event)

@api_router.delete("/timeline/{event_id}")
async def delete_timeline_event(event_id: str, current_user: str = Depends(verify_token)):
    result = await db.timeline.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Timeline event not found")
    return {"message": "Timeline event deleted successfully"}

# Blog Management
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(published_only: bool = False):
    query = {"published": True} if published_only else {}
    posts = await db.blog_posts.find(query).sort("created_at", -1).to_list(100)
    return [BlogPost(**post) for post in posts]

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate, current_user: str = Depends(verify_token)):
    post_dict = post.dict()
    post_obj = BlogPost(**post_dict)
    await db.blog_posts.insert_one(post_obj.dict())
    return post_obj

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPost(**post)

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post_update: BlogPostUpdate, current_user: str = Depends(verify_token)):
    existing_post = await db.blog_posts.find_one({"id": post_id})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = {k: v for k, v in post_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    updated_post = await db.blog_posts.find_one({"id": post_id})
    return BlogPost(**updated_post)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, current_user: str = Depends(verify_token)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

# Contact Info Management
@api_router.get("/contact", response_model=ContactInfo)
async def get_contact():
    contact = await db.contact.find_one()
    if contact:
        return ContactInfo(**contact)
    # Return default values
    default_contact = {
        "location": "Colombo, Sri Lanka",
        "email": "support@mail.com",
        "phone": "000",
        "social_links": {
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "twitter": "https://twitter.com"
        }
    }
    contact_obj = ContactInfo(**default_contact)
    await db.contact.insert_one(contact_obj.dict())
    return contact_obj

@api_router.put("/contact", response_model=ContactInfo)
async def update_contact(contact_update: ContactInfoUpdate, current_user: str = Depends(verify_token)):
    existing_contact = await db.contact.find_one()
    if existing_contact:
        update_data = {k: v for k, v in contact_update.dict().items() if v is not None}
        update_data["updated_at"] = datetime.utcnow()
        await db.contact.update_one({}, {"$set": update_data})
        updated_contact = await db.contact.find_one()
        return ContactInfo(**updated_contact)
    else:
        contact_dict = contact_update.dict()
        contact_dict = {k: v for k, v in contact_dict.items() if v is not None}
        contact_obj = ContactInfo(**contact_dict)
        await db.contact.insert_one(contact_obj.dict())
        return contact_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)