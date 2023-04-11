import React, { useState } from "react";
import { useMutation } from 'react-query';



function useCreateMeme({formData}) {

  const createMemeMutation = useMutation((formData) => {
    return fetch('https://createMeme', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  });

  return createMemeMutation;

}

export default useCreateMeme;



