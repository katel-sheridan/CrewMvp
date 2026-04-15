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
  projectType: string;
  comments: { id: string; author: string; text: string; timestamp: string }[];
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
  audioShowcase?: { title: string; thumbnail: string; audioSrc: string }[];
  videoShowcase?: { title: string; youtubeId: string }[];
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
  { id: '3d-modelling', label: '3D Modeling', icon: 'box' },
];

export const paymentTypes = ['Any', 'Paid', 'Hobby'];
export const durations = ['Any', 'Short-term', 'Long-term', 'One-time'];
export const availabilities = ['Any', 'Open', 'Closed'];

import imgProjectGnosisThumbnail from "../../assets/projects/project-gnosis.png";
import imgMonstersWithinThumbnail from "../../assets/projects/monsters-within.png";
import imgEidolwareThumbnail from "../../assets/projects/eidolware/thumbnail.png";
import imgEidolwareShowcase1 from "../../assets/projects/eidolware/showcase-1.png";
import imgEidolwareShowcase2 from "../../assets/projects/eidolware/showcase-2.png";
import imgStarbinskiGlimpse from "../../assets/creators/starbinski/glimpse-of-insanity.png";
import imgStarbinskiToFeel from "../../assets/creators/starbinski/to-feel-too-much.png";
import imgStarbinskiMonster from "../../assets/creators/starbinski/a-monster.png";
import imgStarbinskiWhy from "../../assets/creators/starbinski/why-i-write.png";
import avatarEuphy from "../../assets/avatars/creators/avatar-euphy.png";
import avatarStarbinski from "../../assets/avatars/creators/avatar-starbinski.png";
import avatarDotDev from "../../assets/avatars/creators/avatar-dotdev.png";
import imgDotDev1 from "../../assets/creators/dotdev/showcase-1.png";
import imgDotDev2 from "../../assets/creators/dotdev/showcase-2.png";
import imgDotDev3 from "../../assets/creators/dotdev/showcase-3.png";
import imgDotDev4 from "../../assets/creators/dotdev/showcase-4.png";
import imgGnosisShowcase1 from "../../assets/projects/gnosis-showcase/showcase-1.png";
import imgGnosisShowcase2 from "../../assets/projects/gnosis-showcase/showcase-2.png";
import imgGnosisShowcase3 from "../../assets/projects/gnosis-showcase/showcase-3.png";
import imgGnosisShowcase4 from "../../assets/projects/gnosis-showcase/showcase-4.png";
import imgGnosisShowcase5 from "../../assets/projects/gnosis-showcase/showcase-5.png";
import avatarDylanRayOwen from "../../assets/avatars/creators/avatar-dylan-ray-owen.png";
import avatarSynthwaveSam from "../../assets/avatars/creators/avatar-synthwave-sam.png";
import avatarEstellePanel from "../../assets/avatars/creators/avatar-estelle-panel.png";
import imgEuphy1 from "../../assets/creators/euphy/showcase-1.png";
import imgEuphy2 from "../../assets/creators/euphy/showcase-2.png";
import imgEuphy3 from "../../assets/creators/euphy/showcase-3.png";
import imgEuphy4 from "../../assets/creators/euphy/showcase-4.png";
import imgEuphy5 from "../../assets/creators/euphy/showcase-5.png";
import imgEchoVoice1 from "../../assets/creators/echo-voice/showcase-1.png";
import imgEchoVoice2 from "../../assets/creators/echo-voice/showcase-2.png";
import imgEchoVoice3 from "../../assets/creators/echo-voice/showcase-3.png";
import imgDylanYT from "../../assets/creators/echo-voice/yt-thumbnail.jpg";
import imgSynthwaveSam1 from "../../assets/creators/synthwave-sam/showcase-1.png";
import imgSynthwaveSam2 from "../../assets/creators/synthwave-sam/showcase-2.png";
import imgSynthwaveSam3 from "../../assets/creators/synthwave-sam/showcase-3.png";
import imgGPLostSoul from "../../assets/creators/synthwave-sam/lost-soul.png";
import imgGPWarrior from "../../assets/creators/synthwave-sam/warrior.png";
import imgGPDeduction from "../../assets/creators/synthwave-sam/deduction-method.png";
import imgGPTimeCollapses from "../../assets/creators/synthwave-sam/when-time-collapses.png";
import audioGPLostSoul from "../../assets/creators/synthwave-sam/lost-soul.mp3";
import audioGPWarrior from "../../assets/creators/synthwave-sam/warrior.mp3";
import audioGPDeduction from "../../assets/creators/synthwave-sam/deduction-method.mp3";
import audioGPTimeCollapses from "../../assets/creators/synthwave-sam/when-time-collapses.mp3";
import imgEstellePanel1 from "../../assets/creators/estelle-panel/showcase-1.png";
import imgEstellePanel2 from "../../assets/creators/estelle-panel/showcase-2.png";
import imgEstellePanel3 from "../../assets/creators/estelle-panel/showcase-3.png";
import imgEstellePanel4 from "../../assets/creators/estelle-panel/showcase-4.png";

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
      imgGnosisShowcase1,
      imgGnosisShowcase2,
      imgGnosisShowcase3,
      imgGnosisShowcase4,
      imgGnosisShowcase5,
    ],
    roles: [
      { role: 'Illustrator', needed: 2, filled: 1 },
      { role: 'Writer', needed: 1, filled: 0 },
    ],
    team: [
      { username: '@MQ Media', role: 'Project Lead / Director', avatar: '' },
      { username: '@Dylan Ray Owen', role: 'Voice Actor', avatar: '' },
      { username: '@Euphy', role: 'Illustrator', avatar: '' },
      { username: '@Grand Project', role: 'Composer', avatar: '' },
    ],
    status: 'In Production',
    startDate: 'Jan 2026',
    genre: 'Cyberpunk Urban Fantasy',
    projectType: 'Podcast',
    comments: [
      { id: 'c-1', author: '@starbinski', text: 'The world-building on this is incredible. Love how you blend real-world mythology with cyberpunk aesthetics. Would be thrilled to help with the writing side.', timestamp: '2 days ago' },
      { id: 'c-2', author: '@Dylan Ray Owen', text: 'Recording session for Episode 3 went really well! The script keeps getting better.', timestamp: '4 days ago' },
      { id: 'c-3', author: '@Estelle Panel', text: 'The scene cards from last episode were gorgeous. This project has such a strong visual identity already.', timestamp: '1 week ago' },
      { id: 'c-4', author: '@Grand Project', text: 'Just finished the main theme arrangement. Can\u2019t wait for everyone to hear it in context.', timestamp: '1 week ago' },
    ],
  },
  {
    id: '2',
    title: 'Eidolware',
    description: 'Infiltrate a 24/7 anime convention where holograms are real, influencers reign supreme, and Otaku culture has gone completely off the rails in this satirical cyberpunk action-RPG by FATBAT Studio.',
    thumbnail: imgEidolwareThumbnail,
    listedBy: '@FATBAT Studio',
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
    fullDescription: 'Infiltrate a 24/7 anime convention where holograms are real, influencers reign supreme, and Otaku culture has gone completely off the rails in this satirical cyberpunk action-RPG by FATBAT Studio.\n\nYou are Anna Lam, a former AI engineer. The mysterious death of your mentor has led you to a newly established 24-hour anime convention, owned and operated by a crypto-billionaire who styles himself "Fedora Mask".\n\nImmerse yourself in the convention and meet its strange denizens. Team up with unlikely allies to defeat Fedora Mask\u2019s lieutenants and gain access to the convention\u2019s inner circle. Uncover the truth behind your mentor\u2019s death and if anyone is responsible, put an end to their plans.',
    showcaseImages: [
      imgEidolwareThumbnail,
      imgEidolwareShowcase1,
      imgEidolwareShowcase2,
    ],
    roles: [
      { role: 'Developer', needed: 1, filled: 0 },
      { role: 'Composer', needed: 1, filled: 0 },
    ],
    team: [
      { username: '@FATBAT Studio', role: 'Project Lead / Developer', avatar: '' },
      { username: '@Dylan Ray Owen', role: 'Voice Actor', avatar: '' },
      { username: '@Estelle Panel', role: 'Concept Artist', avatar: '' },
    ],
    status: 'In Development',
    startDate: 'Mar 2026',
    genre: 'Satirical Cyberpunk Action-RPG',
    projectType: 'Video Game',
    comments: [
      { id: 'c-5', author: '@Dylan Ray Owen', text: 'The voice direction doc is super detailed\u2014made my first session a breeze. Really excited about the Fedora Mask character.', timestamp: '3 days ago' },
      { id: 'c-6', author: '@Estelle Panel', text: 'Concept art for the convention floor is coming together. The neon signage and hologram stalls are going to look wild.', timestamp: '5 days ago' },
      { id: 'c-7', author: '@DotDev', text: 'This premise is absolutely unhinged in the best way. Would love to help build the UI for the in-game phone system if you need a hand.', timestamp: '1 week ago' },
    ],
  },
];

