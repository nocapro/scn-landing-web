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
import { solutionContent } from "@/content/sections.content";

export const Solution = () => (
  <Section id="section-2">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        {solutionContent.title}
      </h2>
      <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
        {solutionContent.subtitle}
      </p>
    </div>
    <CodeBlock>{`$ ${solutionContent.cliCommand}`}</CodeBlock>
    <Card className="mt-8">
      <CardContent className="p-6">
        <CodeBlock lang="text">{solutionContent.exampleOutput}</CodeBlock>
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
          {solutionContent.legend.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <InlineCode>{item.symbol}</InlineCode>
              </TableCell>
              <TableCell>{item.meaning}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </Section>
);