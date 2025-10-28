import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN || '';

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token not configured');
    return;
  }
  
  mixpanel.track(eventName, properties);
};

export const identifyUser = (email: string) => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.identify(email);
};

export default mixpanel;
