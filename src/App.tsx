import { createSignal, type Component } from "solid-js";
import Document from "./components/Document";

const document = {
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
  const [code, setCode] = createSignal(value);
  return <Document {...document} />;
};

export default App;
