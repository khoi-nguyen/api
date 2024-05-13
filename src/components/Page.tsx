import { Component, JSXElement } from "solid-js";

const Page: Component<{
  children: JSXElement;
  setter?: (...args: any[]) => any;
}> = (props) => {
  return <main>{props.children}</main>;
};

export default Page;
