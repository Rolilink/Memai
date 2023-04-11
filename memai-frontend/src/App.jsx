import { useState } from 'react';
import MemeForm from './components/MemeForm';
import Header from './components/Header';

function App() {
  const [loading, setLoading] = useState(false);
  const [memeData, setMemeData]= useState(null);
  
  const formData = (data) => {
    setMemeData(data);
  };

  return (
    <>
      <Header/>
      <MemeForm onSubmit={formData}/>
    </>
  );
}

export default App;