import * as monaco from "monaco-editor";
import { onMount } from "solid-js";

export default function Editor(props: {
  /** Callback called every time the user changes the content */
  onChange?: (newCode: string) => void;
  /** Initial value to put inside the text editor */
  value?: string;
  onShiftEnter?: () => void;
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

    instance.onKeyDown((event) => {
      if (
        event.shiftKey &&
        event.keyCode === monaco.KeyCode.Enter &&
        props.onShiftEnter
      ) {
        props.onShiftEnter();
      }
    });
  });

  return <div ref={container!} class="min-h-10" />;
}
