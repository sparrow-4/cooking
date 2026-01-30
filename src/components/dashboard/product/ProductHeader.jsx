import React from "react";

const ProductHeader = ({ onAdd }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 className="text-2xl font-semibold">Products</h1>

      <button
        onClick={onAdd}
        className="bg-slate-800 text-white px-4 py-2 rounded-md w-full sm:w-auto"
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductHeader;
