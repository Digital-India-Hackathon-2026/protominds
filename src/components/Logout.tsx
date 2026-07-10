import React from "react";

const Logout: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-100">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center w-full max-w-md">

        <div className="text-6xl mb-4">
            👋
        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          Logout
        </h2>

        <p className="text-slate-500 mt-3">
          Are you sure you want to logout?
        </p>

        <div className="flex gap-4 mt-8">

          <button
            className="flex-1 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Logout;