export interface CommentType {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: string;
}
export interface CommentsComponentProps {
  item: CommentType;
  onEditPress: () => void;
  index: number;
}
