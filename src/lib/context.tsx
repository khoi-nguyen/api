function makeContext() {
  const [url, setUrl] = createSignal("index");
  const [edit, setEdit] = createSignal(true);
  const [document, setDocument] = createStore({});

  const load = async () => {
    const res = await fetch(`http://localhost:8000/documents/${url()}`);
    setDocument(await res.json());
  };

  const save = () => {
    fetch(`http://localhost:8000/documents/${url()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });
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
