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
  return <Node {...document} setter={setDocument} />;
};

export default App;
