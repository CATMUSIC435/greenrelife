import type { Conversation, Match, Service, User } from '@/types';

export const currentUser: User = {
  id: 1,
  name: 'Alice Chen',
  avatar:
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
  location: 'Downtown',
  rating: 4.7,
};

export const initialServices: Service[] = [
  {
    id: 1,
    title: 'Expert Carpentry & Woodworking',
    description:
      'Custom furniture building and intricate repairs. Specializing in handcrafted wooden furniture with premium materials and meticulous attention to detail. Available for small repairs and full custom builds.',
    category: 'Home Repair',
    userId: 1,
    userName: 'Alice Chen',
    ratings: 4.7,
    location: 'Downtown',
    price: '$50/hour or quote-based',
    availability: ['Mon-Fri 9AM-5PM', 'Sat 10AM-2PM'],
    contactEmail: 'alice.c@example.com',
    contactPhone: '(555) 123-4567',
    isFavorite: false,
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx8Y2FycGVudHJ5fGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    title: 'Sustainable Organic Gardening',
    description:
      'Planting, weeding, garden setup & consultation. Comprehensive organic gardening services: soil prep, plant selection, design, maintenance. Using only sustainable methods.',
    category: 'Gardening',
    userId: 2,
    userName: 'Bob Williams',
    ratings: 4.9,
    location: 'Westside',
    price: '$40/hour',
    availability: ['Mon-Fri 8AM-6PM', 'Sun 9AM-12PM'],
    contactEmail: 'bob.garden@example.com',
    isFavorite: true,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8M3x8b3JnYW5pYyUyMGdhcmRlbmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    title: 'Gourmet Meal Prep Service',
    description:
      'Healthy, delicious weekly meal prep tailored to you. Customized plans for dietary needs. Fresh, seasonal ingredients, eco-friendly packaging. Easy reheating for busy lifestyles.',
    category: 'Cooking',
    userId: 3,
    userName: 'Charlie Davis',
    ratings: 4.5,
    location: 'Eastside',
    price: '$135 for 5 meals (2 servings each)',
    availability: ['Sun 9AM-3PM', 'Wed 10AM-6PM'],
    contactPhone: '(555) 987-6543',
    isFavorite: false,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8Mnx8bWVhbCUyMHByZXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    title: 'Deep Eco-Friendly Cleaning',
    description:
      'Thorough home cleaning services. Comprehensive deep cleaning: dusting, vacuuming, mopping, bathrooms, kitchens, windows. Using eco-friendly products. Special requests welcome.',
    category: 'Cleaning',
    userId: 4,
    userName: 'David Rodriguez',
    ratings: 4.9,
    location: 'North Hills',
    price: '$35/hour or flat rate',
    availability: ['Tue-Sat 8AM-4PM'],
    contactEmail: 'david.clean@example.com',
    contactPhone: '(555) 567-8901',
    isFavorite: true,
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8Mnx8Y2xlYW5pbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    title: 'Modern Web Development',
    description:
      'Custom website design & development. Building responsive, modern sites: UI/UX, front/back-end, CMS, e-commerce, ongoing support. Let\'s build your online presence.',
    category: 'Tech',
    userId: 5,
    userName: 'Eve Moreau',
    ratings: 4.8,
    location: 'South Valley',
    price: 'Starting at $1,800/project',
    availability: ['Weekdays 10AM-6PM'],
    contactEmail: 'eve.dev@example.com',
    isFavorite: false,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8Nnx8d2ViJTIwZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    title: 'Engaging Math Tutoring (K-12)',
    description:
      'Personalized math tutoring for all grades. Homework help, test prep, concept understanding, problem-solving skills. Adapting teaching style to each student\'s needs.',
    category: 'Education',
    userId: 6,
    userName: 'Frank Gomez',
    ratings: 4.6,
    location: 'University Area',
    price: '$45/hour (package discounts)',
    availability: ['Mon-Thu 3PM-8PM', 'Sat 10AM-2PM'],
    contactEmail: 'frank.math@example.com',
    contactPhone: '(555) 234-5678',
    isFavorite: false,
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8NHx8dHV0b3Jpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    title: 'Sunday Morning Yoga Flow',
    description:
      'Relaxing & rejuvenating yoga sessions. Perfect for beginners/intermediate. Focus on mindfulness, flexibility, and strength in a calming park environment.',
    category: 'Fitness',
    userId: 7,
    userName: 'Grace Kim',
    ratings: 4.8,
    location: 'East Side Park',
    price: '$18/class or $60/month pass',
    availability: ['Sunday 8AM-11AM'],
    contactEmail: 'grace.yoga@example.com',
    contactPhone: '(555) 987-6543',
    isFavorite: false,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    image:
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxZWFyY2h8Mnx8eW9nYSUyMGNsYXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
  },
];

