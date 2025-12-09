import { Dispatch, SetStateAction } from "react";

export interface LoginFormProps {
  name: string;
  email: string;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  handleOnClick: () => void;
}
