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
  setChildHasFocus?: (value: boolean) => void;
}

export default function Node<T extends Component>(props: NodeProps<T>) {
  const [focused, setFocused] = createSignal<null | number>(null);
  const [childHasFocus, setChildHasFocus] = createSignal(false);
  const context = useAppContext();

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

  function Toolbar(props: { index: number }) {
    return (
      <div
        class="
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
        <Button
          class="btn-info"
          icon={faFont}
          onClick={addElement(
            {
              component: "Markdown",
              props: { value: "" },
            },
            props.index + 1,
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
            props.index + 1,
          )}
        />
        <Button
          icon={faSquareRootVariable}
          onClick={addElement(
            {
              component: "Formula",
              props: { value: "" },
            },
            props.index + 1,
          )}
        />
        <Button
          class="btn-error"
          icon={faTrash}
          onClick={removeElement(props.index)}
        />
      </div>
    );
  }

  return (
    <Dynamic
      component={components[props.component]}
      {...props.props}
      setter={props.setter}
    >
      <>
        <For each={props.children}>
          {(child, i) => (
            <div
              class="group relative"
              onMouseEnter={() => {
                props.setChildHasFocus?.(true);
                setFocused(i());
              }}
              onMouseLeave={() => {
                setFocused(null);
                props.setChildHasFocus?.(false);
              }}
            >
              <Show
                when={context.edit() && focused() == i() && !childHasFocus()}
              >
                <Toolbar index={i()} />
              </Show>
              <Node
                {...child}
                setter={(...args: any) => {
                  // @ts-ignore
                  props.setter("children", i(), ...args);
                }}
                setChildHasFocus={setChildHasFocus}
              />
            </div>
          )}
        </For>
        <Show when={props.children?.length === 0 && context.edit()}>
          <Toolbar index={0} />
        </Show>
      </>
    </Dynamic>
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
