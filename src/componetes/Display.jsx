import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DisplayHome from './DisplayHome';
import DisplayAlbum from './Display_album';

const Display = () => {
  return (
    <div className="w-full h-full  m-2 rounded-xl overflow-auto ">
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;

