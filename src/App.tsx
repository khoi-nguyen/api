import { createSignal, type Component } from "solid-js";
import Editor from "./components/Editor";
import Markdown from "./components/Markdown";

const value: string = `# Hello

Here is a math formula:

$$
\\int_a^b f'(x)
$$

::factorise
`;

const App: Component = () => {
  const [code, setCode] = createSignal(value);
  return (
    <div class="columns-2">
      <Editor initialValue={code()} onChange={setCode} />
      <Markdown value={code()} />
    </div>
  );
};

export default App;
