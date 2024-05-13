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
      scrollBeyondLastLine: false,
    });

    instance.onDidChangeModelContent(() => {
      if (props.onChange) {
        props.onChange(instance.getValue());
      }
    });

    let ignoreEvent = false;
    const updateHeight = () => {
      const height = instance.getContentHeight();
      const width = container.clientWidth;
      container.style.height = `${height}px`;
      try {
        ignoreEvent = true;
        instance.layout({ width, height });
      } finally {
        ignoreEvent = false;
      }
    };
    instance.onDidContentSizeChange(updateHeight);

    monaco.editor.remeasureFonts();
  });

  return <div ref={container!} class="min-h-10" />;
}
