export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  listedBy: string;
  timeAgo: string;
  tags: { label: string; type: 'featured' | 'outline' }[];
  deadlineDays: number | null;
  lookingFor: string[];
  paymentType: string;
  duration: string;
  availability: string;
  category: string;
  // Expanded detail fields
  fullDescription: string;
  showcaseImages: string[];
  roles: { role: string; needed: number; filled: number }[];
  team: { username: string; role: string; avatar: string }[];
  status: string;
  startDate: string;
  genre: string;
}

export interface Creator {
  id: string;
  username: string;
  avatar: string;
  /** Solid banner color used behind profile avatar. */
  profileBannerColor?: string;
  bio: string;
  portfolioImages: string[];
  skillTags: string[];
  interestTags: string[];
  paymentType: string;
  duration: string;
  availability: string;
  category: string;
  localTime: string;
  languages: string[];
  lastSeen: string;
  socials: { platform: string; handle: string; url: string }[];
  maxProjects: number | null;
  aboutMe: string;
  /** First-person collab style; shown under "What it's like to collab with me". */
  collabVoice: string;
  showcaseImages: string[];
  recentCollabs: {
    id: string;
    title: string;
    role: string;
    thumbnail: string;
    collaborators: string[];
    projectId?: string;
    listingStatus?: 'Open' | 'Closed';
  }[];
  testimonials: { id: string; author: string; text: string; avatar: string }[];
  portfolioLinks: { platform: string; url: string }[];
}

export const categories = [
  { id: 'all', label: 'All', icon: 'grid' },
  { id: 'illustration', label: 'Illustration', icon: 'palette' },
  { id: 'writing', label: 'Writing', icon: 'pencil' },
  { id: 'development', label: 'Development', icon: 'computer' },
  { id: 'voice-acting', label: 'Voice Acting', icon: 'mic' },
  { id: 'composing', label: 'Composing', icon: 'music' },
];

export const paymentTypes = ['Any', 'Paid', 'Hobby'];
export const durations = ['Any', 'Short-term', 'Long-term', 'One-time'];
export const availabilities = ['Any', 'Open', 'Closed'];

import imgProjectGnosisThumbnail from "../../assets/projects/project-gnosis.png";
import imgMonstersWithinThumbnail from "../../assets/projects/monsters-within.png";
import imgStarbinskiGlimpse from "../../assets/creators/starbinski/glimpse-of-insanity.png";
import imgStarbinskiToFeel from "../../assets/creators/starbinski/to-feel-too-much.png";
import imgStarbinskiMonster from "../../assets/creators/starbinski/a-monster.png";
import imgStarbinskiWhy from "../../assets/creators/starbinski/why-i-write.png";
import avatarKitsune from "../../assets/avatars/creators/avatar-kitsune.png";
import avatarStarbinski from "../../assets/avatars/creators/avatar-starbinski.png";
import avatarPixelforge from "../../assets/avatars/creators/avatar-pixelforge.png";
import avatarEchoVoice from "../../assets/avatars/creators/avatar-echo-voice.png";
import avatarSynthwaveSam from "../../assets/avatars/creators/avatar-synthwave-sam.png";
import avatarArtisanLily from "../../assets/avatars/creators/avatar-artisan-lily.png";

