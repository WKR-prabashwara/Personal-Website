import axios from 'axios';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import ReactGA from 'react-ga4';

class AnalyticsService {
  constructor() {
    this.backendUrl = process.env.REACT_APP_BACKEND_URL;
    this.socket = null;
    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = null;
    this.sessionStart = Date.now();
    this.currentPage = '';
    this.pageStartTime = Date.now();
    this.devToolsOpen = false;
    
    // Initialize Google Analytics if tracking ID is provided
    const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
    if (GA_TRACKING_ID) {
      ReactGA.initialize(GA_TRACKING_ID);
      ReactGA.send('pageview');
    }
    
    this.initializeSession();
    this.setupDevToolsDetection();
    this.setupBeforeUnload();
  }

  getOrCreateVisitorId() {
    let visitorId = Cookies.get('visitor_id');
    if (!visitorId) {
      visitorId = uuidv4();
      Cookies.set('visitor_id', visitorId, { expires: 365, sameSite: 'lax' });
    }
    return visitorId;
  }

  async initializeSession() {
    try {
      const sessionData = {
        visitor_id: this.visitorId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || null
      };

      const response = await axios.post(`${this.backendUrl}/api/analytics/session`, sessionData);
      if (response.data.session_id) {
        this.sessionId = response.data.session_id;
        this.connectSocket();
      }
    } catch (error) {
      console.warn('Analytics session initialization failed:', error);
    }
  }

  connectSocket() {
    try {
      this.socket = io(this.backendUrl, {
        transports: ['websocket', 'polling']
      });
      
      this.socket.on('connect', () => {
        console.log('Analytics socket connected');
      });
      
      this.socket.on('disconnect', () => {
        console.log('Analytics socket disconnected');
      });
    } catch (error) {
      console.warn('Socket connection failed:', error);
    }
  }

  async trackPageView(pageUrl, pageTitle) {
    try {
      // End previous page tracking
      if (this.currentPage && this.sessionId) {
        const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);
        await this.updatePageTime(this.currentPage, timeSpent);
      }

      // Start new page tracking
      this.currentPage = pageUrl;
      this.pageStartTime = Date.now();

      if (this.sessionId) {
        const pageData = {
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_url: pageUrl,
          page_title: pageTitle || document.title,
          time_spent: 0
        };

        await axios.post(`${this.backendUrl}/api/analytics/pageview`, pageData);
      }

      // Track with Google Analytics
      if (ReactGA.isInitialized) {
        ReactGA.send('pageview', { page_path: pageUrl, page_title: pageTitle });
      }
    } catch (error) {
      console.warn('Page view tracking failed:', error);
    }
  }

  async updatePageTime(pageUrl, timeSpent) {
    try {
      if (this.sessionId && timeSpent > 5) { // Only track if spent more than 5 seconds
        await axios.post(`${this.backendUrl}/api/analytics/pageview`, {
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_url: pageUrl,
          page_title: document.title,
          time_spent: timeSpent
        });
      }
    } catch (error) {
      console.warn('Page time update failed:', error);
    }
  }

  setupDevToolsDetection() {
    let devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          this.onDevToolsOpen();
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Additional detection method
    let element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        if (!this.devToolsOpen) {
          this.devToolsOpen = true;
          this.onDevToolsOpen();
        }
      }
    });

    // Trigger the detection
    console.log(element);
  }

  async onDevToolsOpen() {
    try {
      if (this.sessionId) {
        const alertData = {
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          user_agent: navigator.userAgent,
          page_url: window.location.href
        };

        await axios.post(`${this.backendUrl}/api/analytics/dev-tools-alert`, alertData);
        
        // Track with Google Analytics as event
        if (ReactGA.isInitialized) {
          ReactGA.event({
            category: 'Security',
            action: 'dev_tools_opened',
            label: window.location.href
          });
        }
      }
    } catch (error) {
      console.warn('Dev tools alert failed:', error);
    }
  }

  setupBeforeUnload() {
    window.addEventListener('beforeunload', () => {
      if (this.sessionId && this.currentPage) {
        const timeSpent = Math.floor((Date.now() - this.pageStartTime) / 1000);
        const totalSessionTime = Math.floor((Date.now() - this.sessionStart) / 1000);
        
        // Send final tracking data
        navigator.sendBeacon(
          `${this.backendUrl}/api/analytics/session/${this.sessionId}/end?total_time=${totalSessionTime}`
        );
        
        if (timeSpent > 5) {
          navigator.sendBeacon(
            `${this.backendUrl}/api/analytics/pageview`,
            JSON.stringify({
              visitor_id: this.visitorId,
              session_id: this.sessionId,
              page_url: this.currentPage,
              page_title: document.title,
              time_spent: timeSpent
            })
          );
        }
      }
    });
  }

  trackEvent(category, action, label = null, value = null) {
    if (ReactGA.isInitialized) {
      ReactGA.event({
        category,
        action,
        label,
        value
      });
    }
  }

  trackScrollDepth(depth) {
    if (ReactGA.isInitialized) {
      ReactGA.event({
        category: 'Engagement',
        action: 'scroll_depth',
        label: `${depth}%`,
        value: depth
      });
    }
  }

  joinAdminRoom(token) {
    if (this.socket && token) {
      this.socket.emit('join_admin', { token });
    }
  }

  onDevToolsAlert(callback) {
    if (this.socket) {
      this.socket.on('dev_tools_alert', callback);
    }
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();
export default analyticsService;