import { type Component } from "solid-js";
import Document from "./components/Node";
import { NodeType } from "./schema";

const document: NodeType = {
  component: "Page",
  children: [
    {
      component: "Markdown",
      props: {
        value: "# Hello $x^2$ hello",
      },
    },
    {
      component: "Markdown",
      props: {
        value: "Test **strong**",
      },
    },
  ],
};

const App: Component = () => {
  return <Document {...document} />;
};

export default App;
