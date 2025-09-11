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
  <section className="grid lg:grid-cols-2 gap-12 items-center pt-12 pb-24 sm:pt-16 sm:pb-32">
    <div className="text-center lg:text-left space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter opacity-0 animate-fade-in">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          {heroContent.title}
        </span>{" "}
        <span className="inline-block whitespace-nowrap rounded-full bg-primary/10 px-4 py-2 font-medium text-primary align-middle text-3xl md:text-5xl">
          <span className="relative -top-[0.05em] text-2xl md:text-4xl">
            &lt;
          </span>
          {heroContent.highlightedTitle}
        </span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in [animation-delay:0.2s]">
        {heroContent.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in [animation-delay:0.3s]">
        <a href="#section-5">
          <Button size="lg">
            {heroContent.getStartedButton}{" "}
            <Terminal className="ml-2 h-4 w-4" />
          </Button>
        </a>
        <a href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary" size="lg">
            {heroContent.playgroundButton}{" "}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
    <div className="relative rounded-xl border p-4 lg:p-6 bg-gradient-to-b from-secondary/30 to-background">
      <Card className="bg-background/50 backdrop-blur-sm opacity-0 animate-slide-in-from-top [animation-delay:0.5s]">
        <CardHeader className="flex-row items-center justify-between p-4">
          <CardTitle className="text-base font-semibold text-muted-foreground">
            {heroContent.before.title}
          </CardTitle>
          <Zap className="h-5 w-5 text-destructive" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock lang="typescript" className="border-0 rounded-t-none bg-transparent p-4">{heroContent.before.code}</CodeBlock>
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
            {heroContent.after.title}
          </CardTitle>
          <Zap className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="p-0">
          <CodeBlock lang="text" className="border-0 rounded-t-none bg-transparent p-4">{heroContent.after.code}</CodeBlock>
        </CardContent>
      </Card>
    </div>
  </section>
);