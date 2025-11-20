export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  userId: number;
  userName: string;
  ratings: number;
  location?: string;
  image?: string;
  price?: string;
  availability?: string[];
  contactEmail?: string;
  contactPhone?: string;
  isFavorite?: boolean;
  avatar?: string;
  isBooked?: boolean;
}

export interface Match {
  id: number;
  serviceId: number;
  matchingServiceId: number;
  userId: number;
  matchingUserId: number;
  status?: "pending" | "accepted" | "rejected" | "completed";
}

export interface Message {
  id: number;
  text: string;
  userId: number;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
  isEmoji?: boolean;
  isSystemMessage?: boolean;
}

export interface Conversation {
  id: number;
  participantUserId: number;
  participantUserName: string;
  participantAvatar?: string;
  unreadCount: number;
  lastActive: Date;
  serviceId?: number;
  matchId?: number;
  messages: Message[];
}

export interface User {
  id: number;
  name: string;
  avatar?: string;
  location?: string;
  rating?: number;
}

export interface Booking {
  id: number;
  serviceId: number;
  userId: number;
  date: string;
  time: string;
  status: "confirmed" | "canceled" | "completed";
  createdAt: Date;
}
