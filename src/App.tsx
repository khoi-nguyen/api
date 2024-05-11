import { createSignal, type Component } from "solid-js";
import Editor from "./components/Editor";
import Markdown from "./components/Markdown";

const App: Component = () => {
  const [code, setCode] = createSignal("# Hello");
  return (
    <div class="columns-2">
      <Editor initialValue={code()} onChange={setCode} />
      <Markdown value={code()} />
    </div>
  );
};

export default App;
