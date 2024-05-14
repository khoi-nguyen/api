import { type Component, For, Show, createSignal } from "solid-js";
import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";

import "katex/dist/katex.min.css";
import { SetStoreFunction } from "solid-js/store";

const Markdown: Component<{
  value: string;
  setter: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  const [focused, setFocused] = createSignal(false);
  const html = () => {
    return micromark(props.value || "", {
      extensions: [math()],
      htmlExtensions: [mathHtml()],
    });
  };

  let textarea: HTMLPreElement;
  const focus = () => {
    setFocused(true);
    textarea.focus();
  };

  return (
    <Show
      when={focused()}
      fallback={
        <div
          class="prose"
          innerHTML={html()}
          onClick={focus}
          onFocus={focus}
          tabindex={0}
        />
      }
    >
      <pre
        ref={textarea!}
        innerHTML={props.value}
        contenteditable
        onFocusOut={(event) => {
          props.setter("props", "value", event.currentTarget.innerText);
        }}
        onKeyDown={(event) => {
          if ((event.shiftKey || event.ctrlKey) && event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
      />
    </Show>
  );
};

export default Markdown;
