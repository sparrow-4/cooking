import React from "react";
import Categoryitem from "./CategoryItem";
import { CATEGORY_TABS } from "../../constants/categoryTabs";

const CategoryTabs = ({ active, setActive }) => {
  return (
    <div className="flex space-x-8 mt-8">
      {CATEGORY_TABS.map((tab) => (
        <Categoryitem
          key={tab.id}
          label={tab.label}
          active={active === tab.id}
          onClick={() => setActive(tab.id)}
        />
      ))}
    </div>
  );
};

export default CategoryTabs;
