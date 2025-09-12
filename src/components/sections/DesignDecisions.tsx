import { Section } from "@/components/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { designDecisionsContent } from "@/content/sections.content";

export const DesignDecisions = () => (
  <Section id="section-7">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {designDecisionsContent.title}
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
        {designDecisionsContent.subtitle}
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {designDecisionsContent.cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <card.icon className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>{card.content}</CardContent>
        </Card>
      ))}
    </div>
  </Section>
);