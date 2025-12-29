import React from "react";
import DishCard from "./DishCard";

const DishGrid = ({ data, addToCart, cart }) => {

  if (!data || data.length === 0) {
    return (
      <div className="mt-16 w-full text-center text-gray-400">
        <p className="text-lg font-semibold">No dishes found</p>
        <p className="text-sm mt-1">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div
      className="
        mt-6
        grid
        gap-x-4 gap-y-8
        [@media(max-width:270px)]:grid-cols-1
        [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]
        md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]
        xl:[grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
      "
    >
      {data.map((dish) => (
        <DishCard
          key={dish.id}
          dish={dish}
          onAddToCart={addToCart}
          cart={cart}
        />
      ))}
    </div>
  );
};

export default DishGrid;
