interface CreateResMsg {
  msg: string;
}

export interface CreateResType {
  success: boolean;
  msg: CreateResMsg[];
}

export interface PostType {
  content: string;
  date: Date;
  date_format: string;
  id: number;
  title: string;
  user_id: number;
  username: string;
}

export interface CommentType {
  content: string;
  date: Date;
  date_format: string;
  id: number;
  post_id: number;
  user_id: number;
  username: string;
}

export interface ChildrenProps {
  children: React.ReactNode;
}
