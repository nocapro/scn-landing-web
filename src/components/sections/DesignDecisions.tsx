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
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        {designDecisionsContent.title}
      </h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
        {designDecisionsContent.subtitle}
      </p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {designDecisionsContent.cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <card.icon className="h-8 w-8 text-primary mb-2" />
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>{card.content}</CardContent>
        </Card>
      ))}
    </div>
  </Section>
);