export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Gnosis',
    description: 'Welcome to Project Gnosis, a Narrated Audio Drama. Project Gnosis is a cyberpunk urban fantasy focused on exploring myths and legends from around the world. In this world, mythic creatures live throughout the world in secret. However, this secrecy is always near its breaking point due to conflicts.',
    thumbnail: imgProjectGnosisThumbnail,
    listedBy: '@MQ Media',
    timeAgo: '5 days ago',
    tags: [
      { label: 'Featured', type: 'featured' },
      { label: 'Hobby', type: 'outline' },
      { label: 'Long-term', type: 'outline' },
    ],
    deadlineDays: 3,
    lookingFor: ['Illustrator', 'Writer'],
    paymentType: 'Hobby',
    duration: 'Long-term',
    availability: 'Open',
    category: 'illustration',
    fullDescription: 'Welcome to Project Gnosis, a Narrated Audio Drama. Project Gnosis is a cyberpunk urban fantasy focused on exploring myths and legends from around the world. In this world, mythic creatures live throughout the world in secret. However, this secrecy is always near its breaking point due to conflicts between factions, government agents, and rogue entities.\n\nWe are a passionate team of creators building an immersive audio experience that blends world mythology with a gritty, neon-soaked cyberpunk aesthetic. The project involves full voice acting, original music composition, and illustrated scene cards that accompany each episode.\n\nWe are currently looking for talented illustrators who can capture the essence of our characters and world, as well as writers who can help expand our lore and episode scripts. This is a long-term hobby project driven by passion for storytelling.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1762341154386-fa765c9f2aa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBjaXR5JTIwZGlnaXRhbCUyMGFydHxlbnwxfHx8fDE3NzU0NTI2NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY3JlYXR1cmUlMjBpbGx1c3RyYXRpb24lMjBkYXJrfGVufDF8fHx8MTc3NTQ1MjY2MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725854928339-94a96e94f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBlbnZpcm9ubWVudCUyMGNvbmNlcHQlMjBhcnR8ZW58MXx8fHwxNzc1NDUyNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762968755007-7cc86ae46707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyJTIwY3JlYXR1cmUlMjBkYXJrJTIwY29uY2VwdHxlbnwxfHx8fDE3NzU0NTI2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    roles: [
      { role: 'Illustrator', needed: 2, filled: 1 },
      { role: 'Writer', needed: 1, filled: 0 },
    ],
    team: [
      { username: '@MQ Media', role: 'Project Lead / Director', avatar: '' },
      { username: '@echo_voice', role: 'Voice Actor', avatar: '' },
      { username: '@kitsune_art', role: 'Illustrator', avatar: '' },
      { username: '@synthwave_sam', role: 'Composer', avatar: '' },
    ],
    status: 'In Production',
    startDate: 'Jan 2026',
    genre: 'Cyberpunk Urban Fantasy',
  },
  {
    id: '2',
    title: 'The Monsters Within',
    description: 'We are seeking team members a cooperative horror game. This is a remote, paid project. The game features a cast of four playable characters, which serve as the primary lead roles. These roles cover the base game; however, dlc content is planned, and we intend to bring back the original cast.',
    thumbnail: imgMonstersWithinThumbnail,
    listedBy: '@MQ Media',
    timeAgo: '5 days ago',
    tags: [
      { label: 'Paid', type: 'outline' },
      { label: 'Short-term', type: 'outline' },
    ],
    deadlineDays: 5,
    lookingFor: ['Developer', 'Composer'],
    paymentType: 'Paid',
    duration: 'Short-term',
    availability: 'Open',
    category: 'development',
    fullDescription: 'We are seeking team members for a cooperative horror game. This is a remote, paid project. The game features a cast of four playable characters, which serve as the primary lead roles. These roles cover the base game; however, DLC content is planned, and we intend to bring back the original cast.\n\nThe Monsters Within is a 4-player cooperative survival horror game set in an abandoned research facility. Players must work together to uncover the dark secrets buried beneath the facility while surviving encounters with terrifying creatures born from failed experiments.\n\nWe need a developer experienced with multiplayer networking and game systems, as well as a composer who can create tension-building atmospheric soundscapes. This is a paid, short-term engagement with potential for continued work on DLC content.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1551536637-f5f1984f1398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBnYW1lJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzc1NDA1NTE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1762968755007-7cc86ae46707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyJTIwY3JlYXR1cmUlMjBkYXJrJTIwY29uY2VwdHxlbnwxfHx8fDE3NzU0NTI2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1725854928339-94a96e94f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBlbnZpcm9ubWVudCUyMGNvbmNlcHQlMjBhcnR8ZW58MXx8fHwxNzc1NDUyNjYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    roles: [
      { role: 'Developer', needed: 1, filled: 0 },
      { role: 'Composer', needed: 1, filled: 0 },
    ],
    team: [
      { username: '@MQ Media', role: 'Project Lead / Producer', avatar: '' },
      { username: '@artisan_lily', role: 'Concept Artist', avatar: '' },
    ],
    status: 'Pre-Production',
    startDate: 'Mar 2026',
    genre: 'Cooperative Horror',
  },
];

