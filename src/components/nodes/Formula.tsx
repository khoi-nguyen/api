import { type Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import MathField from "./MathField";

const Formula: Component<{
  value: string;
  setter: SetStoreFunction<{ props: { value?: string } }>;
}> = (props) => {
  return (
    <MathField
      defaultValue={props.value}
      onInput={(value) => props.setter("props", "value", value)}
    />
  );
};

export default Formula;
