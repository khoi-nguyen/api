import { Component, JSXElement } from "solid-js";

const Page: Component<{ children: JSXElement }> = (props) => {
  return <main>{props.children}</main>;
};

export default Page;
