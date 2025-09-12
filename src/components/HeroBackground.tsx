export const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 size-full overflow-hidden bg-background">
    <div className="absolute inset-0 animate-dot-grid-pan bg-[radial-gradient(hsl(var(--muted-foreground)/0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
    <div className="absolute size-full animate-background-pan bg-gradient-to-br from-primary/10 via-transparent to-primary/10 bg-[400%_400%]" />
  </div>
);