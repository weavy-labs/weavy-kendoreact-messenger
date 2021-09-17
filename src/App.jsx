import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
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
      </QueryClientProvider>
    </RealTimeProvider>
  );
}

export default App;
