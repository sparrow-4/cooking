import React, { useState } from "react";
import TabItem from "./TabItem";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="flex space-x-8 mt-8  ">
      <TabItem
        label="Today Special"
        active={activeTab === "today"}
        onClick={() => setActiveTab("today")}
      />

      <TabItem
        label="Our Specials"
        active={activeTab === "specials"}
        onClick={() => setActiveTab("specials")}
      />

      <TabItem
        label="South Indian Special"
        active={activeTab === "south"}
        onClick={() => setActiveTab("south")}
      />
    </div>
  );
};

export default Tabs;
