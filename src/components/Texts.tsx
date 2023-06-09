import { ReactNode } from "react";

export function TextWithLabel({
  children,
  label,
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs">{label}</span>
      <span className="font-bold">{children}</span>
    </div>
  );
}
