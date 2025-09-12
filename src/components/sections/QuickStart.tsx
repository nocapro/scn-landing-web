import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { quickStartContent } from "@/content/sections.content";

export const QuickStart = () => (
  <Section id="section-5">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {quickStartContent.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {quickStartContent.subtitle}
      </p>
    </div>
    <div className="grid gap-8 md:grid-cols-2">
      {quickStartContent.steps.map((step) => (
        <div key={step.title}>
          <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
          <CodeBlock>{step.command}</CodeBlock>
          {step.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          )}
        </div>
      ))}
    </div>
  </Section>
);