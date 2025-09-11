import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { contributeContent } from "@/content/sections.content";
import { GITHUB_URL } from "@/lib/constants";

export const Contribute = () => (
  <Section id="section-9">
    <Card className="text-center p-8 md:p-12 bg-secondary/50">
      <h2 className="text-3xl font-bold tracking-tight">
        {contributeContent.title}
      </h2>
      <p className="text-lg text-muted-foreground mt-2 mb-8 max-w-2xl mx-auto">
        {contributeContent.subtitle}
      </p>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <Button size="lg" variant="secondary">
          <Github className="mr-2 h-4 w-4" /> {contributeContent.buttonText}
        </Button>
      </a>
    </Card>
  </Section>
);