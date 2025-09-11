import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowRight, Terminal, Zap } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

export const Hero = () => (
  <section className="grid lg:grid-cols-2 gap-12 items-center py-24 sm:py-32">
    <div className="text-center lg:text-left space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 opacity-0 animate-fade-in">
        Understand any TypeScript repo in 400 tokens.
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in [animation-delay:0.2s]">
        SCN creates a dense, token-efficient cheat-sheet for your LLM.{" "}
        <br className="hidden md:block" />
        Paste it in, and watch your AI refactor, review, or port code
        without ever seeing the source.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in [animation-delay:0.3s]">
        <a href="#section-5">
          <Button size="lg">
            Get Started <Terminal className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a
          href="https://pg.scn.noca.pro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="lg">
            Live Playground <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
    <div className="relative rounded-xl border p-4 lg:p-6 bg-gradient-to-b from-secondary/30 to-background">
      <Card className="bg-background/50 backdrop-blur-sm opacity-0 animate-slide-in-from-top [animation-delay:0.5s]">
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle className="text-base font-semibold text-muted-foreground">
            BEFORE: 300+ tokens
          </CardTitle>
          <Zap className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock
            lang="typescript"
            className="border-0 rounded-t-none bg-transparent p-4"
          >{`export class ApiClient {
  constructor(private apiKey: string) {}

  async fetchUsers(page: number): Promise<User[]> {
    const res = await fetch(\`/api/users?page=\${page}\`, {
      headers: { 'X-API-KEY': this.apiKey }
    });
    if (!res.ok) throw new Error('API Error');
    return res.json();
  }
}`}</CodeBlock>
        </CardContent>
      </Card>

      <div className="my-6 flex justify-center opacity-0 animate-fade-in [animation-delay:0.7s]">
        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground animate-pulse">
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>

      <Card className="border-primary/50 bg-background/50 backdrop-blur-sm animate-glow opacity-0 animate-slide-in-from-bottom [animation-delay:0.9s]">
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle className="text-base font-semibold text-muted-foreground">
            AFTER: 38 tokens
          </CardTitle>
          <Zap className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock
            lang="text"
            className="border-0 rounded-t-none bg-transparent p-4"
          >{`§1 src/api.ts
+ ◇ ApiClient
  - @ apiKey: #string
  + o constructor
  + ~ fetchUsers ...!
    > User`}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  </section>
);