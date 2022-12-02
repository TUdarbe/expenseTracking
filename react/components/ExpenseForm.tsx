import React from "react";
import CategoryDropdown from "./CategoryDropdown";

function ExpenseForm() {
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Category
          </label>

          <CategoryDropdown />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Amount
          </label>

          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Description
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Note
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Date
          </label>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