export const creators: Creator[] = [
  {
    id: '1',
    username: '@kitsune_art',
    avatar: avatarKitsune,
    profileBannerColor: '#1f5a3b',
    bio: "I'm looking for someone to collab with to make a comic! I specialize in character design and sequential art.",
    portfolioImages: [
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1667419136229-ce2c6e127a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9ydHJhaXQlMjBpbGx1c3RyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1763732397784-c5ff2651d40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnQlMjBwYW5lbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    skillTags: ['Illustrator', 'Writer'],
    interestTags: ['Marvel Cinematic Universe', 'Honkai Star Rail'],
    paymentType: 'Hobby',
    duration: 'Long-term',
    availability: 'Open',
    category: 'illustration',
    localTime: '3:42 PM JST',
    languages: ['EN', 'JP'],
    lastSeen: 'Today',
    socials: [
      { platform: 'Bluesky', handle: '@kitsune_art', url: '#' },
      { platform: 'Twitter', handle: '@kitsune_art', url: '#' },
      { platform: 'Instagram', handle: '@kitsune_art', url: '#' },
    ],
    maxProjects: 3,
    aboutMe: "I'm looking for someone to collab with to make a comic! I specialize in character design and sequential art. I love working on collaborative projects that push creative boundaries. My work spans across multiple mediums, and I'm always eager to explore new styles and techniques with fellow creators.",
    collabVoice:
      "I’m pretty laid-back day-to-day but weirdly obsessive once I’m in the flow—expect lots of WIPs in Discord and zero drama about revisions. I work async across time zones fine; just drop refs and mood boards and I’ll run with them. I’m on time for milestones when we agree on dates, and I’d rather over-communicate a panel than ghost you wondering what’s happening.",
    showcaseImages: [
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1667419136229-ce2c6e127a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9ydHJhaXQlMjBpbGx1c3RyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1763732397784-c5ff2651d40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnQlMjBwYW5lbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2hhcmFjdGVyJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwY29uY2VwdCUyMGVudmlyb25tZW50fGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1760113671986-63ccb46ae202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nYSUyMGNvbWljJTIwcGFnZSUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNjEzODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    recentCollabs: [
      {
        id: 'rc-1',
        title: 'Project Gnosis',
        role: 'Illustrator',
        thumbnail: imgProjectGnosisThumbnail,
        collaborators: ['@MQ Media', '@starbinski'],
        projectId: '1',
        listingStatus: 'Open',
      },
      { id: 'rc-2', title: 'Starbound Legends', role: 'Character Designer', thumbnail: 'https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwY29uY2VwdCUyMGVudmlyb25tZW50fGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080', collaborators: ['@pixelforge', '@echo_voice'] },
    ],
    testimonials: [
      { id: 't-1', author: '@MQ Media', text: 'Kitsune is an incredible artist with a strong work ethic. Their character designs for Project Gnosis were absolutely stunning. Highly recommend!', avatar: '' },
      { id: 't-2', author: '@starbinski', text: 'Working with kitsune_art was a fantastic experience. They brought our characters to life in ways I never imagined. Very responsive and professional.', avatar: '' },
      { id: 't-3', author: '@pixelforge', text: 'Amazing collaborator! Quick turnaround, beautiful art, and always open to feedback. Would work with them again in a heartbeat.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'ArtStation', url: '#' },
      { platform: 'DeviantArt', url: '#' },
      { platform: 'Carrd', url: '#' },
    ],
  },
  {
    id: '2',
    username: '@starbinski',
    avatar: avatarStarbinski,
    profileBannerColor: '#4a2a4f',
    bio: 'Emotional prose and personal essays—pieces from “a book I’ll never write.” Open to narrative collabs and IF projects.',
    portfolioImages: [
      imgStarbinskiGlimpse,
      imgStarbinskiToFeel,
      imgStarbinskiMonster,
      imgStarbinskiWhy,
    ],
    skillTags: ['Writing', 'Paid'],
    interestTags: ['Interactive Fiction', 'Visual Novel', 'RPG'],
    paymentType: 'Paid',
    duration: 'Short-term',
    availability: 'Open',
    category: 'writing',
    localTime: '10:42 AM EST',
    languages: ['EN'],
    lastSeen: '2 hours ago',
    socials: [
      { platform: 'Twitter', handle: '@starbinski', url: '#' },
      { platform: 'Bluesky', handle: '@starbinski', url: '#' },
    ],
    maxProjects: 2,
    aboutMe:
      'I write candid, lyrical prose about feeling too much, healing, and making peace with being human. My pieces live in the same world as “Extracts From A Book I’ll Never Write”—short essays and fragments you can read in one sitting. I’m open to interactive fiction, visual novel scripts, and collaborations where voice and vulnerability matter.',
    collabVoice:
      'I treat writing like a slow conversation—Google Docs, comments, and the occasional voice note when tone matters. I’m flexible on cadence but sharp on deadlines we set together; I need a little emotional runway to do my best work, so I’ll always say if I need an extra day rather than vanish. Email or Bluesky DMs both work; I answer in batches when I’m deep in a piece.',
    showcaseImages: [imgStarbinskiGlimpse, imgStarbinskiToFeel, imgStarbinskiMonster, imgStarbinskiWhy],
    recentCollabs: [
      {
        id: 'rc-3',
        title: 'Echoes of Dawn',
        role: 'Writer',
        thumbnail: imgStarbinskiWhy,
        collaborators: ['@kitsune_art'],
      },
    ],
    testimonials: [
      {
        id: 't-4',
        author: '@kitsune_art',
        text: 'starbinski is a talented writer with incredible storytelling skills. Our collaboration was seamless!',
        avatar: '',
      },
    ],
    portfolioLinks: [
      { platform: 'Wattpad', url: '#' },
      { platform: 'AO3', url: '#' },
    ],
  },
  {
    id: '3',
    username: '@pixelforge',
    avatar: avatarPixelforge,
    profileBannerColor: '#2b3d6b',
    bio: 'Game developer specializing in Unity and Unreal Engine. Looking for artists and composers to collaborate on an indie RPG.',
    portfolioImages: [
      'https://images.unsplash.com/photo-1647727416391-0bc8f5bda78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1759171052927-83f3b3a72b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHJldHJvJTIwZ2FtZXxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaWxsdXN0cmF0aW9uJTIwZmFudGFzeSUyMGFydHxlbnwxfHx8fDE3NzUyNDExMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    skillTags: ['Development', 'Hobby'],
    interestTags: ['Unity', 'RPG', 'Indie'],
    paymentType: 'Hobby',
    duration: 'Long-term',
    availability: 'Open',
    category: 'development',
    localTime: '7:42 PM GMT',
    languages: ['EN', 'DE'],
    lastSeen: '1 day ago',
    socials: [
      { platform: 'Twitter', handle: '@pixelforge', url: '#' },
      { platform: 'GitHub', handle: '@pixelforge', url: '#' },
    ],
    maxProjects: 2,
    aboutMe: 'Game developer specializing in Unity and Unreal Engine. Open to the right scoped collaborations—message to discuss fit and timing.',
    collabVoice:
      'When I’m building with someone I want specs in writing—GitHub issues, checklists, no vague “make it fun.” I’m async-first, review PRs on a predictable rhythm, and I’m blunt about scope so nobody’s surprised at crunch. If you’re into milestone-based sprints and documented decisions, we’ll get along; if you need daily stand-ups in voice, I’m probably not your person.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1647727416391-0bc8f5bda78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1759171052927-83f3b3a72b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHJldHJvJTIwZ2FtZXxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaWxsdXN0cmF0aW9uJTIwZmFudGFzeSUyMGFydHxlbnwxfHx8fDE3NzUyNDExMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    recentCollabs: [],
    testimonials: [
      { id: 't-5', author: '@synthwave_sam', text: 'Pixelforge is a brilliant developer. Their technical skills are top-notch!', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'GitHub', url: '#' },
      { platform: 'itch.io', url: '#' },
    ],
  },
  {
    id: '4',
    username: '@echo_voice',
    avatar: avatarEchoVoice,
    profileBannerColor: '#4b3a22',
    bio: 'Professional voice actor with home studio setup. Available for character roles, narration, and audio drama projects.',
    portfolioImages: [
      'https://images.unsplash.com/photo-1750327324364-6700eab9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1726332365444-76095559c75c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXB0JTIwYXJ0JTIwbGFuZHNjYXBlJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    skillTags: ['Voice Acting', 'Paid'],
    interestTags: ['Drama', 'RPG', 'Anime'],
    paymentType: 'Paid',
    duration: 'Short-term',
    availability: 'Open',
    category: 'voice-acting',
    localTime: '11:42 AM CST',
    languages: ['EN', 'ES'],
    lastSeen: '30 min ago',
    socials: [
      { platform: 'Twitter', handle: '@echo_voice', url: '#' },
      { platform: 'YouTube', handle: '@echo_voice', url: '#' },
    ],
    maxProjects: 5,
    aboutMe: 'Professional voice actor with home studio setup. Available for character roles, narration, and audio drama projects. I bring characters to life with versatile vocal performances.',
    collabVoice:
      'I run a tight ship on scheduling—book a session, you’ll get files named the way you asked and usually ahead of the clock. I like direction in bullet points or marked scripts; ad-libbing is fun once we trust each other. Communication is email or Discord for logistics, WAV delivery by link; rush turnaround costs extra and I’ll always quote before I record.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1750327324364-6700eab9ad7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcGFpbnRpbmclMjBhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    recentCollabs: [
      {
        id: 'rc-4',
        title: 'The Monsters Within',
        role: 'Voice Actor',
        thumbnail: imgMonstersWithinThumbnail,
        collaborators: ['@MQ Media'],
        projectId: '2',
        listingStatus: 'Closed',
      },
    ],
    testimonials: [
      { id: 't-6', author: '@MQ Media', text: 'Echo delivered phenomenal voice work. Their range and professionalism made our project shine.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'YouTube', url: '#' },
      { platform: 'SoundCloud', url: '#' },
    ],
  },
  {
    id: '5',
    username: '@synthwave_sam',
    avatar: avatarSynthwaveSam,
    profileBannerColor: '#2a4b43',
    bio: 'Composer and sound designer creating atmospheric soundscapes. Interested in horror and sci-fi game projects.',
    portfolioImages: [
      'https://images.unsplash.com/photo-1759171052927-83f3b3a72b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHJldHJvJTIwZ2FtZXxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1647727416391-0bc8f5bda78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1667419136229-ce2c6e127a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwcG9ydHJhaXQlMjBpbGx1c3RyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    skillTags: ['Composing', 'Hobby'],
    interestTags: ['Horror', 'Sci-fi', 'Ambient'],
    paymentType: 'Hobby',
    duration: 'Long-term',
    availability: 'Open',
    category: 'composing',
    localTime: '5:42 PM CET',
    languages: ['EN', 'FR'],
    lastSeen: '3 days ago',
    socials: [
      { platform: 'SoundCloud', handle: '@synthwave_sam', url: '#' },
      { platform: 'Bandcamp', handle: '@synthwave_sam', url: '#' },
    ],
    maxProjects: null,
    aboutMe: 'Composer and sound designer creating atmospheric soundscapes. Open to hearing about projects—reach out to discuss scope and schedule.',
    collabVoice:
      'My process is tidal—I’ll go quiet for a few days while I chase a sound, then flood you with stems and alts. I’m lax about chatty check-ins but ruthless about vibe: send reference tracks, not adjectives. I prefer async DMs and shared folders; if you need live iteration we’ll block a couple of focused calls instead of endless pings.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1759171052927-83f3b3a72b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMHJldHJvJTIwZ2FtZXxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1647727416391-0bc8f5bda78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGNoYXJhY3RlciUyMGRlc2lnbnxlbnwxfHx8fDE3NzUzNTU2NjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    recentCollabs: [],
    testimonials: [],
    portfolioLinks: [
      { platform: 'SoundCloud', url: '#' },
      { platform: 'Bandcamp', url: '#' },
    ],
  },
  {
    id: '6',
    username: '@artisan_lily',
    avatar: avatarArtisanLily,
    profileBannerColor: '#5a2d1f',
    bio: 'Freelance illustrator focused on fantasy and character art. Open to both paid and passion projects!',
    portfolioImages: [
      'https://images.unsplash.com/photo-1763732397784-c5ff2651d40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnQlMjBwYW5lbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1769203905592-75f6902dc651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGdvdGhpYyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    skillTags: ['Illustration', 'Paid'],
    interestTags: ['Fantasy', 'DnD', 'Original Character'],
    paymentType: 'Paid',
    duration: 'Short-term',
    availability: 'Open',
    category: 'illustration',
    localTime: '9:42 AM PST',
    languages: ['EN', 'KR'],
    lastSeen: 'Today',
    socials: [
      { platform: 'Twitter', handle: '@artisan_lily', url: '#' },
      { platform: 'Instagram', handle: '@artisan_lily', url: '#' },
      { platform: 'Bluesky', handle: '@artisan_lily', url: '#' },
    ],
    maxProjects: 4,
    aboutMe: 'Freelance illustrator focused on fantasy and character art. Open to both paid and passion projects! I love bringing fantastical worlds and characters to life.',
    collabVoice:
      'I’m friendly and chatty in DMs—expect rough color thumbs before I polish, and Pinterest boards are my love language. I like short feedback rounds with numbered notes so nothing gets lost. Turnaround speeds up once we lock a design; I’m punctual on invoices and file handoff, and I’ll nudge you if a reference is missing instead of guessing.',
    showcaseImages: [
      'https://images.unsplash.com/photo-1763732397784-c5ff2651d40c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBhcnQlMjBwYW5lbCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1769203905592-75f6902dc651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZmFudGFzeSUyMGdvdGhpYyUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NzUzNTU2NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1613658501648-58f72a09355f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNoYXJhY3RlciUyMGRpZ2l0YWwlMjBwYWludGluZ3xlbnwxfHx8fDE3NzUzNTU2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1695152979271-a8927a3b2700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmNvbG9yJTIwcG9ydHJhaXQlMjBwYWludGluZyUyMGFydHxlbnwxfHx8fDE3NzUzNjEzODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
    recentCollabs: [
      { id: 'rc-5', title: 'Realm of Echoes', role: 'Illustrator', thumbnail: 'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2hhcmFjdGVyJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080', collaborators: ['@starbinski', '@echo_voice'] },
    ],
    testimonials: [
      { id: 't-7', author: '@starbinski', text: 'Lily is an exceptional artist. Her fantasy illustrations added so much depth to our project!', avatar: '' },
      { id: 't-8', author: '@echo_voice', text: 'Wonderful to collaborate with. Great communication and stunning artwork every time.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'ArtStation', url: '#' },
      { platform: 'Ko-fi', url: '#' },
    ],
  },
];

export type CreatorSidebarLinkEntry =
  | { kind: 'social'; social: Creator['socials'][number] }
  | { kind: 'portfolio'; link: Creator['portfolioLinks'][number]; idx: number };

/** Same merge order as profile sidebar: socials first, then portfolio links (capped). */
export function getCreatorSidebarLinkEntries(creator: Creator | undefined, max = 4): CreatorSidebarLinkEntry[] {
  if (!creator) return [];
  const items: CreatorSidebarLinkEntry[] = [
    ...creator.socials.map((social) => ({ kind: 'social' as const, social })),
    ...creator.portfolioLinks.map((link, idx) => ({ kind: 'portfolio' as const, link, idx })),
  ];
  return items.slice(0, max);
}

export function getCreatorAvatarById(creatorId: string): string | undefined {
  const c = creators.find((x) => x.id === creatorId);
  return c?.avatar || undefined;
}

/** Match `@handle` to a creator profile avatar (e.g. recommendations authors). */
export function getCreatorAvatarByUsername(username: string): string | undefined {
  const t = username.trim();
  const normalized = t.startsWith('@') ? t : `@${t}`;
  const c = creators.find((x) => x.username === normalized);
  return c?.avatar || undefined;
}

/** Resolve profile route id for a handle (e.g. recommendations). */
export function getCreatorIdByUsername(username: string): string | undefined {
  const t = username.trim();
  const normalized = t.startsWith('@') ? t : `@${t}`;
  return creators.find((x) => x.username === normalized)?.id;
}