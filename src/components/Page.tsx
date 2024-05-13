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
    <main>
      <h1
        class="text-4xl"
        contenteditable
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
