import { type Component } from "solid-js";
import { micromark } from "micromark";

const Markdown: Component<{ value?: string }> = (props) => {
  const html = () => micromark(props.value || "");
  return <div innerHTML={html()} />;
};

export default Markdown;
