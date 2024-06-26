import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    AutoImport({
      dirs: ["./src/components", "./src/components/nodes", "./src/lib"],
      imports: [
        {
          "solid-js": [
            "children",
            "createContext",
            "createEffect",
            "createMemo",
            "createResource",
            "createSignal",
            "mergeProps",
            "on",
            "onCleanup",
            "onMount",
            "useContext",
            "Dynamic",
            "For",
            "Match",
            "Show",
            "Suspense",
            "Switch",
            "lazy",
          ],
          "solid-js/store": ["createStore"],
        },
        {
          from: "solid-js",
          imports: ["Component", "ComponentProps", "JSX", "JSXElement"],
          type: true,
        },
        {
          from: "solid-js/store",
          imports: ["SetStoreFunction"],
          type: true,
        },
      ],
    }),
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
