import React from 'react';
import { useNavigate } from 'react-router-dom';

const Album = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/Album/${id}`)}
      className="min-w-[180px] cursor-pointer p-2 px-3 hover:bg-gradient-to-br from-[#020202] to-[rgba(75,30,133,0.01)] rounded-xl"
    >
      <img className="rounded w-80" src={image} alt={name} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default Album;

