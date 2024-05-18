import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";

import "katex/dist/katex.min.css";

export function md2html(value: string) {
  return micromark(value || "", {
    extensions: [math()],
    htmlExtensions: [mathHtml()],
  });
}
