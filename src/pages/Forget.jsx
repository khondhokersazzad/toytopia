import React from "react";
import { useParams } from "react-router";
import auth from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {

  const { userEmail } = useParams();

  const handleForget = (e) =>{
    e.preventDefault();
    const forgetEmail = e.target.forgetEmail.value;
    sendPasswordResetEmail(auth, forgetEmail)
  .then(() => {
    toast('Password reset email sent!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }
  return (
    <div>
      <h1 className="text-xl font-semibold text-purple-700 text-center my-4">
        Enter your email to reset your password...!
      </h1>

      <form onSubmit={handleForget} className="w-6/12 lg:w-4/12 mx-auto mt-4 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            defaultValue={userEmail}
            className="mt-1 block w-full rounded-lg border border-gray-200 p-3 shadow-sm focus:ring-2 focus:ring-pink-300"
            placeholder="you@example.com"
            name='forgetEmail'
            required
          />
        </label>

        <button
          
          
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:scale-[1.01] transform transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forget;
