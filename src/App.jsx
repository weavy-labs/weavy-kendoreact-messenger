import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import RealTimeProvider from './realtime-provider';
import UserProvider from './user-provider';
import Container from "./components/Container";

// Create a client
const queryClient = new QueryClient()

const App = (props) => {

  return (
    <RealTimeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider>
            <Container />
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RealTimeProvider>
  );
}

export default App;
