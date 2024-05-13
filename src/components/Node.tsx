import { lazy, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type NodeType } from "../schema";
import { type SetStoreFunction } from "solid-js/store";

const components = {
  Formula: lazy(() => import("./Formula")),
  Markdown: lazy(() => import("./Markdown")),
  Page: lazy(() => import("./Page")),
} as const;

type NodeProps = {
  children?: NodeType[];
  setter: SetStoreFunction<NodeType>;
} & NodeType;

export default function Node(props: NodeProps) {
  return (
    <Dynamic
      component={components[props.component]}
      {...props.props}
      setter={props.setter}
    >
      <Show when={props.children}>
        {(children) => (
          <For each={children()}>
            {(child, i) => (
              <Node
                {...child}
                setter={(...args: Parameters<typeof props.setter>) => {
                  props.setter("children", i(), ...args);
                }}
              />
            )}
          </For>
        )}
      </Show>
    </Dynamic>
  );
}
