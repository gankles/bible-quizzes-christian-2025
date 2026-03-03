'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

const SCROLL_THRESHOLD = 25;
const TIME_THRESHOLD_MS = 10000;

function pushEngagementEvent(scrollDepth: number, startTime: number, hasClicked: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'user_engaged',
    engagement_scroll_depth: Math.round(scrollDepth),
    engagement_time_on_page: Math.round((Date.now() - startTime) / 1000),
    engagement_has_clicked: hasClicked,
  });
}

export default function EngagementTracker() {
  useEffect(() => {
    let maxScrollDepth = 0;
    let hasClicked = false;
    let hasFiredEngagement = false;
    const startTime = Date.now();

    function fireOnce() {
      if (hasFiredEngagement) return;
      hasFiredEngagement = true;
      pushEngagementEvent(maxScrollDepth, startTime, hasClicked);
    }

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const scrolled = (window.scrollY / docHeight) * 100;
      maxScrollDepth = Math.max(maxScrollDepth, scrolled);

      if (maxScrollDepth >= SCROLL_THRESHOLD) {
        fireOnce();
      }
    };

    const handleClick = () => {
      hasClicked = true;
      fireOnce();
    };

    const timeoutId = setTimeout(() => {
      fireOnce();
    }, TIME_THRESHOLD_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
