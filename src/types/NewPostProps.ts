import { Dispatch, SetStateAction } from "react";

export interface NewPostProps {
  postTitle: string;
  post: string;
  setPostTitle: Dispatch<SetStateAction<string>>;
  setPost: Dispatch<SetStateAction<string>>;
}
