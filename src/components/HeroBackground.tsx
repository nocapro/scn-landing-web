export const HeroBackground = () => (
  <div className="absolute bottom-0 left-0 right-0 top-[-4rem] -z-10 animate-fade-in overflow-hidden opacity-0">
    <div className="absolute inset-0 animate-dot-grid-pan bg-[radial-gradient(hsl(var(--muted-foreground)/0.2)_1px,transparent_1px)] [background-size:32px_32px]" />
    <div className="absolute size-full animate-background-pan bg-gradient-to-br from-primary/10 via-transparent to-primary/10 bg-[400%_400%]" />
  </div>
);