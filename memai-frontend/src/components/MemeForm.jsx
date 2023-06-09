import React,{ useState } from "react";

import useCreateMeme from "../hooks/useCreateMeme";

function MemeForm({onMemeCreated, onLoading}) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const {createMeme, isLoading} = useCreateMeme();
     

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', file, file.name);
        formData.append('description', description);
        const data = await createMeme(formData);
        onMemeCreated(data);
        
        
    };

  return (
    <div className="App bg-primary min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Create Meme</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="border border-gray-300 rounded w-full p-2"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="mb-4">
            <input
              className="border border-gray-300 rounded w-full p-2"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            type="submit"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-red-500 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default MemeForm;
