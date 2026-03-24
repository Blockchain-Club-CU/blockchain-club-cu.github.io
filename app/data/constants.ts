import { EventItem } from '@/app/types';

interface MemberItem {
  id: number;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

interface AboutItem {
  title: string;
  description?: string;
}

export const TEAM_MEMBERS: MemberItem[] = [
  {
    id: 1,
    name: 'Aman Kumar Jha',
    role: 'Secretary',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 2,
    name: 'Anshul Soni',
    role: 'Vice President',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 3,
    name: 'Anurag',
    role: 'Joint Secretary',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 4,
    name: 'Rahul Raj Jaiswal',
    role: 'Community Manager',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 5,
    name: 'Bhumi',
    role: 'Tech Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 6,
    name: 'Praveer Shrivastava',
    role: 'Tech Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 7,
    name: 'Shubham Singh',
    role: 'Social Media Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 8,
    name: 'Tripti Verma',
    role: 'Documentation & Research Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 9,
    name: 'Ritika',
    role: 'Documentation & Research Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 10,
    name: 'Shreya',
    role: 'Documentation & Research Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 11,
    name: 'Solanky Jeeth Kumar',
    role: 'Documentation & Research Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 12,
    name: 'Palak',
    role: 'Anchor Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 13,
    name: 'Kanika Sehgal',
    role: 'Anchor Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 14,
    name: 'Rohan Dhami',
    role: 'Anchor Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 15,
    name: 'Pragya Sethi',
    role: 'Anchor Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
  {
    id: 16,
    name: 'Aman Kumar',
    role: 'Event Lead',
    // image: '/api/placeholder/400/400',
    // linkedin: '#',
  },
];

export const EVENTS: EventItem[] = [
  {
    id: 2,
    title: `CHAINQUEST`,
    imageURL: 'event_posters/chainquest.jpeg',
    imageDarkURL: 'event_posters/chainquest.jpeg',
    date: 'March 28, 2026',
    time: '9:30 AM Onwards',
    location: 'D3 Seminar Hall',
    description: `Build the future of Decentralisation! Showcase your innovative ideas, compete with the brightest minds, and win exciting prizes, certificates, and exclusive swag.`,
    status: 'Upcoming',
    link: '',
    googleSheetId: '',
    formFields: [],
  },
  {
    id: 1,
    title: `TRANSFORMING INDUSTRY PAIN-POINTS INTO STARTUP SOLUTIONS WITH AI & BLOCKCHAIN`,
    imageURL: 'event_posters/TransformingIndustry_26_02_2026_light.png',
    imageDarkURL: 'event_posters/TransformingIndustry_26_02_2026_dark.png',
    date: 'February 26, 2026',
    time: '9:00 AM - 4:30 PM',
    location: 'B3, Seminar Hall',
    description: `Learn how real-world industry problems can be turned into scalable startup
ideas using AI and Blockchain technologies.`,
    status: 'Upcoming',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSeL0Fw4Mo3nC54h2HQJEQNrVeHbKJp6yqog3waiyMY78ouDQA/viewform',
    googleSheetId: 'test-sheet-id',
    formFields: [
      { name: 'Full Name', type: 'text', required: true },
      { name: 'Email', type: 'email', required: true },
      { name: 'Roll No', type: 'text', required: true },
      { name: 'Branch', type: 'text', required: true },
    ],
  },
];

export const ABOUT_CARDS = [
  {
    title: 'Learn',
    description:
      'Master blockchain fundamentals, Solidity, Rust, and Web3 development through hands-on workshops.',
  },
  {
    title: 'Build',
    description:
      'Participate in hackathons and build real-world dApps that solve actual problems.',
  },
  {
    title: 'Connect',
    description:
      'Network with industry leaders, alumni, and like-minded peers passionate about decentralization.',
  },
];

export const GalleryImages = [
  'gallery/0bfc3083-e3f7-4f50-831d-fdaecc6b4fdc.webp',
  'gallery/1b4023de-b987-4e99-abb1-8fb1dbd9d70b.webp',
  'gallery/1fda76f2-8df9-4426-85e1-bc4215352890.webp',
  'gallery/2ffa42aa-8a70-4fdd-b2dd-bf19247091db.webp',
  'gallery/004d8d3d-3685-4855-b2db-0d50f34d23c0.webp',
  'gallery/04e64f1d-7d13-4fd4-8568-6435a2a7e30e.webp',
  'gallery/5ce602dd-9cf2-4ed9-a664-17b0bc7c9e7a.webp',
  'gallery/5dc514e5-ea03-4147-8552-7db1a183d25e.webp',
  'gallery/9b4e6c29-79a3-4b6e-a807-49fdfeb9e54c.webp',
  'gallery/18b95b48-3231-49a7-bee1-a51d6dea42f1.webp',
  'gallery/0186de70-55e7-4f28-b2f3-3d9bb953e365.webp',
  'gallery/500aa670-037b-49a2-9ef0-e1688c8e9f88.webp',
  'gallery/b79f17e3-b5c8-4013-a891-6bf23911e88f.webp',
];
