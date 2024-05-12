import { type Component, lazy, For } from "solid-js";
import { Dynamic } from "solid-js/web";

const components = {
  Markdown: lazy(() => import("./Markdown")),
  Page: lazy(() => import("./Page")),
};

const Document: Component<{
  component: keyof typeof components;
  props: object;
  children: any;
}> = (props) => {
  console.log(props.component, props.props, props.children);
  return (
    <Dynamic component={components[props.component]} {...props.props}>
      <For each={props.children}>{(child) => <Document {...child} />}</For>
    </Dynamic>
  );
};

export default Document;
