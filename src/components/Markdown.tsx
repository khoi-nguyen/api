import { type Component, For, Show, createSignal } from "solid-js";
import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";

import "katex/dist/katex.min.css";
import { SetStoreFunction } from "solid-js/store";

const Markdown: Component<{
  value: string;
  setter: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  const [focused, setFocused] = createSignal<null | number>(null);
  const paragraphs = () => props.value.split("\n\n");
  const convert = (value: string) =>
    micromark(value || "", {
      extensions: [math()],
      htmlExtensions: [mathHtml()],
    });

  function handleEdit(event: FocusEvent) {
    const newParagraphs = paragraphs().map((paragraph, i) => {
      if (focused() === i) {
        return (event.currentTarget as HTMLPreElement).innerText;
      }
      return paragraph;
    });
    const value = newParagraphs.join("\n\n");
    props.setter("props", "value", value);
    setFocused(null);
  }

  return (
    <>
      <For each={paragraphs()}>
        {(paragraph, i) => (
          <Show
            when={focused() === i()}
            fallback={
              <div
                class="prose"
                innerHTML={convert(paragraph)}
                onClick={() => setFocused(i())}
                onFocus={() => setFocused(i())}
                tabindex={0}
              />
            }
          >
            <pre
              innerHTML={paragraph}
              contenteditable
              onFocusOut={handleEdit}
            />
          </Show>
        )}
      </For>
    </>
  );
};

export default Markdown;
