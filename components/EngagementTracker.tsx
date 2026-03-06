'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const SCROLL_THRESHOLD = 25;
const BLOCKED_TIMEZONES = ['Asia/Shanghai', 'Asia/Chongqing', 'Asia/Harbin', 'Asia/Urumqi', 'Asia/Singapore'];

function pushEngagementEvent(scrollDepth: number, startTime: number, hasClicked: boolean, hasScrolled: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'user_engaged',
    engagement_scroll_depth: Math.round(scrollDepth),
    engagement_time_on_page: Math.round((Date.now() - startTime) / 1000),
    engagement_has_clicked: hasClicked,
    engagement_has_scrolled: hasScrolled,
  });
}

export default function EngagementTracker() {
  useEffect(() => {
    // Block analytics for bot-heavy regions
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (BLOCKED_TIMEZONES.includes(tz)) return;

    let maxScrollDepth = 0;
    let hasClicked = false;
    let hasScrolled = false;
    let hasFiredEngagement = false;
    const startTime = Date.now();

    function tryFire() {
      if (hasFiredEngagement) return;
      // Require BOTH scroll past threshold AND a click
      if (hasScrolled && hasClicked) {
        hasFiredEngagement = true;
        pushEngagementEvent(maxScrollDepth, startTime, hasClicked, hasScrolled);
      }
    }

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrolled = (window.scrollY / docHeight) * 100;
      maxScrollDepth = Math.max(maxScrollDepth, scrolled);

      if (maxScrollDepth >= SCROLL_THRESHOLD) {
        hasScrolled = true;
        tryFire();
      }
    };

    const handleClick = () => {
      hasClicked = true;
      tryFire();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
