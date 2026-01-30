import { useEffect, useState } from "react";

const SIZE_OPTIONS = ["S", "M", "L"];
const ORDER_TYPES = ["DINE_IN", "TAKEAWAY", "DELIVERY"];
const CATEGORY_KEY = "categories";

const ProductAdd = ({ onAdd, onCancel }) => {
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    categoryId: "",
    stock: 0,
    sizes: [],
    orderTypes: [],
    image: "",
    currency: "AED",
    pricing: {},
  });

  /* ---------- load categories ---------- */
  useEffect(() => {
    const saved = localStorage.getItem(CATEGORY_KEY);
    setCategories(saved ? JSON.parse(saved) : []);
  }, []);

  /* ---------- helpers ---------- */

  const toggleSize = (size) => {
    setProduct((prev) => {
      const hasSize = prev.sizes.includes(size);

      if (hasSize) {
        const { [size]: _, ...restPricing } = prev.pricing;
        return {
          ...prev,
          sizes: prev.sizes.filter((s) => s !== size),
          pricing: restPricing,
        };
      }

      return {
        ...prev,
        sizes: [...prev.sizes, size],
        pricing: {
          ...prev.pricing,
          [size]: { price: 0, oldPrice: 0 },
        },
      };
    });
  };

  const toggleOrderType = (type) => {
    setProduct((prev) => ({
      ...prev,
      orderTypes: prev.orderTypes.includes(type)
        ? prev.orderTypes.filter((t) => t !== type)
        : [...prev.orderTypes, type],
    }));
  };

  const handleImageUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!product.name.trim()) return alert("Product name is required");
    if (!product.categoryId) return alert("Category is required");
    if (!product.image) return alert("Product image is required");
    if (product.sizes.length === 0) return alert("Select at least one size");

    const invalidPrice = product.sizes.some(
      (size) => product.pricing[size]?.price <= 0
    );
    if (invalidPrice) return alert("Price must be greater than 0");

    onAdd({
      ...product,
      id: crypto.randomUUID(),
      stock: Number(product.stock),
    });
  };

  /* ---------- UI ---------- */

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-5">

      {/* Image */}
      <div>
        <p className="text-sm font-medium mb-2">Product Image</p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-20 h-20 border rounded-md flex items-center justify-center overflow-hidden bg-gray-50">
            {product.image ? (
              <img
                src={product.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">No Image</span>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Name */}
      <input
        value={product.name}
        onChange={(e) =>
          setProduct({ ...product, name: e.target.value })
        }
        className="border px-3 py-2 rounded w-full"
        placeholder="Product name"
      />

      {/* Category */}
      <select
        value={product.categoryId}
        onChange={(e) =>
          setProduct({ ...product, categoryId: e.target.value })
        }
        className="border px-3 py-2 rounded w-full"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Stock */}
      <input
        type="number"
        value={product.stock}
        onChange={(e) =>
          setProduct({ ...product, stock: Number(e.target.value) })
        }
        className="border px-3 py-2 rounded w-full"
        placeholder="Stock"
      />

      {/* Sizes */}
      <div>
        <p className="text-sm font-medium mb-2">Sizes</p>
        <div className="flex flex-wrap gap-4">
          {SIZE_OPTIONS.map((size) => (
            <label key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.sizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      {/* Pricing */}
      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Pricing</p>

          {product.sizes.map((size) => (
            <div
              key={size}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
            >
              <span className="font-medium">{size}</span>

              <input
                type="number"
                placeholder="Price"
                value={product.pricing[size]?.price}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      [size]: {
                        ...prev.pricing[size],
                        price: Number(e.target.value),
                      },
                    },
                  }))
                }
                className="border px-3 py-2 rounded w-full"
              />

              <input
                type="number"
                placeholder="Old Price"
                value={product.pricing[size]?.oldPrice}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    pricing: {
                      ...prev.pricing,
                      [size]: {
                        ...prev.pricing[size],
                        oldPrice: Number(e.target.value),
                      },
                    },
                  }))
                }
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          ))}
        </div>
      )}

      {/* Order Types */}
      <div>
        <p className="text-sm font-medium mb-2">Order Types</p>
        <div className="flex flex-wrap gap-4">
          {ORDER_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={product.orderTypes.includes(type)}
                onChange={() => toggleOrderType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Add Product
        </button>

        <button
          onClick={onCancel}
          className="border px-4 py-2 rounded w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductAdd;
