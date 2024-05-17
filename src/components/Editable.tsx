interface EditableProps {
  children: JSXElement;
  onChange: (newValue: string) => void;
}

export default function Editable(props: EditableProps) {
  return (
    <span
      contenteditable
      class="
        [&[contenteditable]]:focus:border-none
        [&[contenteditable]]:focus:outline-none
        [&[contenteditable]]:active:border-none
        [&[contenteditable]]:active:outline-none
      "
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.currentTarget.blur();
        }
      }}
      onFocusOut={(event) => {
        props.onChange(event.currentTarget.innerText);
      }}
    >
      {props.children}
    </span>
  );
}