export const initialMatches: Match[] = [
  {
    id: 1,
    serviceId: 1,
    matchingServiceId: 2,
    userId: 1,
    matchingUserId: 2,
    status: 'accepted',
  },
  {
    id: 2,
    serviceId: 2,
    matchingServiceId: 1,
    userId: 2,
    matchingUserId: 1,
    status: 'accepted',
  },
  {
    id: 3,
    serviceId: 3,
    matchingServiceId: 4,
    userId: 3,
    matchingUserId: 4,
    status: 'pending',
  },
];

export const initialConversations: Conversation[] = [
  {
    id: 1,
    participantUserId: 2,
    participantUserName: 'Bob Williams',
    participantAvatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    unreadCount: 0,
    lastActive: new Date(Date.now() - 10000),
    serviceId: 2,
    matchId: 1,
    messages: [
      {
        id: 1,
        text: 'Hey Bob, saw you need carpentry. Interested in trading for gardening help?',
        userId: 1,
        timestamp: new Date(Date.now() - 100000),
        read: true,
      },
      {
        id: 2,
        text: 'Hi Alice! Absolutely, that sounds perfect. What did you have in mind?',
        userId: 2,
        timestamp: new Date(Date.now() - 50000),
        read: true,
      },
      {
        id: 3,
        text: 'Great! I need help setting up some raised garden beds.',
        userId: 1,
        timestamp: new Date(Date.now() - 10000),
        read: true,
      },
    ],
  },
  {
    id: 2,
    participantUserId: 3,
    participantUserName: 'Charlie Davis',
    participantAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    unreadCount: 1,
    lastActive: new Date(Date.now() - 200000),
    serviceId: 3,
    messages: [
      {
        id: 1,
        text: 'Hi Charlie, I saw your meal prep service. Would you be interested in house cleaning in exchange?',
        userId: 1,
        timestamp: new Date(Date.now() - 400000),
        read: true,
      },
      {
        id: 2,
        text: 'Hey Alice! I might be interested, what kind of cleaning do you offer?',
        userId: 3,
        timestamp: new Date(Date.now() - 300000),
        read: true,
      },
      {
        id: 3,
        text: 'I offer standard and deep cleaning. Let me know if that works!',
        userId: 1,
        timestamp: new Date(Date.now() - 200000),
        read: false,
      },
    ],
  },
  {
    id: 3,
    participantUserId: 4,
    participantUserName: 'David Rodriguez',
    participantAvatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
    unreadCount: 0,
    lastActive: new Date(Date.now() - 500000),
    serviceId: 4,
    messages: [
      {
        id: 1,
        text: 'Hi David, need help with your website in exchange for cleaning?',
        userId: 5,
        timestamp: new Date(Date.now() - 600000),
        read: true,
      },
      {
        id: 2,
        text: 'Just give me a heads up!',
        userId: 4,
        timestamp: new Date(Date.now() - 500000),
        read: true,
      },
    ],
  },
];