/** Open listings first, then unspecified, then Closed. */
function sortRecentCollabsByListingStatus(collabs: Creator['recentCollabs']): Creator['recentCollabs'] {
  const rank = (s?: 'Open' | 'Closed') => (s === 'Open' ? 0 : s === 'Closed' ? 2 : 1);
  return [...collabs].sort((a, b) => rank(a.listingStatus) - rank(b.listingStatus));
}

const creatorsRaw: Creator[] = [
  {
    id: '1',
    username: '@Euphy',
    avatar: avatarEuphy,
    profileBannerColor: '#1f5a3b',
    bio: "I'm looking for someone to collab with to make a comic! I specialize in character design and sequential art.",
    portfolioImages: [imgEuphy1, imgEuphy2, imgEuphy1],
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
      { platform: 'Bluesky', handle: '@Euphy', url: '#' },
      { platform: 'Twitter', handle: '@Euphy', url: '#' },
      { platform: 'Instagram', handle: '@Euphy', url: '#' },
    ],
    maxProjects: 3,
    aboutMe: "I'm looking for someone to collab with to make a comic! I specialize in character design and sequential art. I love working on collaborative projects that push creative boundaries. My work spans across multiple mediums, and I'm always eager to explore new styles and techniques with fellow creators.",
    collabVoice:
      "I’m pretty laid-back day-to-day but weirdly obsessive once I’m in the flow—expect lots of WIPs in Discord and zero drama about revisions. I work async across time zones fine; just drop refs and mood boards and I’ll run with them. I’m on time for milestones when we agree on dates, and I’d rather over-communicate a panel than ghost you wondering what’s happening.",
    showcaseImages: [imgEuphy1, imgEuphy2, imgEuphy3, imgEuphy4, imgEuphy5],
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
      {
        id: 'rc-2',
        title: 'Starbound Legends',
        role: 'Character Designer',
        thumbnail: 'https://images.unsplash.com/photo-1728995025396-b5141e209455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwY29uY2VwdCUyMGVudmlyb25tZW50fGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        collaborators: ['@DotDev', '@Dylan Ray Owen'],
        listingStatus: 'Closed',
      },
    ],
    testimonials: [
      { id: 't-1', author: '@MQ Media', text: 'Euphy is an incredible artist with a strong work ethic. Their character designs for Project Gnosis were absolutely stunning. Highly recommend!', avatar: '' },
      { id: 't-2', author: '@starbinski', text: 'Working with Euphy was a fantastic experience. They brought our characters to life in ways I never imagined. Very responsive and professional.', avatar: '' },
      { id: 't-3', author: '@DotDev', text: 'Amazing collaborator! Quick turnaround, beautiful art, and always open to feedback. Would work with them again in a heartbeat.', avatar: '' },
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
        collaborators: ['@Euphy'],
      },
    ],
    testimonials: [
      {
        id: 't-4',
        author: '@Euphy',
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
    username: '@DotDev',
    avatar: avatarDotDev,
    profileBannerColor: '#1a2a4a',
    bio: 'Web developer with 14 years of experience across Shopify, WordPress, and Wix. Looking to collaborate on creative digital projects.',
    portfolioImages: [
      imgDotDev1,
      imgDotDev2,
      imgDotDev3,
    ],
    skillTags: ['Development', 'Paid'],
    interestTags: ['Shopify', 'WordPress', 'Web Design', 'Mobile Apps'],
    paymentType: 'Paid',
    duration: 'Long-term',
    availability: 'Open',
    category: 'development',
    localTime: '8:42 PM CET',
    languages: ['EN'],
    lastSeen: 'Today',
    socials: [
      { platform: 'Twitter', handle: '@DotDev', url: '#' },
      { platform: 'Website', handle: 'dotdev.co', url: '#' },
    ],
    maxProjects: 3,
    aboutMe: 'Web developer with 14 years of industry experience, looking to team up with fellow creators on collaborative digital projects. I specialize in building polished, high-converting websites on platforms like Shopify, WordPress, and Wix, and I’m proficient in mobile app development too. I also bring strong digital marketing chops to the table—SEO, paid campaigns, content strategy—so I can help a project not just launch, but actually reach people. If you need a dev who treats your project like their own, let’s talk.',
    collabVoice:
      'I like a quick kickoff call to nail down scope, then I’m heads-down until the first review. I work in sprints—you’ll get a staging link every few days so nothing’s a surprise. Slack or Discord for day-to-day, Loom videos for walkthroughs. I’m flexible on hours and timezone-friendly; I’d rather over-deliver than under-communicate.',
    showcaseImages: [
      imgDotDev1,
      imgDotDev2,
      imgDotDev3,
      imgDotDev4,
    ],
    recentCollabs: [],
    testimonials: [
      { id: 't-5', author: '@Grand Project', text: 'DotDev built our project site from scratch and it looked incredible. Fast turnaround, clean code, and great communication throughout.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'GitHub', url: '#' },
      { platform: 'Website', url: '#' },
    ],
  },
  {
    id: '4',
    username: '@Dylan Ray Owen',
    avatar: avatarDylanRayOwen,
    profileBannerColor: '#4b3a22',
    bio: "Dallas-based voice actor with a home studio, here to lend my voice to YOUR project! If you want to make something together, shoot me a message!",
    portfolioImages: [imgDylanYT, imgEchoVoice1, imgEchoVoice2],
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
      { platform: 'Twitter', handle: '@Dylan Ray Owen', url: '#' },
      { platform: 'YouTube', handle: '@Dylan Ray Owen', url: '#' },
    ],
    maxProjects: 5,
    aboutMe: "Hi there! My name's Dylan and I'm a Dallas-based voice actor with a home studio here to lend my voice to YOUR project! If you want to make something together, shoot me a message!",
    collabVoice:
      'I run a tight ship on scheduling—book a session, you’ll get files named the way you asked and usually ahead of the clock. I like direction in bullet points or marked scripts; ad-libbing is fun once we trust each other. Communication is email or Discord for logistics, WAV delivery by link; rush turnaround costs extra and I’ll always quote before I record.',
    showcaseImages: [],
    videoShowcase: [
      { title: 'Voice Acting Demo Reel', youtubeId: 'wgqK5uXtAm0' },
    ],
    recentCollabs: [
      {
        id: 'rc-4',
        title: 'Eidolware',
        role: 'Voice Actor',
        thumbnail: imgEidolwareThumbnail,
        collaborators: ['@FATBAT Studio'],
        projectId: '2',
        listingStatus: 'Open',
      },
    ],
    testimonials: [
      { id: 't-6', author: '@FATBAT Studio', text: 'Dylan delivered phenomenal voice work. Their range and professionalism made our project shine.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'YouTube', url: '#' },
      { platform: 'SoundCloud', url: '#' },
    ],
  },
  {
    id: '5',
    username: '@Grand Project',
    avatar: avatarSynthwaveSam,
    profileBannerColor: '#2a4b43',
    bio: 'Composer and sound designer creating atmospheric soundscapes. Interested in horror and sci-fi game projects.',
    portfolioImages: [imgSynthwaveSam1, imgSynthwaveSam2, imgSynthwaveSam3],
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
      { platform: 'SoundCloud', handle: '@GrandProject', url: '#' },
      { platform: 'Bandcamp', handle: '@GrandProject', url: '#' },
    ],
    maxProjects: null,
    aboutMe: 'Composer and sound designer creating atmospheric soundscapes. Open to hearing about projects—reach out to discuss scope and schedule.',
    collabVoice:
      'My process is tidal—I’ll go quiet for a few days while I chase a sound, then flood you with stems and alts. I’m lax about chatty check-ins but ruthless about vibe: send reference tracks, not adjectives. I prefer async DMs and shared folders; if you need live iteration we’ll block a couple of focused calls instead of endless pings.',
    showcaseImages: [imgGPLostSoul, imgGPWarrior, imgGPDeduction, imgGPTimeCollapses],
    audioShowcase: [
      { title: 'Lost Soul', thumbnail: imgGPLostSoul, audioSrc: audioGPLostSoul },
      { title: 'Warrior', thumbnail: imgGPWarrior, audioSrc: audioGPWarrior },
      { title: 'Deduction Method', thumbnail: imgGPDeduction, audioSrc: audioGPDeduction },
      { title: 'When Time Collapses', thumbnail: imgGPTimeCollapses, audioSrc: audioGPTimeCollapses },
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
    username: '@Estelle Panel',
    avatar: avatarEstellePanel,
    profileBannerColor: '#5a2d1f',
    bio: 'Lighting Artist in the video game industry, specializing in level and cinematic lighting.',
    portfolioImages: [imgEstellePanel1, imgEstellePanel2, imgEstellePanel3],
    skillTags: ['Lighting', 'Paid'],
    interestTags: ['Environments', 'Cinematics', 'Games'],
    paymentType: 'Paid',
    duration: 'Short-term',
    availability: 'Open',
    category: '3d-modelling',
    localTime: '4:22 PM CET',
    languages: ['EN', 'FR'],
    lastSeen: 'Today',
    socials: [
      { platform: 'Twitter', handle: '@EstellePanel', url: '#' },
      { platform: 'Instagram', handle: '@EstellePanel', url: '#' },
      { platform: 'Bluesky', handle: '@EstellePanel', url: '#' },
    ],
    maxProjects: 4,
    aboutMe: `Lighting Artist in the video game industry, specializing in level and cinematic lighting.

My experience includes working on in-house Engines (Silk Engine) and public Engines (Unreal 5), allowing me to quickly adapt to different pipelines. I have experience working on a project involving day–night cycle systems and the technical constraints associated.

Based in France, but open to remote or relocation opportunities.`,
    collabVoice:
      'I like clear lighting targets up front—reference grabs, mood boards, and what “good” looks like in-engine. I work iteratively with fast dailies so we can catch reads early; numbered feedback in reviews or docs keeps rounds tight. I’m used to Unreal and proprietary tools alike, and I’ll flag technical risks (performance, time of day, cinematics) early rather than polishing in the wrong direction.',
    showcaseImages: [imgEstellePanel1, imgEstellePanel2, imgEstellePanel3, imgEstellePanel4],
    recentCollabs: [
      { id: 'rc-6', title: 'Eidolware', role: 'Concept Artist', thumbnail: imgEidolwareThumbnail, collaborators: ['@FATBAT Studio', '@Dylan Ray Owen'], projectId: '2', listingStatus: 'Open' },
      {
        id: 'rc-5',
        title: 'Realm of Echoes',
        role: 'Illustrator',
        thumbnail: 'https://images.unsplash.com/photo-1773432661163-351c473345e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwY2hhcmFjdGVyJTIwYXJ0JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc3NTM2MTM4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        collaborators: ['@starbinski', '@Dylan Ray Owen'],
        listingStatus: 'Closed',
      },
    ],
    testimonials: [
      { id: 't-7', author: '@starbinski', text: 'Estelle is an exceptional lighting artist. Her work on our environments made every scene feel intentional and alive.', avatar: '' },
      { id: 't-8', author: '@Dylan Ray Owen', text: 'Wonderful to collaborate with—clear communication and a sharp eye for mood and readability in every shot.', avatar: '' },
    ],
    portfolioLinks: [
      { platform: 'ArtStation', url: '#' },
      { platform: 'Ko-fi', url: '#' },
    ],
  },
];

export const creators: Creator[] = creatorsRaw.map((c) => ({
  ...c,
  recentCollabs: sortRecentCollabsByListingStatus(c.recentCollabs),
}));

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