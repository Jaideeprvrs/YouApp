export interface CustomTabsProps {
  tabs: string[];
  onChange?: (index: number) => void;
  initialIndex?: number;
}
