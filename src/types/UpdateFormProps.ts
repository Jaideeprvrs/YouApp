export interface UpdateFormProps {
  label?: string;
  email?: string;
  onChangeText?: any;
  id?: number;
  onUpdate?: () => void;
  value: string;
  isSheetOpen?: () => void;
}
