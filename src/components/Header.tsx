import { Button } from "@/components/ui/button";
import { Github, MessageSquare } from "lucide-react";
import { DISCORD_URL, GITHUB_URL } from "@/lib/constants";

export const Header = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
      <a href="#" className="flex items-center space-x-2.5">
        <span className="text-2xl text-primary font-black -translate-y-0.5">◮</span>
        <span className="font-bold">SCN</span>
        <span className="text-xs font-medium border rounded-full px-2 py-0.5 border-primary/50 text-primary bg-primary/10">
          Open Source
        </span>
      </a>
      <div className="flex items-center gap-2">
        <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Discord
          </Button>
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="outline" size="sm">
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </a>
      </div>
    </div>
  </header>
);