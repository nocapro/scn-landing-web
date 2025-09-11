import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";

export const QuickStart = () => (
  <Section id="section-5">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        CLI Quick Start
      </h2>
      <p className="text-lg text-muted-foreground mt-2">
        Get started in under a minute.
      </p>
    </div>
    <CodeBlock>{`# global install
npm i -g scn-ts            # or yarn/pnpm/bun

# basic
scn-ts "src/**/*.{ts,tsx}" --output map.scn

# monorepo
scn-ts "apps/*/src/**/*" --exclude="**/*.stories.tsx" --max-workers=8

# watch mode
scn-ts "src/**/*" --watch --preset=minimal`}</CodeBlock>
  </Section>
);