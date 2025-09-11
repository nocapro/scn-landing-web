export const Footer = () => (
  <footer className="border-t">
    <div className="container max-w-5xl mx-auto px-4 py-8 text-center text-muted-foreground">
      <p>MIT © 2025 SCN contributors</p>
      <p className="text-sm mt-4 max-w-xl mx-auto">
        SCN is the shared engine behind{" "}
        <a
          href="https://www.noca.pro"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-foreground hover:text-primary"
        >
          noca.pro
        </a>{" "}
        – a zero-friction, Visual Context Engineering platform with an AI-native patch engine.
      </p>
    </div>
  </footer>
);