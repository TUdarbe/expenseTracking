import React, { useState } from "react";
import Select from "react-select";
import CategoryDropdown from "./CategoryDropdown";
import database from "../util/Fbdatabase";
import { collection, addDoc } from "firebase/firestore";
import moment from "moment";

type TagOptionType = { value: string; label: string };

const options: TagOptionType[] = [
  { value: "FOOD", label: "FOOD" },
  { value: "AUTO", label: "AUTO" },
  { value: "BILLS", label: "BILLS" },
  { value: "HOBBY", label: "HOBBY" },
  { value: "GAMES", label: "GAMES" },
  { value: "OTHER", label: "OTHER" },
];

function ExpenseForm() {
  const [category, setCategory] = useState({});
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (option: TagOptionType) => {
    setCategory(option);
  };

  const handleOnSubmit = async () => {
    const momentObj = moment(date, "YYYY-MM-DD");

    const month = momentObj.month();
    const year = momentObj.year();

    const docRef = await addDoc(collection(database, "expenses"), {
      amount: amount,
      category: (category as TagOptionType).value,
      description: description,
      note: note,
      date: date,
      month: month,
      year: year,
    });
  };

  return (
    <div className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Date
          </label>
          <div className="relative w-full lg:max-w-sm mb-2">
            <input
              type="date"
              id="start"
              name="trip-start"
              value={date}
              min="2022-01-01"
              max="2024-12-31"
              onChange={(e) => setDate(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Category
          </label>

          <div className="relative w-full lg:max-w-sm mb-2">
            <Select
              value={category}
              inputId="categoryDropdown"
              onChange={(option) => handleChange(option as TagOptionType)}
              options={options as any}
            />
          </div>

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAmount(parseInt(e.target.value));
            }}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Description
          </label>
          <input
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Note
          </label>
          <input
            value={note}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNote(e.target.value);
            }}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />

          <button
            onClick={handleOnSubmit}
            id="addButton"
            className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
