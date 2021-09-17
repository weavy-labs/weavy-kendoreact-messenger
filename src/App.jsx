import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import RealTimeProvider from './realtime-provider';
import Container from "./components/Container";

// Create a client
const queryClient = new QueryClient()

const App = (props) => {

  return (
    <RealTimeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </RealTimeProvider>
  );
}

export default App;
