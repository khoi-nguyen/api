import { ParentNode } from "../Node";

export default function Page(props: ParentNode<{ title: string }>) {
  return (
    <main class="my-4 mx-auto h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg">
      <h1
        class="text-4xl"
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
      </h1>
      {props.children}
    </main>
  );
}
