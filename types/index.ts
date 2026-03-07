// User types
export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  bio?: string;
  avatar?: string;
  walletAddress: string;
  emailVerified: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
}

// Post types
export interface Post {
  id: string;
  author: {
    _id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  content: string;
  images: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isTokenized: boolean;
  createdAt: string;
  updatedAt: string;
}

// Comment types
export interface Comment {
  id: string;
  author: {
    _id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  post: string;
  parentComment?: string;
  content: string;
  likesCount: number;
  repliesCount: number;
  createdAt: string;
}

// Chat types
export interface Chat {
  id: string;
  participants: User[];
  otherParticipant: User;
  lastMessage?: string;
  lastMessageAt?: string;
  lastMessageBy?: User;
}

export interface Message {
  id: string;
  chat: string;
  sender: {
    _id: string;
    username: string;
    name?: string;
    avatar?: string;
  };
  content: string;
  type: 'text' | 'payment' | 'image';
  paymentAmount?: number;
  paymentSignature?: string;
  imageUrl?: string;
  isRead: boolean;
  isMine: boolean;
  createdAt: string;
}

// Transaction types
export interface Transaction {
  signature: string;
  type: 'send' | 'receive' | 'airdrop';
  amount: number;
  fromAddress?: string;
  toAddress?: string;
  status: 'pending' | 'confirmed' | 'failed';
  blockTime?: string;
  fee?: number;
  slot?: number;
}

// Wallet types
export interface WalletBalance {
  walletAddress: string;
  balance: number;
  balanceLamports: number;
}

// Payment types
export interface PaymentQR {
  address: string;
  amount: number | null;
  label: string;
  message: string;
}
