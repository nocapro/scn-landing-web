import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { playgroundContent } from "@/content/sections.content";
import { PLAYGROUND_URL } from "@/lib/constants";

export const Playground = () => (
  <Section id="section-4">
    <Card className="bg-secondary/50 p-8 text-center md:p-12">
      <h2 className="text-3xl font-bold tracking-tight">
        {playgroundContent.title}
      </h2>
      <p className="mb-8 mt-2 text-lg text-muted-foreground">
        {playgroundContent.subtitle}
      </p>
      <a href={PLAYGROUND_URL} target="_blank" rel="noopener noreferrer">
        <Button size="lg">
          {playgroundContent.buttonText} <ArrowRight className="ml-2 size-4" />
        </Button>
      </a>
    </Card>
  </Section>
);