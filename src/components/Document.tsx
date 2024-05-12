import { type Component, lazy, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type NodeType } from "../schema";

const components = {
  Markdown: lazy(() => import("./Markdown")),
  Page: lazy(() => import("./Page")),
};

const Document: Component<NodeType> = (props) => {
  return (
    <Dynamic component={components[props.component]} {...props.props}>
      <Show when={props.children}>
        {(children) => (
          <For each={children()}>{(child) => <Document {...child} />}</For>
        )}
      </Show>
    </Dynamic>
  );
};

export default Document;
