import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowRight, Terminal, Zap } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";
import { heroContent } from "@/content/sections.content";
import { PLAYGROUND_URL } from "@/lib/constants";

export const Hero = () => (
  <section className="grid items-center gap-12 pb-24 pt-12 sm:pb-32 sm:pt-16 lg:grid-cols-2">
    <div className="space-y-6 text-center lg:text-left">
      <h1 className="animate-fade-in text-4xl font-extrabold tracking-tighter opacity-0 md:text-6xl">
        <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
          {heroContent.title}
        </span>{" "}
        <span className="inline-block whitespace-nowrap rounded-full bg-primary/10 px-4 py-2 align-middle text-3xl font-medium text-primary md:text-5xl">
          <span className="relative top-[-0.05em] text-2xl md:text-4xl">
            &lt;
          </span>
          {heroContent.highlightedTitle}
        </span>
      </h1>
      <p className="mx-auto max-w-2xl animate-fade-in text-lg text-muted-foreground opacity-0 [animation-delay:0.2s] md:text-xl lg:mx-0">
        {heroContent.subtitle}
      </p>
      <div className="flex animate-fade-in flex-col justify-center gap-4 opacity-0 [animation-delay:0.3s] sm:flex-row lg:justify-start">
        <a href="#section-5">
          <Button size="lg">
            {heroContent.getStartedButton} <Terminal className="ml-2 size-4" />
          </Button>
        </a>
        <a href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="lg">
            {heroContent.playgroundButton} <ArrowRight className="ml-2 size-4" />
          </Button>
        </a>
      </div>
    </div>
    <div className="relative rounded-xl border bg-gradient-to-b from-secondary/30 to-background p-4 lg:p-6">
      <Card className="animate-slide-in-from-top bg-background/50 opacity-0 backdrop-blur-sm [animation-delay:0.5s]">
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle className="text-base font-semibold text-muted-foreground">
            {heroContent.before.title}
          </CardTitle>
          <Zap className="size-5 text-destructive" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock lang="typescript" className="rounded-t-none border-0 bg-transparent p-4">{heroContent.before.code}</CodeBlock>
        </CardContent>
      </Card>

      <div className="my-6 flex animate-fade-in justify-center opacity-0 [animation-delay:0.7s]">
        <div className="flex size-10 animate-pulse items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowDown className="size-5" />
        </div>
      </div>

      <Card className="animate-slide-in-bottom-glow border-primary/50 bg-background/50 opacity-0 backdrop-blur-sm [animation-delay:0.9s]">
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle className="text-base font-semibold text-muted-foreground">
            {heroContent.after.title}
          </CardTitle>
          <Zap className="size-5 text-primary" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock lang="text" className="rounded-t-none border-0 bg-transparent p-4">{heroContent.after.code}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  </section>
);