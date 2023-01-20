import React, { useState } from "react";
import Select from "react-select";
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

interface Props {
  uid: string;
}

function ExpenseForm({ uid }: Props) {
  const [category, setCategory] = useState({});
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (option: TagOptionType) => {
    setCategory(option);
  };

  const handleOnSubmit = async (e: any) => {
    e.preventDefault();

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
      uid: uid,
    }).then(() => {
      setDescription("");
      setAmount(0);
      setDate("");
      setNote("");
    });
  };

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "#18181b",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: "#fff",
      boxShadow: state.isFocused ? null : null,

      outline: state.isHoover ? "#f8fafc" : "#f8fafc",
    }),
    menuList: (provided: any, state: any) => ({
      ...provided,
      background: "#1f2937",
      outline: state.isHoover ? "#f8fafc" : "#f8fafc",
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      color: "#f8fafc",
      backgroundColor: state.isSelected
        ? "#3f3f46"
        : state.isFocused
        ? "#3f3f46"
        : "#171717",
      ":hover": {
        backgroundColor: "#3f3f46",
      },
    }),

    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: "#f8fafc",
    }),
  };

  return (
    <div className="w-90 max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-90  px-3">
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
              className="appearance-none block w-full bg-zinc-900 text-slate-50 border border-slate-50 rounded py-3 px-4 mb-3 leading-tight focus:outline outline-offset-0 outline-slate-50/50 "
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
              styles={customStyles}
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
            className="appearance-none block w-full bg-zinc-900 text-slate-50 border border-slate-50 rounded py-3 px-4 mb-3 leading-tight focus:outline outline-offset-0 outline-slate-50/50 "
          />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Description
          </label>
          <input
            value={description}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(e.target.value);
            }}
            className="appearance-none block w-full bg-zinc-900 text-slate-50 border border-slate-50 rounded py-3 px-4 mb-3 leading-tight focus:outline outline-offset-0 outline-slate-50/50 "
          />

          <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
            Note
          </label>
          <input
            value={note}
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNote(e.target.value);
            }}
            className="appearance-none block w-full bg-zinc-900 text-slate-50 border border-slate-50 rounded py-3 px-4 mb-3 leading-tight focus:outline outline-offset-0 outline-slate-50/50 "
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
