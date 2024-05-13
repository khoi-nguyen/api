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
    <div
      tabindex={0}
      onClick={() => setEdit(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !edit()) {
          event.preventDefault();
          setEdit(true);
        }
      }}
    >
      <Show
        when={edit()}
        fallback={
          <div innerHTML={html()} onClick={() => setEdit(true)} class="prose" />
        }
      >
        <Editor
          value={props.value}
          onChange={(newValue) => {
            if (props.setter) {
              props.setter("props", "value", newValue);
            }
          }}
          onKeyDown={(event) => {
            const enter =
              (event.shiftKey || event.ctrlKey) && event.keyCode === 3;
            const esc = event.keyCode === 9;
            if (enter || esc) {
              setEdit(false);
            }
          }}
        />
      </Show>
    </div>
  );
};

export default Markdown;
