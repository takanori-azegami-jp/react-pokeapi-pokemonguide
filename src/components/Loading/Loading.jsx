import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <>
      <div className="Loading">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
