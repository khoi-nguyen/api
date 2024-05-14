import { lazy, For, Show, JSXElement } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type NodeType } from "../schema";
import { type SetStoreFunction } from "solid-js/store";
import {
  faFont,
  faSquareRootVariable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "./Fa";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

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

  const removeElement = (i: number) => {
    return () => {
      props.setter(
        "children",
        props.children.filter((child, j) => j !== i),
      );
    };
  };

  const Button = (props: { onClick: () => void; icon: IconDefinition }) => {
    return (
      <button class="btn btn-ghost btn-xs" onClick={props.onClick}>
        <Fa icon={props.icon} />
      </button>
    );
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
                <>
                  <Node
                    {...child}
                    setter={(...args: Parameters<typeof props.setter>) => {
                      props.setter("children", i(), ...args);
                    }}
                  />
                  <div>
                    <Button icon={faTrash} onClick={removeElement(i())} />
                  </div>
                </>
              )}
            </For>
          )}
        </Show>
        <div>
          <Button
            icon={faFont}
            onClick={() =>
              addElement({ component: "Markdown", props: { value: "&nbsp;" } })
            }
          />
          <Button
            icon={faSquareRootVariable}
            onClick={() =>
              addElement({ component: "Formula", props: { value: "" } })
            }
          />
        </div>
      </Dynamic>
    </>
  );
}
