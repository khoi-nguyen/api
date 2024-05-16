export default function Formula(props: LeafNode<{ value: string }>) {
  return (
    <MathField
      defaultValue={props.value}
      onInput={(value) => props.setter("props", "value", value)}
    />
  );
}
