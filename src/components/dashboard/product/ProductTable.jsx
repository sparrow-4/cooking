import ProductRow from "./ProductRow";

const ProductTable = ({ products, onEdit, onDelete }) => {
  if (!products.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-400">
        No products found
      </div>
    );
  }

  return (
    <>
      <p className="text-xs text-gray-400 px-4 py-2 sm:hidden">
        Swipe left/right to see more →
      </p>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Sizes</th>
              <th className="px-6 py-4">Order Types</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductTable;
