function makeContext() {
  const [edit, setEdit] = createSignal(true);
  return { edit, setEdit } as const;
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
