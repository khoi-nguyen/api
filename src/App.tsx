import { createSignal, type Component } from "solid-js";
import Document from "./components/Document";
import { Node } from "./schema";

const document = Node.parse({
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

const App: Component = () => {
  return <Document {...document} />;
};

export default App;
