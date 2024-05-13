import { lazy, For, Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type NodeType } from "../schema";
import { type SetStoreFunction } from "solid-js/store";
import {
  faFont,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "./Fa";

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
  const addElement = (child: NodeType) => {
    props.setter("children", [...props.children, child]);
  };
  return (
    <>
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
        <button
          class="btn btn-ghost btn-xs"
          onClick={() =>
            addElement({ component: "Markdown", props: { value: "&nbsp;" } })
          }
        >
          <Fa icon={faFont} />
        </button>
        <button
          class="btn btn-ghost btn-xs"
          onClick={() =>
            addElement({ component: "Formula", props: { value: "" } })
          }
        >
          <Fa icon={faSquareRootVariable} />
        </button>
      </Dynamic>
    </>
  );
}
