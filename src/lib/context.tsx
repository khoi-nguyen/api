import { OpenAPI, Page, readDocument, writeDocument } from "../client";

OpenAPI.BASE = "http://localhost:8000";

function makeContext() {
  const [url, setUrl] = createSignal("index");
  const [edit, setEdit] = createSignal(true);
  const [document, setDocument] = createStore<Page>({
    component: "Page",
    props: { title: "" },
    children: [],
  });

  const load = async () => {
    const document = await readDocument({ url: url() });
    setDocument(document);
  };

  const save = () => {
    writeDocument({ url: url(), requestBody: document });
  };

  return {
    document,
    edit,
    load,
    save,
    setDocument,
    setEdit,
    setUrl,
    url,
  } as const;
}

type AppContextType = ReturnType<typeof makeContext>;
const AppContext = createContext<AppContextType>();

export function useAppContext() {
  return useContext(AppContext)!;
}

export function AppContextProvider(props: { children: JSXElement }) {
  return (
    <>
      <AppContext.Provider value={makeContext()}>
        {props.children}
      </AppContext.Provider>
    </>
  );
}
