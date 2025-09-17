declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function track(eventName: string, payload?: Record<string, any>) {
  try {
    // Send to Plausible if available
    if (import.meta.env.VITE_PLAUSIBLE_DOMAIN && window.plausible) {
      window.plausible(eventName, { props: payload });
    }
    
    // Log for development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, payload);
    }
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

export const ANALYTICS_EVENTS = {
  EMAIL_CLICK: 'email_click',
  CALENDLY_OPEN: 'calendly_open',
  CALENDLY_SCHEDULED: 'calendly_scheduled',
  LINKEDIN_CLICK: 'linkedin_click',
  INSTAGRAM_CLICK: 'instagram_click',
  LEAD_SUBMITTED: 'lead_submitted',
  GUIDE_OPENED: 'guide_opened',
} as const;