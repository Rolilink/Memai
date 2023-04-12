import React, { useState } from "react";
import { useMutation } from 'react-query';


async function createMemeAPI(formData) {
  const response = await fetch('http://localhost:4000/createMeme', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  return data;
}

function useCreateMeme() {
  const createMemeMutation = useMutation(createMemeAPI);

  const createMeme = async (formData) => {
    const data = await createMemeMutation.mutateAsync(formData);
    return data;
  };

  return { createMeme, ...createMemeMutation };
}

export default useCreateMeme;



