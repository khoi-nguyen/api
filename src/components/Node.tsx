import {
  faFont,
  faSquareRootVariable,
  faTrash,
  faWindowMaximize,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type ParentNode<T extends object> = T & {
  children: JSX.Element;
  setter: SetStoreFunction<{ props: T }>;
};

export type LeafNode<T extends object> = Omit<ParentNode<T>, "children">;

const components = {
  Environment,
  Formula,
  Markdown,
  Page,
};

type Component = keyof typeof components;
interface NodeProps<T extends Component> {
  component: T;
  props: Omit<ComponentProps<(typeof components)[T]>, "setter" | "children">;
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

  return (
    <Dynamic
      component={components[props.component]}
      {...props.props}
      setter={props.setter}
    >
      <>
        <For each={props.children}>
          {(child, i) => (
            <div class="group relative">
              <Toolbar>
                <Button
                  class="btn-info"
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
                  icon={faWindowMaximize}
                  onClick={addElement(
                    {
                      component: "Environment",
                      props: { title: "Hello" },
                      children: [],
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
                <Button
                  class="btn-error"
                  icon={faTrash}
                  onClick={removeElement(i())}
                />
              </Toolbar>
              <Node
                {...child}
                setter={(...args: any) => {
                  // @ts-ignore
                  props.setter("children", i(), ...args);
                }}
              />
            </div>
          )}
        </For>
        <Show
          when={props.children !== undefined && props.children.length === 0}
        >
          <Button
            class="btn-info"
            icon={faFont}
            onClick={addElement(
              {
                component: "Markdown",
                props: { value: "" },
              },
              0,
            )}
          />
        </Show>
      </>
    </Dynamic>
  );
}

function Toolbar(props: { children?: JSXElement }) {
  return (
    <div
      class="
          hidden
          group-hover:flex

          z-10
          absolute
          bottom-0
          left-1/2
          transform
          translate-y-full
          -translate-x-1/2

          px-10
          py-4
          border-t
          bg-white
        "
    >
      {props.children}
    </div>
  );
}

function Button(props: {
  onClick: () => void;
  icon: IconDefinition;
  class?: string;
}) {
  return (
    <button class={`btn btn-outline ${props.class}`} onClick={props.onClick}>
      <Fa icon={props.icon} />
    </button>
  );
}
