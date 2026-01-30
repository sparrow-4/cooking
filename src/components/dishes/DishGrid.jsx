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

    grid-cols-2         
    sm:grid-cols-3      

    lg:grid-cols-[repeat(auto-fill,minmax(260px,260px))]
    lg:justify-center
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
