interface EditableProps {
  children: JSXElement;
  onChange: (newValue: string) => void;
}

export default function Editable(props: EditableProps) {
  return (
    <span
      contenteditable
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
