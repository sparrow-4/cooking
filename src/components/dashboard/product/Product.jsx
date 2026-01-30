import React, { useEffect, useState } from "react";
import { DISHDATA } from "../../../constants/assets";
import ProductHeader from "./ProductHeader";
import ProductTable from "./ProductTable";
import ProductEdit from "./ProductEdit";
import ProductAdd from "./ProductAdd";

const PRODUCT_KEY = "products";

const Product = () => {
  /* ---------- state ---------- */

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(PRODUCT_KEY);
      if (saved) return JSON.parse(saved);

      // first load fallback
      return DISHDATA.map(item => ({
        ...item,
        categoryId: item.categoryId || "",
        sizes: item.sizes || [],
        orderTypes: item.orderTypes || [],
        pricing: item.pricing || {},
        stock: Number(item.stock || 0),
      }));
    } catch {
      return [];
    }
  });

  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  /* ---------- persist ---------- */
  useEffect(() => {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  /* ---------- actions ---------- */

  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
    setAdding(false);
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = () => {
    setProducts(prev =>
      prev.map(p => (p.id === editing.id ? editing : p))
    );
    setEditing(null);
  };

  const startEdit = (product) => {
    // clone to avoid live mutation
    setEditing({ ...product });
  };

  /* ---------- UI ---------- */

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-50 overflow-x-auto">

      <ProductHeader onAdd={() => setAdding(true)} />

      {adding && (
        <ProductAdd
          onAdd={addProduct}
          onCancel={() => setAdding(false)}
        />
      )}

      {editing && (
        <ProductEdit
          product={editing}
          setProduct={setEditing}
          onUpdate={updateProduct}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="w-full overflow-x-auto">
  <div className="min-w-[1100px]"> {/* adjust width if needed */}
    <ProductTable
      products={products}
      onEdit={startEdit}
      onDelete={deleteProduct}
    />
  </div>
</div>

    </div>
  );
};

export default Product;
