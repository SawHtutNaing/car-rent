import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import RouterConfig from "./routes";
import { store } from "./store";
import Layout from "./components/layouts";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <RouterConfig />
          </Layout>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
