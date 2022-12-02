import React from "react";

export const CATEGORIES = ["FOOD", "AUTO", "BILLS", "HOBBY", "GAMES", "OTHER"];

function CategoryDropdown() {
  return (
    <div className="relative w-full lg:max-w-sm mb-2">
      <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
        <option>FOOD</option>
        <option>AUTO</option>
        <option>BILLS</option>
        <option>CLOTHES</option>
        <option>GAMES & HOBBY</option>
        <option>OTHER</option>
      </select>
    </div>
  );
}

export default CategoryDropdown;
