import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function FeaturedProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; 

  const {
    isLoading,
    error,
    isError,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get(
        "https://gadgetzone-server.onrender.com/products"
      );
      return res.data;
    },
  });

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="p-4 bg-white shadow rounded-xl animate-pulse">
      <div className="w-20 h-6 mb-3 bg-gray-300 rounded"></div>
      <div className="h-40 mb-3 bg-gray-200 rounded"></div>
      <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-11/12 mx-auto my-10 mt-[100px]">
        <h1 className="mb-4 text-lg font-bold text-center md:text-2xl">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="my-10 text-center">
        <p className="font-semibold text-red-600">
          Failed to load products. Please try again later.
        </p>
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="my-10 text-center text-gray-500">
        No featured products found.
      </div>
    );
  }

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="relative w-11/12 mx-auto my-10 top-16">
      <h1 className="text-lg font-bold text-center md:text-2xl">
        Featured Products
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Get Your Desired Product from Featured Products!
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {currentProducts.map((product, idx) => (
          <div
            key={product._id || idx}
            className="relative overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-2xl"
          >
            {/* Save Badge */}
            {product.discount>0 && (
              <div className="absolute z-10 px-2 py-1 text-xs text-white bg-purple-600 rounded-md top-3 left-2">
                Save: {product.save_amount}৳ ({product.discount})
              </div>
            )}

            {/* Product Image */}
            <Link to={`/product/${product._id}`}>
              <div className="flex items-center justify-center h-40 p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain max-h-full"
                />
              </div>

              {/* Product Title */}
              <div className="px-4 pb-4 text-center">
                <h2 className="mb-2 text-sm font-semibold text-gray-800 line-clamp-2">
                  {product.title}
                </h2>

                {/* Price Section */}
                <div className="text-lg font-bold text-red-600">
                  {product.price}৳{" "}
                  {product.previous_price && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {product.previous_price}৳
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-8 space-x-2">
        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === idx + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FeaturedProduct;
