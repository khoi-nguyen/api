import { ParentNode } from "../Node";

export default function Environment(props: ParentNode<{ title: string }>) {
  return (
    <div class="border rounded-t-md m-4">
      <h3
        class="bg-blue-950 text-white py-1 px-3 font-sans"
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
