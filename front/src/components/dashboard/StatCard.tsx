import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  subtitle?: string;
  subtitleColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  subtitle,
  subtitleColor,
}: StatCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800">{value}</div>
        {subtitle && (
          <div
            className={`flex items-center text-xs ${
              subtitleColor || "text-green-600"
            }`}
          >
            {icon && <span className="mr-1">{icon}</span>}
            {subtitle}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
