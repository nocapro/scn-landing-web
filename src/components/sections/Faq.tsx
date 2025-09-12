import { Section } from "@/components/Section";
import { faqContent } from "@/content/sections.content";

export const Faq = () => (
  <Section id="section-6">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {faqContent.title}
      </h2>
    </div>
    <div className="mx-auto max-w-3xl space-y-8">
      {faqContent.questions.map((faq, index) => (
        <div className="border-t pt-4" key={index}>
          <p className="text-lg font-semibold">{faq.question}</p>
          <p className="mt-1 text-muted-foreground">{faq.answer}</p>
        </div>
      ))}
    </div>
  </Section>
);