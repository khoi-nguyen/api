import { type Component, createSignal, Show } from "solid-js";
import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";
import Editor from "./Editor";

import "katex/dist/katex.min.css";
import { SetStoreFunction } from "solid-js/store";

const Markdown: Component<{
  value?: string;
  setter?: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  const [edit, setEdit] = createSignal(false);
  const html = () =>
    micromark(props.value || "", {
      extensions: [math()],
      htmlExtensions: [mathHtml()],
    });
  return (
    <div onClick={() => setEdit(true)}>
      <Show when={edit()} fallback={<div innerHTML={html()} class="prose" />}>
        <Editor
          value={props.value}
          onChange={(newValue) => {
            if (props.setter) {
              props.setter("props", "value", newValue);
            }
          }}
        />
        <div innerHTML={html()} class="prose" />
      </Show>
    </div>
  );
};

export default Markdown;
