import { Component, JSXElement } from "solid-js";
import { PageSchema } from "../schema";
import { z } from "zod";

const Page: Component<
  z.infer<typeof PageSchema>["props"] & {
    children?: JSXElement;
    setter?: (...args: any[]) => any;
  }
> = (props) => {
  return (
    <main class="m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg print:m-0 print:h-screen print:w-screen print:rounded-none print:shadow-none">
      <h1
        class="text-4xl"
        contenteditable
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        onFocus={(event) => {
          document.execCommand("selectAll", false);
        }}
        onFocusOut={(event) => {
          if (props.setter) {
            props.setter("props", "title", event.currentTarget.innerText);
          }
          event.preventDefault();
        }}
      >
        {props.title}
      </h1>
      {props.children}
    </main>
  );
};

export default Page;
