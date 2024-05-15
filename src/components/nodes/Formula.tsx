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
