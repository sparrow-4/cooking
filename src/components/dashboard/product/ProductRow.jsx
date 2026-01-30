import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";

const CATEGORY_KEY = "categories";

const ProductRow = ({ product, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("—");

  /* load category name */
  useEffect(() => {
    const categories =
      JSON.parse(localStorage.getItem(CATEGORY_KEY)) || [];

    const category = categories.find(
      c => c.id === product.categoryId
    );

    setCategoryName(category?.name || "—");
  }, [product.categoryId]);

  return (
    <tr className="border-t hover:bg-gray-50">
      {/* Image */}
      <td className="px-6 py-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>

      {/* Name */}
      <td className="px-6 py-4 font-medium">
        {product.name}
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        {categoryName}
      </td>

      {/* Stock */}
      <td className="px-6 py-4">
        {product.stock}
      </td>

      {/* Sizes */}
      <td className="px-6 py-4 flex gap-2 flex-wrap">
        {product.sizes.map(size => (
          <span
            key={size}
            className="bg-yellow-200 text-xs px-2 py-1 rounded-full"
          >
            {size}
          </span>
        ))}
      </td>

      {/* Order Types */}
      <td className="px-6 py-4">
        {product.orderTypes.join(", ")}
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(prev => !prev);
          }}
          className="p-2 hover:bg-gray-200 rounded"
        >
          <FiMoreVertical />
        </button>

        {open && (
          <div className="absolute right-2 mt-2 w-32 bg-white border rounded shadow z-10">
            <button
              onClick={() => {
                onEdit(product);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
            >
              <FiEdit /> Edit
            </button>

            <button
              onClick={() => onDelete(product.id)}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
