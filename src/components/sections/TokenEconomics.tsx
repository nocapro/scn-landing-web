import { Section } from "@/components/Section";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tokenEconomicsContent } from "@/content/sections.content";
import { cn } from "@/lib/utils";

export const TokenEconomics = () => (
  <Section id="section-3">
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {tokenEconomicsContent.title}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {tokenEconomicsContent.subtitle}
      </p>
    </div>
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Representation</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>% of 4k Window</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenEconomicsContent.table.map((row, index) => (
              <TableRow
                key={index}
                className={cn(row.highlight && "bg-primary/10 hover:bg-primary/20")}
              >
                <TableCell className={cn(row.highlight && "font-bold text-primary")}>{row.representation}</TableCell>
                <TableCell className={cn(row.highlight && "font-bold text-primary")}>{row.tokens}</TableCell>
                <TableCell className={cn(row.highlight && "font-bold text-primary")}>{row.window}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Section>
);