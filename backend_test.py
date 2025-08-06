import requests
import sys
from datetime import datetime
import json

class SimpleAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"Response Status: {response.status_code}")
            print(f"Response Content: {response.text[:200]}...")

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                return True, response.json() if response.text else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root endpoint"""
        return self.run_test("Root Endpoint", "GET", "api/", 200)

    def test_create_status_check(self):
        """Test creating a status check"""
        test_data = {"client_name": f"test_client_{datetime.now().strftime('%H%M%S')}"}
        success, response = self.run_test(
            "Create Status Check",
            "POST", 
            "api/status",
            200,  # Changed from 201 to 200 based on typical FastAPI behavior
            data=test_data
        )
        return response.get('id') if success else None

    def test_get_status_checks(self):
        """Test getting all status checks"""
        return self.run_test("Get Status Checks", "GET", "api/status", 200)

def main():
    print("🚀 Starting Backend API Tests...")
    
    # Test with localhost first
    tester = SimpleAPITester("http://localhost:8001")
    
    print(f"\n📊 Testing Backend API at {tester.base_url}")
    
    # Test root endpoint
    tester.test_root_endpoint()
    
    # Test create status check
    status_id = tester.test_create_status_check()
    
    # Test get status checks
    tester.test_get_status_checks()
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed!")
        return 1

if __name__ == "__main__":
    sys.exit(main())