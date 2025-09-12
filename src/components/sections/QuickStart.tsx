import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { quickStartContent } from "@/content/sections.content";

export const QuickStart = () => (
  <Section id="section-5">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {quickStartContent.title}
      </h2>
      <p className="text-lg text-muted-foreground mt-2">
        {quickStartContent.subtitle}
      </p>
    </div>
    <CodeBlock>{quickStartContent.code}</CodeBlock>
  </Section>
);