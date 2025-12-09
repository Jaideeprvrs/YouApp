import { PostProps } from "./PostProps";

export interface MemoizedDetailsComponentProps {
  item: PostProps;
  handlePress: (item: PostProps) => void;
}
