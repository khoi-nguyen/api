import { type Component } from "solid-js";
import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";

import "katex/dist/katex.min.css";
import { SetStoreFunction } from "solid-js/store";

const Markdown: Component<{
  value?: string;
  setter?: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  const html = () =>
    micromark(props.value || "", {
      extensions: [math()],
      htmlExtensions: [mathHtml()],
    });
  return <div innerHTML={html()} class="prose" />;
};

export default Markdown;
