const App: Component = () => {
  const context = useAppContext();
  onMount(context.load);

  return (
    <>
      <button onClick={context.save}>Save</button>
      <Node {...context.document} setter={context.setDocument} />
    </>
  );
};

function WrappedApp() {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
}

export default WrappedApp;
