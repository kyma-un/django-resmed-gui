import React from 'react';

const LiveStream = ({ streamUrl }) => {
  return (
    <div className="mt-6 border rounded-lg overflow-hidden shadow-lg bg-black">
      <h3 className="text-lg font-semibold text-white p-2 bg-gray-800">Stream en Vivo</h3>
      <div className="w-full h-auto">
        <img
          src={streamUrl}
          alt="Stream en vivo"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default LiveStream;