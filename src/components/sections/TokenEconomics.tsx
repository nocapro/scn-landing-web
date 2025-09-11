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

export const TokenEconomics = () => (
  <Section id="section-3">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight">
        Token Economics
      </h2>
      <p className="text-lg text-muted-foreground mt-2">
        Fit 10x more context into every prompt.
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
            <TableRow>
              <TableCell>Raw Source</TableCell>
              <TableCell>18,700</TableCell>
              <TableCell>467% ❌</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Minified</TableCell>
              <TableCell>12,100</TableCell>
              <TableCell>302% ❌</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>AST JSON</TableCell>
              <TableCell>9,400</TableCell>
              <TableCell>235% ❌</TableCell>
            </TableRow>
            <TableRow className="bg-primary/10 hover:bg-primary/20">
              <TableCell className="font-bold text-primary">
                SCN Compact
              </TableCell>
              <TableCell className="font-bold text-primary">
                380
              </TableCell>
              <TableCell className="font-bold text-primary">
                9% ✅
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </Section>
);