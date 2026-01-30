import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";

const CATEGORY_KEY = "categories";

const CategoryTabs = ({ active, setActive }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = () => {
      const saved = localStorage.getItem(CATEGORY_KEY);
      setCategories(saved ? JSON.parse(saved) : []);
    };

    loadCategories();

    // sync when admin updates categories
    window.addEventListener("storage", loadCategories);
    return () =>
      window.removeEventListener("storage", loadCategories);
  }, []);

  return (
    <div className="flex space-x-8 mt-8 overflow-x-auto no-scrollbar">
      {/* ALL TAB */}
      <CategoryItem
        label="ALL"
        active={active === "ALL"}
        onClick={() => setActive("ALL")}
      />

      {/* DYNAMIC CATEGORIES */}
      {categories.map((cat) => (
        <CategoryItem
          key={cat.id}
          label={cat.name}
          active={active === cat.id}
          onClick={() => setActive(cat.id)}
        />
      ))}
    </div>
  );
};

export default CategoryTabs;
