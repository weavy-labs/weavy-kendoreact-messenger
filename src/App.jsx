import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import RealTimeProvider from './realtime-provider';
import UserProvider from './user-provider';
import Container from "./components/Container";

// Create a client
const queryClient = new QueryClient()

// This function should return a valid token from your Weavy backend
// Set DEMO = false in constants.js to use the generateToken function as the tokenactory passed to the UserProvider below.
const generateToken = () => {
  // For more information how to create a JWT: https://www.weavy.com/docs/client/authentication
  
  // fetch token from your api endpoint and return here...    
  return "[YOUR_GENERATED_TOKEN]";
}

const App = (props) => {

  return (
    <RealTimeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <UserProvider tokenFactory={generateToken}>
            <Container />
          </UserProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </RealTimeProvider>
  );
}

export default App;
