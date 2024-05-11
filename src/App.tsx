import { createSignal, type Component } from "solid-js";
import Editor from "./components/Editor";

const App: Component = () => {
  const [code, setCode] = createSignal("# Hello");
  return (
    <div class="columns-2">
      <Editor initialValue={code()} onChange={setCode} />
      <pre>{code()}</pre>
    </div>
  );
};

export default App;
