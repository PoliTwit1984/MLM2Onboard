# Mixpanel Analytics Implementation

## Configuration

**Environment Variable:** `VITE_MIXPANEL_PROJECT_TOKEN`

> ⚠️ The project token must be set via environment variable. Never commit tokens to version control.

---

## Events Tracked

### User Identification

| Event | Trigger | Properties |
|-------|---------|------------|
| `identify` | User submits email | `email` |

### Onboarding Events

| Event | Trigger | Properties |
|-------|---------|------------|
| `email_submitted` | User provides email in hero form | `email` |
| `onboarding_started_anonymous` | User clicks "Get Started" without email | - |

### Section Engagement

| Event | Trigger | Properties |
|-------|---------|------------|
| `section_viewed` | User scrolls section into viewport (50%+ visible) | `section_id`, `section_name` |

### Troubleshooting Hub

| Event | Trigger | Properties |
|-------|---------|------------|
| `troubleshooting_section_expanded` | User expands an accordion section | `section_id`, `section_title` |
| `troubleshooting_topic_expanded` | User clicks "Learn more" on a topic | `topic_id`, `topic_title`, `section_id` |
| `troubleshooting_search` | User types in search box (debounced 500ms) | `query`, `results_count` |

### Metrics Section

| Event | Trigger | Properties |
|-------|---------|------------|
| `metric_clicked` | User clicks a metric icon (Total Distance, Ball Speed, etc.) | `metric_name`, `metric_id` |

### Link Tracking

| Event | Trigger | Properties |
|-------|---------|------------|
| `external_link_clicked` | User clicks Zendesk reference link | `url`, `link_text`, `section_id` |
| `video_link_clicked` | User clicks to watch embedded video | `video_id`, `video_title` |

### Heatmap / Click Tracking

| Event | Trigger | Properties |
|-------|---------|------------|
| `click` | Any click on the page | `element_tag`, `element_text`, `element_class`, `x`, `y`, `viewport_width`, `viewport_height`, `page_path` |
| `scroll_depth` | User scrolls to 25%, 50%, 75%, 100% | `depth_percent`, `page_path` |

---

## Code Implementation

### Library: `client/src/lib/mixpanel.ts`

```typescript
import mixpanel from 'mixpanel-browser';

// Core functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {...}
export const identifyUser = (email: string) => {...}

// Section tracking
export const trackSectionView = (sectionId: string, sectionName: string) => {...}

// Troubleshooting tracking
export const trackTopicExpanded = (topicId: string, topicTitle: string, sectionId: string) => {...}
export const trackSearch = (query: string, resultsCount: number) => {...}

// Link tracking
export const trackExternalLink = (url: string, linkText: string, sectionId?: string) => {...}

// Heatmap tracking
export const trackClick = (event: MouseEvent) => {...}
export const trackScrollDepth = (depth: number) => {...}

// Hooks
export const useSectionTracking = () => {...}  // Intersection Observer hook
export const useClickTracking = () => {...}    // Global click tracking hook
export const useScrollTracking = () => {...}   // Scroll depth tracking hook
```

---

## Viewing Data in Mixpanel

### Reports to Create

1. **Funnel: Onboarding Completion**
   - `section_viewed (Hero)` � `email_submitted` OR `onboarding_started_anonymous`

2. **Engagement: Popular Topics**
   - Group by `troubleshooting_topic_expanded.topic_title`

3. **Heatmap Analysis**
   - Filter `click` events by `page_path`
   - Visualize with x/y coordinates

4. **Scroll Depth**
   - Filter `scroll_depth` by `page_path`
   - See drop-off at each depth milestone

5. **Search Analysis**
   - Most common `troubleshooting_search.query` values
   - Queries with `results_count = 0` (content gaps)

---

## Environment Variables

```bash
# Required - obtain from Mixpanel project settings
VITE_MIXPANEL_PROJECT_TOKEN=<your-project-token>
```

---

## Privacy Considerations

- Email is only collected if user voluntarily provides it
- Click tracking captures element info, not personal data
- No cookies required (uses localStorage)
- User can clear tracking with browser localStorage clear
