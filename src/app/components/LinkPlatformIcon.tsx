import { useState } from 'react';
import { Link2 } from 'lucide-react';

/** Simple Icons slug map (https://simpleicons.org) — CDN serves official brand SVGs. */
const PLATFORM_TO_SLUG: Record<string, string> = {
  Bluesky: 'bluesky',
  Twitter: 'x',
  X: 'x',
  Instagram: 'instagram',
  GitHub: 'github',
  YouTube: 'youtube',
  SoundCloud: 'soundcloud',
  Bandcamp: 'bandcamp',
  Wattpad: 'wattpad',
  AO3: 'archiveofourown',
  'Archive of Our Own': 'archiveofourown',
  ArtStation: 'artstation',
  DeviantArt: 'deviantart',
  Carrd: 'carrd',
  'itch.io': 'itchdotio',
  Itch: 'itchdotio',
  'Ko-fi': 'kofi',
  Kofi: 'kofi',
  Spotify: 'spotify',
};

function slugForPlatform(platform: string): string {
  const known = PLATFORM_TO_SLUG[platform];
  if (known) return known;
  return platform
    .toLowerCase()
    .replace(/\.io$/i, '')
    .replace(/[^a-z0-9]+/g, '');
}

type Props = {
  platform: string;
  className?: string;
};

/**
 * Renders the platform mark from Simple Icons CDN (same artwork as simpleicons.org).
 * Falls back to a generic link icon if the slug fails to load.
 */
export function LinkPlatformIcon({ platform, className = 'size-[18px]' }: Props) {
  const [failed, setFailed] = useState(false);
  const slug = slugForPlatform(platform);
  const src =
    slug.length > 0
      ? `https://cdn.simpleicons.org/${encodeURIComponent(slug)}/A5FF5F`
      : '';

  if (failed || !src) {
    return <Link2 className={`${className} text-[#a5ff5f]`} strokeWidth={1.5} aria-hidden />;
  }

  return (
    <img
      alt=""
      src={src}
      className={`${className} object-contain`}
      onError={() => setFailed(true)}
    />
  );
}
