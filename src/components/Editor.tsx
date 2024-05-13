import * as monaco from "monaco-editor";
import { createEffect, onMount } from "solid-js";

export default function Editor(props: {
  /** Callback called every time the user changes the content */
  onChange?: (newCode: string) => void;
  /** Initial value to put inside the text editor */
  value?: string;
}) {
  let container: HTMLDivElement;
  onMount(() => {
    const instance = monaco.editor.create(container, {
      value: props.value,
      language: "markdown",
      minimap: {
        enabled: false,
      },
    });

    instance.onDidChangeModelContent(() => {
      if (props.onChange) {
        props.onChange(instance.getValue());
      }
    });
    monaco.editor.remeasureFonts();
  });

  createEffect(() => {});

  return <div ref={container!} class="h-60" />;
}
