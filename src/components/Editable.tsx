import { md2html } from "../lib/markdown";

interface EditableProps {
  value: string;
  onChange?: (newValue: string) => void;
}

export default function Editable(props: EditableProps) {
  const [focused, setFocused] = createSignal(false);
  return (
    <Show
      when={focused()}
      fallback={
        <div
          onClick={() => setFocused(true)}
          innerHTML={md2html(props.value)}
        />
      }
    >
      <input
        class="w-full"
        value={props.value}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            (event.target as HTMLInputElement).blur();
          }
        }}
        onBlur={(event) => {
          if (props.onChange) {
            props.onChange(event.target.value);
          }
          setFocused(false);
        }}
      />
    </Show>
  );
}
