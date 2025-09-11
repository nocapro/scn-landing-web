import { useState, useCallback, useEffect } from "react";

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text: string) => {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    });
  }, []);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return { isCopied, copyToClipboard };
};