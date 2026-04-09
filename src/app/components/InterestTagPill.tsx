import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/** Shared interest / fandom pill — matches chat UserInfoPanel styling. */
export const INTEREST_TAG_PILL_CLASS =
  "normal-case px-[10px] py-[4px] rounded-full bg-[rgba(39,39,39,0.87)] border border-[#323339] font-['Satoshi',sans-serif] font-[500] text-[11px] text-[rgba(255,255,255,0.6)]";

export function InterestTagPill({ children }: { children: ReactNode }) {
  return <span className={INTEREST_TAG_PILL_CLASS}>{children}</span>;
}

export function InterestTagPillList({ tags, className = '' }: { tags: string[]; className?: string }) {
  if (tags.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-[8px] ${className}`}>
      {tags.map((tag) => (
        <InterestTagPill key={tag}>{tag}</InterestTagPill>
      ))}
    </div>
  );
}

/**
 * Keeps pills to a single line. If they'd overflow, collapses extras into a `+N` pill.
 * Designed for narrow sidebars / responsive layouts.
 */
export function InterestTagPillCompactList({
  tags,
  className = '',
  minVisible = 1,
}: {
  tags: string[];
  className?: string;
  minVisible?: number;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [pillWidths, setPillWidths] = useState<number[]>([]);
  const [indicatorWidth, setIndicatorWidth] = useState(0);

  const gapPx = 8;

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    const ro = new ResizeObserver(() => {
      setContainerWidth(el.clientWidth);
    });
    ro.observe(el);
    setContainerWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (tags.length === 0) return;

    // Measure using a hidden, fixed-position flex row so widths aren't affected
    // by the sidebar container's overflow/positioning context.
    const measurer = document.createElement('div');
    measurer.style.position = 'fixed';
    measurer.style.left = '0';
    measurer.style.top = '0';
    measurer.style.visibility = 'hidden';
    measurer.style.pointerEvents = 'none';
    measurer.style.zIndex = '-1';
    measurer.style.display = 'flex';
    measurer.style.flexWrap = 'nowrap';
    measurer.style.gap = `${gapPx}px`;

    const spans: HTMLSpanElement[] = [];
    for (const t of tags) {
      const s = document.createElement('span');
      s.className = INTEREST_TAG_PILL_CLASS;
      s.textContent = t;
      measurer.appendChild(s);
      spans.push(s);
    }

    const indicator = document.createElement('span');
    indicator.className = INTEREST_TAG_PILL_CLASS;
    // Use worst-case count for this set (max hidden).
    indicator.textContent = `+${Math.max(0, tags.length - minVisible)}`;
    measurer.appendChild(indicator);

    document.body.appendChild(measurer);

    const widths = spans.map((s) => s.getBoundingClientRect().width);
    setPillWidths(widths);
    setIndicatorWidth(indicator.getBoundingClientRect().width);

    measurer.remove();
  }, [gapPx, minVisible, tags]);

  const visibleCount = useMemo(() => {
    if (tags.length === 0) return 0;
    if (containerWidth <= 0) return Math.min(tags.length, Math.max(minVisible, 1));
    if (pillWidths.length !== tags.length) return Math.min(tags.length, Math.max(minVisible, 1));
    if (pillWidths.some((w) => w <= 0)) return Math.min(tags.length, Math.max(minVisible, 1));

    // Start optimistic and shrink until one line fits (with optional +N).
    for (let count = tags.length; count >= minVisible; count--) {
      const hidden = tags.length - count;
      const needIndicator = hidden > 0;
      const widths = pillWidths.slice(0, count);
      const base =
        widths.reduce((acc, w) => acc + w, 0) +
        Math.max(0, count - 1) * gapPx;

      const total = needIndicator
        ? base + (count > 0 ? gapPx : 0) + indicatorWidth
        : base;

      if (total <= containerWidth) return count;
    }

    return minVisible;
  }, [containerWidth, indicatorWidth, minVisible, pillWidths, tags.length]);

  if (tags.length === 0) return null;
  const hiddenCount = Math.max(0, tags.length - visibleCount);

  return (
    <div
      ref={containerRef}
      className={`flex flex-nowrap gap-[8px] overflow-hidden ${className}`}
    >
      {tags.slice(0, visibleCount).map((tag) => (
        <InterestTagPill key={tag}>{tag}</InterestTagPill>
      ))}
      {hiddenCount > 0 && <InterestTagPill>+{hiddenCount}</InterestTagPill>}
    </div>
  );
}
