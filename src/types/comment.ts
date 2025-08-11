export interface User {
  id: string;
  name: string;
  role: 'Pelanggan' | 'Administrator';
  avatar?: string;
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  replies: CommentReply[];
}

export interface CommentReply {
  id: string;
  user: User;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}
