import { lazy, For, Show, type ComponentProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { type SetStoreFunction } from "solid-js/store";
import {
  faFont,
  faSquareRootVariable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Fa from "./Fa";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

const components = {
  Formula: lazy(() => import("./nodes/Formula")),
  Markdown: lazy(() => import("./nodes/Markdown")),
  Page: lazy(() => import("./nodes/Page")),
};

type Component = keyof typeof components;
interface NodeProps<T extends Component> {
  component: T;
  props: Omit<ComponentProps<(typeof components)[T]>, "setter">;
  children?: Omit<NodeProps<Component>, "setter">[];
  setter: SetStoreFunction<NodeProps<T>>;
}

export default function Node<T extends Component>(props: NodeProps<T>) {
  const addElement = (
    child: Omit<NodeProps<Component>, "setter">,
    i: number,
  ) => {
    return () => {
      if (props.children) {
        props.setter("children", props.children.toSpliced(i, 0, child));
      }
    };
  };

  const removeElement = (i: number) => {
    return () => {
      if (props.children) {
        props.setter(
          "children",
          props.children.filter((_child, j) => j !== i),
        );
      }
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
      {/* @ts-ignore */}
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
                    setter={(...args: any) => {
                      // @ts-ignore
                      props.setter("children", i(), ...args);
                    }}
                  />
                  <div>
                    <Button icon={faTrash} onClick={removeElement(i())} />
                    <Button
                      icon={faFont}
                      onClick={addElement(
                        {
                          component: "Markdown",
                          props: { value: "" },
                        },
                        i() + 1,
                      )}
                    />
                    <Button
                      icon={faSquareRootVariable}
                      onClick={addElement(
                        {
                          component: "Formula",
                          props: { value: "" },
                        },
                        i() + 1,
                      )}
                    />
                  </div>
                </>
              )}
            </For>
          )}
        </Show>
      </Dynamic>
    </>
  );
}
