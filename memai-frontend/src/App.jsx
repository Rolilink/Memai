import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import MemeForm from './components/MemeForm';
import Header from './components/Header';
import useCreateMeme from './hooks/useCreateMeme';
import MemeImage from './components/MemeImage';

const queryClient = new QueryClient();

function App() {
  

  const [loading, setLoading] = useState(false);
  const [memeData, setMemeData]= useState(null);

  const handleMemeCreated= (data)=>{
    setMemeData(data);
  };

  const handleLoading = (isLoading)=>{
    setLoading(isLoading);
    console.log(loading);
  }

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Header/>
      <MemeForm onMemeCreated={handleMemeCreated} onLoading={handleLoading}/>
      {memeData && <MemeImage memeData={memeData} isOnLoading={loading}/>}
    </QueryClientProvider>
    </>  
  );
}

export default App;