import { ReactNode } from "react";

type Variants = "primary" | "secondary";
type Span = 1 | 2 | 3;
const Variants: Record<Variants, string> = {
  primary: "bg-virtual-800 text-white",
  secondary: "bg-virtual-500 text-white",
};

const Span: Record<Span, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
};

export default function Containerbox({
  children,
  title,
  variants = "primary",
  span = 1,
  flexCol = false,
}: {
  children: ReactNode;
  title?: string;
  variants?: Variants;
  span?: Span;
  flexCol?: boolean;
}) {
  return (
    <div
      className={`p-5 shadow-md flex ${
        flexCol ? "flex-col" : ""
      } gap-2 containerBox rounded-md ${Span[span]} ${Variants[variants]}`}
    >
      {title && (
        <h1 className="text-virtual-200 text-xl mb-2">
          <b>{title}</b>
        </h1>
      )}
      {children}
    </div>
  );
}
