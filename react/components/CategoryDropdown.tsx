import { useState } from "react";
import Select from "react-select";
import "react-dropdown/style.css";

export const CATEGORIES = ["FOOD", "AUTO", "BILLS", "HOBBY", "GAMES", "OTHER"];

type TagOptionType = { value: string; label: string };

const options: TagOptionType[] = [
  { value: "FOOD", label: "FOOD" },
  { value: "AUTO", label: "AUTO" },
  { value: "BILLS", label: "BILLS" },
  { value: "HOBBY", label: "HOBBY" },
  { value: "GAMES", label: "GAMES" },
  { value: "OTHER", label: "OTHER" },
];

const defaultOption = CATEGORIES[0];

function CategoryDropdown() {
  const [category, setCategory] = useState({});

  const handleChange = (option: TagOptionType) => {
    setCategory(option);
  };

  return (
    <div className="relative w-full lg:max-w-sm mb-2">
      <Select
        value={category}
        inputId="categoryDropdown"
        onChange={(option) => handleChange(option as TagOptionType)}
        options={options as any}
      />
    </div>
  );
}

export default CategoryDropdown;
