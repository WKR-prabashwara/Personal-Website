import requests
import sys
from datetime import datetime
import json

class PortfolioAPITester:
    def __init__(self, base_url="https://9d41420c-33b9-4a98-992b-d28960164270.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, auth_required=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        if auth_required and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=15)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=15)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=15)

            print(f"Response Status: {response.status_code}")
            if response.text:
                print(f"Response Content: {response.text[:300]}...")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json() if response.text else {}
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_login(self):
        """Test admin login"""
        login_data = {"username": "admin", "password": "admin123"}
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data=login_data
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"🔑 Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_verify_auth(self):
        """Test token verification"""
        return self.run_test(
            "Verify Authentication",
            "GET",
            "api/auth/verify",
            200,
            auth_required=True
        )

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "api/", 200)

    def test_about_section(self):
        """Test about section endpoints"""
        print("\n📝 Testing About Section...")
        
        # Get about section
        success, about_data = self.run_test("Get About Section", "GET", "api/about", 200)
        
        if success and about_data:
            print(f"About data preview: {json.dumps(about_data, indent=2)[:200]}...")
            
            # Test update about section (requires auth)
            if self.token:
                update_data = {
                    "subtitle": "Test Mathematics Student",
                    "description": "Test description update"
                }
                self.run_test(
                    "Update About Section",
                    "PUT",
                    "api/about",
                    200,
                    data=update_data,
                    auth_required=True
                )
        
        return success

    def test_experience_section(self):
        """Test experience section endpoints"""
        print("\n💼 Testing Experience Section...")
        
        success, exp_data = self.run_test("Get Experience Section", "GET", "api/experience", 200)
        
        if success and exp_data:
            print(f"Experience data preview: {json.dumps(exp_data, indent=2)[:200]}...")
        
        return success

    def test_projects_section(self):
        """Test projects endpoints"""
        print("\n🚀 Testing Projects Section...")
        
        # Get projects
        success, projects_data = self.run_test("Get Projects", "GET", "api/projects", 200)
        
        if success:
            print(f"Projects count: {len(projects_data) if isinstance(projects_data, list) else 'N/A'}")
            
            # Test create project (requires auth)
            if self.token:
                project_data = {
                    "title": "Test Project",
                    "description": "A test project for API testing",
                    "date": "2024-01",
                    "status": "development",
                    "technologies": ["Python", "FastAPI", "React"]
                }
                create_success, created_project = self.run_test(
                    "Create Project",
                    "POST",
                    "api/projects",
                    200,
                    data=project_data,
                    auth_required=True
                )
                
                if create_success and created_project.get('id'):
                    project_id = created_project['id']
                    print(f"Created project ID: {project_id}")
                    
                    # Test get single project
                    self.run_test(
                        "Get Single Project",
                        "GET",
                        f"api/projects/{project_id}",
                        200
                    )
        
        return success

    def test_timeline_section(self):
        """Test timeline endpoints"""
        print("\n📅 Testing Timeline Section...")
        
        success, timeline_data = self.run_test("Get Timeline", "GET", "api/timeline", 200)
        
        if success:
            print(f"Timeline events count: {len(timeline_data) if isinstance(timeline_data, list) else 'N/A'}")
        
        return success

    def test_blog_section(self):
        """Test blog endpoints"""
        print("\n📝 Testing Blog Section...")
        
        # Get all blog posts
        success, blog_data = self.run_test("Get Blog Posts", "GET", "api/blog", 200)
        
        if success:
            print(f"Blog posts count: {len(blog_data) if isinstance(blog_data, list) else 'N/A'}")
            
            # Get published posts only
            self.run_test("Get Published Blog Posts", "GET", "api/blog?published_only=true", 200)
        
        return success

    def test_contact_section(self):
        """Test contact endpoints"""
        print("\n📞 Testing Contact Section...")
        
        success, contact_data = self.run_test("Get Contact Info", "GET", "api/contact", 200)
        
        if success and contact_data:
            print(f"Contact data preview: {json.dumps(contact_data, indent=2)[:200]}...")
        
        return success

    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        print("\n📊 Testing Analytics Section...")
        
        # Test session creation
        session_data = {
            "visitor_id": f"test_visitor_{datetime.now().strftime('%H%M%S')}",
            "user_agent": "Mozilla/5.0 (Test Browser)",
            "screen_resolution": "1920x1080",
            "language": "en-US",
            "timezone": "UTC"
        }
        
        session_success, session_response = self.run_test(
            "Create Analytics Session",
            "POST",
            "api/analytics/session",
            200,
            data=session_data
        )
        
        # Test page view tracking
        if session_success and session_response.get('session_id'):
            pageview_data = {
                "session_id": session_response['session_id'],
                "page_url": "/",
                "page_title": "Home - Portfolio",
                "referrer": ""
            }
            
            self.run_test(
                "Track Page View",
                "POST",
                "api/analytics/pageview",
                200,
                data=pageview_data
            )
        
        return session_success

    def test_status_endpoints(self):
        """Test status check endpoints"""
        print("\n🔍 Testing Status Endpoints...")
        
        # Create status check
        test_data = {"client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"}
        success, response = self.run_test(
            "Create Status Check",
            "POST", 
            "api/status",
            200,
            data=test_data
        )
        
        # Get status checks
        self.run_test("Get Status Checks", "GET", "api/status", 200)
        
        return success

def main():
    print("🚀 Starting Comprehensive Portfolio Backend API Tests...")
    
    tester = PortfolioAPITester()
    
    print(f"\n📊 Testing Backend API at {tester.base_url}")
    
    # Test basic endpoints first
    print("\n=== BASIC ENDPOINTS ===")
    tester.test_root_endpoint()
    tester.test_status_endpoints()
    
    # Test authentication
    print("\n=== AUTHENTICATION ===")
    login_success = tester.test_login()
    if login_success:
        tester.test_verify_auth()
    
    # Test portfolio sections
    print("\n=== PORTFOLIO SECTIONS ===")
    tester.test_about_section()
    tester.test_experience_section()
    tester.test_projects_section()
    tester.test_timeline_section()
    tester.test_blog_section()
    tester.test_contact_section()
    
    # Test analytics
    print("\n=== ANALYTICS ===")
    tester.test_analytics_endpoints()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    elif tester.tests_passed / tester.tests_run >= 0.8:
        print("✅ Most tests passed - Backend is functional!")
        return 0
    else:
        print("❌ Many tests failed - Backend needs attention!")
        return 1

if __name__ == "__main__":
    sys.exit(main())