import { cn } from "@/lib/utils";

export const Section = ({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <section
    id={id}
    className={cn("border-t py-20 sm:py-28", className)}
  >
    {children}
  </section>
);