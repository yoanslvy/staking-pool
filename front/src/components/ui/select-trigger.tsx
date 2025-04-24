import { cn } from "@/lib/utils";

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export function SelectTrigger({
  children,
  className,
  ...props
}: SelectTriggerProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
