import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/Section";
import { contextCostContent } from "@/content/sections.content";

export const ContextCost = () => (
  <Section id="section-1">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        {contextCostContent.title}
      </h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
        {contextCostContent.subtitle}
      </p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {contextCostContent.cards.map((card, index) => (
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