import { Button } from "@/components/ui/button";
import { Github, MessageSquare } from "lucide-react";
import { DISCORD_URL, GITHUB_URL } from "@/lib/constants";

export const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
      <a href="#" className="flex items-center space-x-2.5">
        <span className="-translate-y-0.5 text-2xl font-black text-primary">◮</span>
        <span className="font-bold">SCN</span>
        <span className="rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          Open Source
        </span>
      </a>
      <div className="flex items-center gap-2">
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discord
          </Button>
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </a>
      </div>
    </div>
  </header>
);