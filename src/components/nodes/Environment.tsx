import { ParentNode } from "../Node";

export default function Environment(props: ParentNode<{ title: string }>) {
  return (
    <div class="rounded-r-xl m-4 shadow p-4 border-blue-950 border-l-8">
      <h3 class="font-semibold font-sans">
        <Editable
          onChange={(value) => props.setter("props", "title", value)}
          value={props.title}
        />
      </h3>
      <div class="p-3">{props.children}</div>
    </div>
  );
}
