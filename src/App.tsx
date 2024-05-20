const App: Component = () => {
  const [document, setDocument] = createStore({
    component: "Page",
    props: {
      title: "Test",
    },
    children: [
      {
        component: "Markdown",
        props: {
          value: "# Hello $x^2$ hello\n\nThis is a second **paragraph**",
        },
      },
      {
        component: "Formula",
        props: {
          value: "\\int_a^b f'(x)\\, dx",
        },
      },
    ],
  });

  onMount(() => {
    const document = localStorage.getItem("document");
    if (document) {
      setDocument(JSON.parse(document));
    }
  });

  createEffect(() => {
    localStorage.setItem("document", JSON.stringify(document));
  });

  return (
    <AppContextProvider>
      <Node {...document} setter={setDocument} />
      <pre>{JSON.stringify(document, null, 2)}</pre>
    </AppContextProvider>
  );
};

export default App;
