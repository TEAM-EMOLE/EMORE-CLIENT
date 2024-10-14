import RootLayoutProvider from './commons/components/layout/RootLayoutProvider';
import RouterLayout from './commons/components/layout/RouterLayout';

function App() {
  return (
    <RootLayoutProvider>
      <RouterLayout />
    </RootLayoutProvider>
  );
}

export default App;
