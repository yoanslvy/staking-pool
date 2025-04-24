"use client";

interface SelectContentProps {
  children: React.ReactNode;
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-md">
      {children}
    </div>
  );
}
