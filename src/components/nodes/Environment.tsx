import { ParentNode } from "../Node";

export default function Environment(props: ParentNode<{ title: string }>) {
  return (
    <div class="rounded-r-xl m-4 shadow p-4 border-blue-950 border-l-8">
      <h3
        class="font-semibold font-sans"
        contenteditable
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        onFocusOut={(event) => {
          props.setter("props", "title", event.currentTarget.innerText);
          event.preventDefault();
        }}
      >
        {props.title}
      </h3>
      <div class="p-3">{props.children}</div>
    </div>
  );
}
