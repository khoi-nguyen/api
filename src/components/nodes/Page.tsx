import { ParentNode } from "../Node";

export default function Page(props: ParentNode<{ title: string }>) {
  return (
    <main class="my-4 mx-auto h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg">
      <h1 class="text-5xl font-bold text-center mb-4">
        <Editable onChange={(value) => props.setter("props", "title", value)}>
          {props.title}
        </Editable>
      </h1>
      {props.children}
    </main>
  );
}
