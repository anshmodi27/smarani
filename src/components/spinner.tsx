import { cva, type VariantProps } from "class-variance-authority";
import { Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-vapor ", {
  variants: {
    size: {
      default: "w-5 h-5",
      sm: "w-3 h-3",
      lg: "w-7 h-7",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("lucide lucide-coffee", spinnerVariants({ size }))}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" style={{ animationDuration: "2s" }} />
      <line
        x1="10"
        x2="10"
        y1="2"
        y2="4"
        style={{ animationDuration: "2.5s" }}
      />
      <line x1="14" x2="14" y1="2" y2="4" style={{ animationDuration: "3s" }} />
    </svg>
  );
  // <Coffee className={cn(spinnerVariants({ size }))}/>
};
