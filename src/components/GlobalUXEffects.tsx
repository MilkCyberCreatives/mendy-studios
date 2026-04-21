'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, label";
const REVEAL_READY_CLASS = 'reveal-enabled';
type NavigatorConnection = {
  saveData?: boolean;
};
type NavigatorWithConnection = Navigator & {
  connection?: NavigatorConnection;
  mozConnection?: NavigatorConnection;
  webkitConnection?: NavigatorConnection;
};

export default function GlobalUXEffects() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    let frameId = 0;

    const onScroll = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;

        if (!progressRef.current) {
          return;
        }

        const doc = document.documentElement;
        const total = doc.scrollHeight - doc.clientHeight;
        const progress = total > 0 ? window.scrollY / total : 0;
        progressRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

    const syncPointerMode = () => {
      const enabled = mediaQuery.matches && !motionQuery.matches && !connection?.saveData;
      setIsPointerFine(enabled);
      document.body.classList.toggle('cursor-enabled', enabled);
    };

    syncPointerMode();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncPointerMode);
      motionQuery.addEventListener('change', syncPointerMode);
    } else {
      mediaQuery.addListener(syncPointerMode);
      motionQuery.addListener(syncPointerMode);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', syncPointerMode);
        motionQuery.removeEventListener('change', syncPointerMode);
      } else {
        mediaQuery.removeListener(syncPointerMode);
        motionQuery.removeListener(syncPointerMode);
      }
      document.body.classList.remove('cursor-enabled');
    };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nav = navigator as NavigatorWithConnection;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!nodes.length || motionQuery.matches || connection?.saveData) {
      return;
    }

    document.body.classList.add(REVEAL_READY_CLASS);

    if (typeof window.IntersectionObserver !== 'function') {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return () => {
        document.body.classList.remove(REVEAL_READY_CLASS);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.body.classList.remove(REVEAL_READY_CLASS);
    };
  }, [pathname]);

  useEffect(() => {
    if (!isPointerFine) {
      return;
    }

    let frameId = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;

    const render = () => {
      ringX += (pointerX - ringX) * 0.15;
      ringY += (pointerY - ringY) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setCursorVisible(true);
    };

    const onPointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      setCursorActive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };

    const onPointerLeave = () => setCursorVisible(false);

    frameId = window.requestAnimationFrame(render);
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, true);
    document.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver, true);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [isPointerFine]);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />

      {isPointerFine ? (
        <>
          <div
            ref={ringRef}
            aria-hidden="true"
            className={`custom-cursor-ring${
              cursorVisible ? ' cursor-visible' : ''
            }${cursorActive ? ' cursor-active' : ''}`}
          />
          <div
            ref={dotRef}
            aria-hidden="true"
            className={`custom-cursor-dot${
              cursorVisible ? ' cursor-visible' : ''
            }${cursorActive ? ' cursor-active' : ''}`}
          />
        </>
      ) : null}
    </>
  );
}
