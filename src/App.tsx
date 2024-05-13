import { type Component } from "solid-js";
import { createStore } from "solid-js/store";
import Document from "./components/Node";
import { NodeType } from "./schema";

const App: Component = () => {
  const [document, setDocument] = createStore<NodeType>({
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
  });
  return <Document {...document} setter={setDocument} />;
};

export default App;
