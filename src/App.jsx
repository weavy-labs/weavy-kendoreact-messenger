import '@progress/kendo-theme-bootstrap/dist/all.css';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import RealTimeProvider from './realtime-provider';
import Container from "./components/Container";

// Create a client
const queryClient = new QueryClient()

const App = (props) => {

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbGl2ZXIiLCJuYW1lIjoiT2xpdmVyIFdpbnRlciIsImV4cCI6MjUxNjIzOTAyMiwiaXNzIjoic3RhdGljLWZvci1kZW1vIiwiY2xpZW50X2lkIjoiV2VhdnlEZW1vIiwiZGlyIjoiY2hhdC1kZW1vLWRpciIsImVtYWlsIjoib2xpdmVyLndpbnRlckBleGFtcGxlLmNvbSIsInVzZXJuYW1lIjoib2xpdmVyIn0.VuF_YzdhzSr5-tordh0QZbLmkrkL6GYkWfMtUqdQ9FM";
  useEffect(() => {
    fetch('https://showcase.weavycloud.com/client/sign-in', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(res => res.json())
      .then((user) => {

      });
  }, [])

  return (
    <RealTimeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </RealTimeProvider>
  );
}

export default App;
