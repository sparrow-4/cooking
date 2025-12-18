import React from "react";
import TabItem from "./TabItem";

const Tabs = ({ active, setActive }) => {
  return (
    <div className="flex space-x-8 mt-8">
      <TabItem
        label="All"
        active={active === "ALL"}
        onClick={() => setActive("ALL")}
      />

      <TabItem
        label="Today Special"
        active={active === "TODAY"}
        onClick={() => setActive("TODAY")}
      />

      <TabItem
        label="Our Specials"
        active={active === "SPECIAL"}
        onClick={() => setActive("SPECIAL")}
      />

      <TabItem
        label="South Indian Special"
        active={active === "SOUTH_INDIAN"}
        onClick={() => setActive("SOUTH_INDIAN")}
      />
    </div>
  );
};

export default Tabs;
