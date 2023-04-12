import React from 'react';
import useCreateMeme from '../hooks/useCreateMeme';

function MemeImage({ memeData }) {

  return (
    <div className='flex justify-center items-center mb-12'>
      <img className='' src={`http://localhost:4000/${memeData.image}`} alt={memeData.name} />
    </div>
  );
}

export default MemeImage;