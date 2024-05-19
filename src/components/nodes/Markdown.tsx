import type { LeafNode } from "../Node";
import { md2html } from "../../lib/markdown";

import "katex/dist/katex.min.css";

export default function Markdown(props: LeafNode<{ value: string }>) {
  const [focused, setFocused] = createSignal(props.value === "");
  const html = () => md2html(props.value || "Type your text here");

  return (
    <Show
      when={focused()}
      fallback={
        <div
          class="prose max-w-none"
          innerHTML={html()}
          onClick={() => setFocused(true)}
          onFocus={() => setFocused(true)}
          tabindex={0}
        />
      }
    >
      <Editor
        value={props.value}
        onChange={(newValue) => {
          props.setter("props", "value", newValue);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onKeyDown={(event) => {
          const keys = { Enter: 3, Esc: 2, Tab: 9 };
          if (
            (event.shiftKey || event.ctrlKey) &&
            event.keyCode === keys.Enter
          ) {
            setFocused(false);
          }
          if ([keys.Tab].includes(event.keyCode)) {
            setFocused(false);
            event.preventDefault();
          }
        }}
      />
    </Show>
  );
}
