import React, { useEffect, useState } from "react";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";
import { CATEGORY_TABS } from "../../../constants/categoryTabs";

const CATEGORY_KEY = "categories";
const PRODUCT_KEY = "products";

const Category = () => {
  /* ---------- category state ---------- */
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(CATEGORY_KEY);
      return saved ? JSON.parse(saved) : CATEGORY_TABS;
    } catch {
      return CATEGORY_TABS;
    }
  });

  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [editing, setEditing] = useState(null);

  /* ---------- load products ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(PRODUCT_KEY);
    setProducts(saved ? JSON.parse(saved) : []);
  }, []);

  /* ---------- persist categories ---------- */
  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  }, [categories]);

  /* ---------- helpers ---------- */

  const getStats = (categoryId) => {
    const related = products.filter(p => p.categoryId === categoryId);

    return {
      productCount: related.length,
      stockCount: related.reduce(
        (sum, p) => sum + Number(p.stock || 0),
        0
      ),
    };
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    setCategories(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: newCategory.trim(),
      },
    ]);

    setNewCategory("");
    setShowAdd(false);
  };

  const updateCategory = () => {
    if (!editing.name.trim()) return;

    setCategories(prev =>
      prev.map(cat =>
        cat.id === editing.id ? { ...cat, name: editing.name } : cat
      )
    );

    setEditing(null);
  };

  const deleteCategory = (id) => {
    const used = products.some(p => p.categoryId === id);
    if (used) {
      alert("Cannot delete category with products");
      return;
    }

    setCategories(prev => prev.filter(cat => cat.id !== id));
    setOpenMenu(null);
  };

  /* ---------- UI ---------- */

  return (
    <div className="w-full min-h-screen rounded-2xl p-4 sm:p-6 bg-gray-50 overflow-y-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Category</h1>
        <button
          onClick={() => setShowAdd(prev => !prev)}
          className="bg-slate-800 text-white px-4 py-2 rounded-md"
        >
          Add Category
        </button>
      </div>

      {/* Add */}
      {showAdd && (
        <div className="flex gap-3 mb-6">
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category name"
            className="border px-4 py-2 rounded-md"
          />
          <button
            onClick={addCategory}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      )}

      {/* Edit */}
      {editing && (
        <div className="flex gap-3 mb-6 bg-gray-100 p-4 rounded-md">
          <input
            value={editing.name}
            onChange={(e) =>
              setEditing({ ...editing, name: e.target.value })
            }
            className="border px-4 py-2 rounded-md"
          />
          <button
            onClick={updateCategory}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={() => setEditing(null)}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[500px] text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map(cat => {
              const stats = getStats(cat.id);

              return (
                <tr key={cat.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{cat.name}</td>
                  <td className="px-6 py-4">{stats.productCount}</td>
                  <td className="px-6 py-4">{stats.stockCount}</td>

                  <td className="px-6 py-4 text-right relative">
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === cat.id ? null : cat.id)
                      }
                      className="p-2 hover:bg-gray-200 rounded"
                    >
                      <FiMoreVertical />
                    </button>

                    {openMenu === cat.id && (
                      <div className="absolute right-2 mt-2 w-32 bg-white border rounded shadow z-10">
                        <button
                          onClick={() => {
                            setEditing(cat);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                        >
                          <FiEdit /> Edit
                        </button>

                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
