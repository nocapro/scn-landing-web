import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useCasesContent } from "@/content/sections.content";
import { Code2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const UseCases = () => (
  <Section id="section-8">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {useCasesContent.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {useCasesContent.subtitle}
      </p>
    </div>
    <div className="mx-auto max-w-3xl">
      <Card>
        <Accordion type="single" collapsible className="w-full">
          {useCasesContent.prompts.map((useCase, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="px-6 text-left hover:no-underline">
                <span className="text-lg font-semibold">{useCase.scenario}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="flex items-start gap-4 rounded-md bg-secondary p-4">
                  <Code2 className="mt-1 size-5 shrink-0 text-primary" />
                  <code className="font-mono text-sm">{useCase.prompt}</code>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  </Section>
);