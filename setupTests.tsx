// setupTests.ts
import React from 'react';
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}));

// Mock CSS imports
jest.mock('./App.css', () => ({}));

class MockIntersectionObserver implements IntersectionObserver {
  observe = jest.fn((target: Element) => {
    // Simulate intersection on observe
    this.simulateIntersection(target, true);
  });
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = jest.fn(() => []);
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];

  constructor(
    private readonly callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.root = options?.root instanceof Element ? options.root : null;
    this.rootMargin = options?.rootMargin || '';
    this.thresholds = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0];
  }

  // Helper method to simulate intersection
  private simulateIntersection(target: Element, isIntersecting: boolean) {
    const entry: IntersectionObserverEntry = {
      boundingClientRect: target.getBoundingClientRect(),
      intersectionRatio: isIntersecting ? 1.0 : 0.0,
      intersectionRect: isIntersecting ? target.getBoundingClientRect() : new DOMRect(),
      isIntersecting,
      rootBounds: this.root?.getBoundingClientRect() || null,
      target,
      time: Date.now()
    };
    
    this.callback([entry], this);
  }
}

global.IntersectionObserver = MockIntersectionObserver;
