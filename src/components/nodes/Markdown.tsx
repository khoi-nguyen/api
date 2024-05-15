import { micromark } from "micromark";
import { math, mathHtml } from "micromark-extension-math";

import "katex/dist/katex.min.css";

const Markdown: Component<{
  value: string;
  setter: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  const [focused, setFocused] = createSignal(props.value === "");
  const html = () => {
    return micromark(props.value || "", {
      extensions: [math()],
      htmlExtensions: [mathHtml()],
    });
  };

  return (
    <Show
      when={focused()}
      fallback={
        <div
          class="prose"
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
        onKeyDown={(event) => {
          const keys = { Enter: 3, Esc: 2, Tab: 9 };
          if (
            (event.shiftKey || event.ctrlKey) &&
            event.keyCode === keys.Enter
          ) {
            setFocused(false);
          }
          if ([keys.Tab, keys.Esc].includes(event.keyCode)) {
            setFocused(false);
            event.preventDefault();
          }
        }}
      />
    </Show>
  );
};

export default Markdown;
