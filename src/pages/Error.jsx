import React from 'react';

const Error = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 to-pink-200 px-4">
      <h1 className="text-8xl font-extrabold text-purple-600 drop-shadow-md">
        404
      </h1>

      <p className="text-2xl mt-4 text-purple-700 font-semibold">
        Oops! Page Not Found
      </p>

      <p className="text-lg text-pink-700 mt-2 max-w-md text-center">
        Looks like you’re lost in toy-land. Let's get you back home!
      </p>

      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-700 transition font-bold"
      >
        Go Back Home
      </button>

      <div className="mt-10 animate-bounce">
        <span className="text-6xl">🧸</span>
      </div>
    </div>
  );
};

export default Error;
