import { Section } from "@/components/Section";
import { CodeBlock } from "@/components/CodeBlock";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InlineCode } from "@/components/InlineCode";

export const Solution = () => (
  <Section id="section-2">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        The Solution: Symbolic Context Notation
      </h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
        A zero-config, WASM-powered static analyzer that spits out a
        dense, emoji-rich, token-counted summary of your project.
      </p>
    </div>
    <CodeBlock>{`$ npx scn-ts "src/**/*.{ts,tsx}" --exclude="**/*.test.ts" --preset=compact`}</CodeBlock>
    <Card className="mt-8">
      <CardContent className="p-6">
        <CodeBlock lang="text">{`§1 src/main.tsx
  + ◇ App (1)
  + ~ fetchUsers (2)
    > 2, 3

§2 src/services/api.ts
  ~ getUser (1) ...!
    < 1
    > 3

§3 src/types.ts
  + {} User (1)
    + @ id: #string
    + @ name: #string`}</CodeBlock>
      </CardContent>
    </Card>
    <div className="mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Symbol</TableHead>
            <TableHead>Meaning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <InlineCode>§</InlineCode>
            </TableCell>
            <TableCell>File header (id + path)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InlineCode>+ / -</InlineCode>
            </TableCell>
            <TableCell>Exported / Private symbol</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InlineCode>◇ ~ {}</InlineCode>
            </TableCell>
            <TableCell>Class, Function, Interface, JSX element</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InlineCode>&gt; / &lt;</InlineCode>
            </TableCell>
            <TableCell>Outgoing / Incoming call or import</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <InlineCode>... ! o</InlineCode>
            </TableCell>
            <TableCell>Async, Throws, Pure function</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </Section>
);