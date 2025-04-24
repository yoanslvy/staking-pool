"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onItemSelect?: (value: string) => void;
  selected?: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, onItemSelect, selected, className, ...props }, ref) => {
    const isSelected = selected === value;

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={isSelected}
        className={cn(
          "flex cursor-pointer items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-100",
          isSelected && "bg-slate-100 font-medium",
          className
        )}
        onClick={() => onItemSelect?.(value)}
        {...props}
      >
        {value}
        {isSelected && <Check className="h-4 w-4 text-[#2A9D8F]" />}
      </div>
    );
  }
);

SelectItem.displayName = "SelectItem";
