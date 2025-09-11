import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard.hook";

export const CodeBlock = ({
  children,
  lang = "bash",
  className,
}: {
  children: string;
  lang?: string;
  className?: string;
}) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const textToCopy = children.trim();

  return (
    <div className="relative">
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg text-sm font-mono border whitespace-pre-wrap",
          className
        )}
      >
        <code className={`language-${lang}`}>{textToCopy}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8"
        onClick={() => copyToClipboard(textToCopy)}
        disabled={!textToCopy}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};