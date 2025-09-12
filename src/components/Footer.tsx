import { NOCAPRO_URL } from "@/lib/constants";

export const Footer = () => (
  <footer className="border-t">
    <div className="container mx-auto max-w-5xl px-4 py-8 text-center text-muted-foreground">
      <p>MIT © 2025 SCN contributors</p>
      <p className="mx-auto mt-4 max-w-xl text-sm">
        SCN is the shared engine behind{" "}
        <a
          href={NOCAPRO_URL}
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