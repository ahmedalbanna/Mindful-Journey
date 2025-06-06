interface SectionTitleProps {
  title: string;
  className?: string;
}

export function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2 className={`text-2xl font-headline font-semibold text-foreground mb-4 ${className || ''}`}>
      {title}
    </h2>
  );
}
