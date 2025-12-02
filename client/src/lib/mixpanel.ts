import mixpanel from 'mixpanel-browser';
import { useEffect, useRef, useCallback } from 'react';

const MIXPANEL_TOKEN = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN || '';

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: import.meta.env.DEV,
    track_pageview: true,
    persistence: 'localStorage',
  });
}

// ============================================
// Core Tracking Functions
// ============================================

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (!MIXPANEL_TOKEN) {
    if (import.meta.env.DEV) console.log('[Mixpanel]', eventName, properties);
    return;
  }
  mixpanel.track(eventName, properties);
};

export const identifyUser = (email: string) => {
  if (!MIXPANEL_TOKEN) return;
  mixpanel.identify(email);
  mixpanel.people.set({
    $email: email,
    $last_login: new Date().toISOString(),
  });
};

// ============================================
// Section View Tracking
// ============================================

export const trackSectionView = (sectionId: string, sectionName: string) => {
  trackEvent('section_viewed', {
    section_id: sectionId,
    section_name: sectionName,
    page_path: window.location.pathname,
  });
};

// ============================================
// Troubleshooting Hub Tracking
// ============================================

export const trackSectionExpanded = (sectionId: string, sectionTitle: string) => {
  trackEvent('troubleshooting_section_expanded', {
    section_id: sectionId,
    section_title: sectionTitle,
  });
};

export const trackTopicExpanded = (topicId: string, topicTitle: string, sectionId: string) => {
  trackEvent('troubleshooting_topic_expanded', {
    topic_id: topicId,
    topic_title: topicTitle,
    section_id: sectionId,
  });
};

export const trackSearch = (query: string, resultsCount: number) => {
  trackEvent('troubleshooting_search', {
    query,
    results_count: resultsCount,
  });
};

// ============================================
// Link Tracking
// ============================================

export const trackExternalLink = (url: string, linkText: string, sectionId?: string) => {
  trackEvent('external_link_clicked', {
    url,
    link_text: linkText,
    section_id: sectionId,
    page_path: window.location.pathname,
  });
};

export const trackVideoClick = (videoId: string, videoTitle: string) => {
  trackEvent('video_link_clicked', {
    video_id: videoId,
    video_title: videoTitle,
  });
};

// ============================================
// Heatmap / Click Tracking
// ============================================

export const trackClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target) return;

  // Get meaningful text from element
  const getText = (el: HTMLElement): string => {
    if (el.tagName === 'BUTTON' || el.tagName === 'A') {
      return el.textContent?.trim().slice(0, 50) || '';
    }
    if (el.getAttribute('aria-label')) {
      return el.getAttribute('aria-label') || '';
    }
    return '';
  };

  trackEvent('click', {
    element_tag: target.tagName.toLowerCase(),
    element_text: getText(target),
    element_class: target.className?.toString().slice(0, 100) || '',
    element_id: target.id || undefined,
    x: event.clientX,
    y: event.clientY,
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    page_path: window.location.pathname,
  });
};

export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    depth_percent: depth,
    page_path: window.location.pathname,
  });
};

// ============================================
// React Hooks
// ============================================

/**
 * Hook to track when a section becomes visible
 * Uses Intersection Observer for performance
 */
export const useSectionTracking = (sectionId: string, sectionName: string) => {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5 && !hasTracked.current) {
            hasTracked.current = true;
            trackSectionView(sectionId, sectionName);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionId, sectionName]);

  return ref;
};

/**
 * Hook to track global clicks for heatmap data
 * Add to App.tsx to track all clicks
 */
export const useClickTracking = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      trackClick(event);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
};

/**
 * Hook to track scroll depth milestones
 * Tracks 25%, 50%, 75%, 100%
 */
export const useScrollTracking = () => {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      const milestones = [25, 50, 75, 100];

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

/**
 * Hook to track search with debouncing
 */
export const useSearchTracking = (query: string, resultsCount: number, debounceMs = 500) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!query) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      trackSearch(query, resultsCount);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, resultsCount, debounceMs]);
};

export default mixpanel;
