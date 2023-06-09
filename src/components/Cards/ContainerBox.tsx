import { ReactNode } from "react";

type Variants = "primary" | "secondary";
type Span = 1 | 2 | 3;
const Variants: Record<Variants, string> = {
  primary: "bg-virtual-800 text-white",
  secondary: "bg-virtual-500 text-white",
};

const Span: Record<Span, string>={
    1: "col-span-1",
    2:"col-span-2",
    3:"col-span-3",
} 


export default function Containerbox({
  children,
  variants = "primary",
  span= 1
}: {
  children: ReactNode;
  variants?: Variants;
  span?: Span;
}) {
  return (
    <div className={`p-2 rounded-md ${Span[span]} ${Variants[variants]}`}>{children}</div>
  );
}
