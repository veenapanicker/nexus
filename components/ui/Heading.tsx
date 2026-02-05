import { cn } from "@/lib/utils";

interface HeadingProps {
  level: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level, children, className }: HeadingProps) {
  const styles = {
    h1: "text-2xl font-display font-bold text-[var(--foreground)]",
    h2: "text-xl font-display font-semibold text-[var(--foreground)]",
    h3: "text-lg font-semibold text-[var(--foreground)]",
  };

  const Tag = level;

  return (
    <Tag className={cn(styles[level], className)}>
      {children}
    </Tag>
  );
}
