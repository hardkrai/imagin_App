import React from 'react';
import {PropagateLoader} from 'react-spinners'
const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <PropagateLoader
        color='#1a2e05'
        height={70}
        width={250}
        className="m-5"
      />
      <p className='text-lg text-orange-950 text-center px-2'>{message}</p> {/* Display the message prop */}
    </div>
  );
}

export default Spinner;
