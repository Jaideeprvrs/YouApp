import { CommentType } from "./CommentsComponentProps";

export interface TextButtonProps {
  onEditPress: (item: CommentType) => void;
  item: CommentType;
  label: string;
}
