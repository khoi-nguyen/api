import { ParentNode } from "../Node";

export default function Environment(props: ParentNode<{ title: string }>) {
  return (
    <div>
      <h3 class="bg-blue-950 text-white py-1 px-3 rounded-t-md font-sans">
        {props.title}
      </h3>
      {props.children}
    </div>
  );
}
