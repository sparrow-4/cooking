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
      return DISHDATA.map((item) => ({
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
    setProducts((prev) => [...prev, product]);
    setAdding(false);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editing.id ? editing : p))
    );
    setEditing(null);
  };

  const startEdit = (product) => {
    setEditing({ ...product });
  };

  /* ---------- UI ---------- */

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-50">

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

      {/* ================= DESKTOP / LARGE SCREEN TABLE ================= */}
      <div className="hidden md:block w-full overflow-x-auto">
        <div className="min-w-[1100px]">
          <ProductTable
            products={products}
            onEdit={startEdit}
            onDelete={deleteProduct}
          />
        </div>
      </div>

      {/* ================= MOBILE / TABLET CARD VIEW ================= */}
      <div className="block md:hidden space-y-4 mt-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
          >
            {/* TOP */}
            <div className="flex items-center gap-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {product.categoryName || product.category}
                </p>
              </div>
            </div>

            {/* DETAILS */}
            <div className="flex justify-between text-sm text-gray-600">
              <div>
                <p className="text-xs uppercase">Stock</p>
                <p className="font-medium">{product.stock}</p>
              </div>

              <div>
                <p className="text-xs uppercase">Sizes</p>
                <div className="flex gap-1">
                  {product.sizes?.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 text-xs rounded-full bg-yellow-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ORDER TYPES */}
            <div className="text-xs text-gray-500">
              {product.orderTypes?.join(", ")}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-2 border-t">
             <button
  onClick={() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    startEdit(product);
  }}
  className="flex-1 py-2 rounded-md border text-sm"
>
  Edit
</button>


              <button
                onClick={() => deleteProduct(product.id)}
                className="flex-1 py-2 rounded-md border text-sm text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Product;
