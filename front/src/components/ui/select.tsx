import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  useState,
} from "react";
import { SelectItem } from "./select-item";

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  value,
  defaultValue,
  onValueChange,
  children,
  placeholder,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? defaultValue ?? "");

  const handleSelect = (val: string) => {
    setSelected(val);
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
        onClick={() => setOpen(!open)}
      >
        {selected || placeholder || "Select"}
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-md">
          {Children.map(children, (child) => {
            if (
              isValidElement(child) &&
              (child.type === SelectItem ||
                (child.type as any).displayName === "SelectItem")
            ) {
              return cloneElement(child as ReactElement<any>, {
                onItemSelect: handleSelect,
                selected,
              });
            }
            return child;
          })}
        </div>
      )}
    </div>
  );
};
