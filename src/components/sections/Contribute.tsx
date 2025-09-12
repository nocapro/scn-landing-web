import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { contributeContent } from "@/content/sections.content";
import { GITHUB_URL } from "@/lib/constants";

export const Contribute = () => (
  <Section id="section-9">
    <Card className="bg-secondary/50 p-8 text-center md:p-12">
      <h2 className="text-3xl font-bold tracking-tight">
        {contributeContent.title}
      </h2>
      <p className="mx-auto mb-8 mt-2 max-w-2xl text-lg text-muted-foreground">
        {contributeContent.subtitle}
      </p>
      <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <Button size="lg" variant="secondary">
          <Github className="mr-2 size-4" /> {contributeContent.buttonText}
        </Button>
      </a>
    </Card>
  </Section>
);