import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Playground = () => (
  <Section id="section-4">
    <Card className="text-center p-8 md:p-12 bg-secondary/50">
      <h2 className="text-3xl font-bold tracking-tight">
        Live Demo Playground
      </h2>
      <p className="text-lg text-muted-foreground mt-2 mb-8">
        Drag-and-drop a folder, move the slider, and watch the map
        re-shape in real time.
      </p>
      <a
        href="https://pg.scn.noca.pro"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="lg">
          Try the Playground <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </a>
    </Card>
  </Section>
);