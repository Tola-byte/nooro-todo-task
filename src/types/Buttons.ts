export interface ButtonProps {
  text: string;
  onClick?: () => void;
  icon?: string | null;
  color?: string;
  loading?: boolean;
  disabled?: boolean;
}
