import { Section } from "@/components/Section";
import { InlineCode } from "@/components/InlineCode";

export const Faq = () => (
  <Section id="section-6">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        Frequently Asked Questions
      </h2>
    </div>
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="border-t pt-4">
        <p className="font-semibold text-lg">
          Does GPT really understand the icons?
        </p>
        <p className="text-muted-foreground mt-1">
          Yes. They are single Unicode chars and appear thousands of times
          in training data (Unicode chess, cards, etc.). We
          prompt-engineered once and never looked back.
        </p>
      </div>
      <div className="border-t pt-4">
        <p className="font-semibold text-lg">
          Why not just <InlineCode>ctags</InlineCode> +{" "}
          <InlineCode>grep</InlineCode>?
        </p>
        <p className="text-muted-foreground mt-1">
          ctags is per-file, has no concept of cross-file edges, offers no token counting, and has no browser-based playground.
        </p>
      </div>
      <div className="border-t pt-4">
        <p className="font-semibold text-lg">
          Will you break when TS 5.7 adds new syntax?
        </p>
        <p className="text-muted-foreground mt-1">
          Only if the underlying tree-sitter grammar breaks, which is
          usually fixed upstream within days. Our queries are tiny and easy to patch.
        </p>
      </div>
      <div className="border-t pt-4">
        <p className="font-semibold text-lg">
          Is my proprietary code safe?
        </p>
        <p className="text-muted-foreground mt-1">
          Everything runs locally on your machine. The WASM is loaded from
          your domain; there is no telemetry and no cloud dependency.
        </p>
      </div>
    </div>
  </Section>
);