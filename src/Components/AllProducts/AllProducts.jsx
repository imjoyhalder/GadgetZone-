import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    FaFilter,
    FaChevronLeft,
    FaChevronRight,
    FaSort,
    FaStar,
    FaTimes
} from "react-icons/fa";

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(24); // 6 rows with 4 products each
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [showFilters, setShowFilters] = useState(false);
    const [isFilterApplied, setIsFilterApplied] = useState(false);
    
    const hello = 'hello'
    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await fetch('https://gadget-zone-server-ashy.vercel.app/products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
                setLoading(false);
                console.error("Fetch error:", err);
            }
        };

        fetchProducts();
    }, []);

    // Get unique categories for filter
    const categories = useMemo(() =>
        ["all", ...new Set(products.map(product => product.category))],
        [products]
    );

    // Calculate max and min prices for range slider
    const maxPrice = useMemo(() =>
        Math.max(...products.map(product => product.price), 10000),
        [products]
    );
    const minPrice = useMemo(() =>
        Math.min(...products.map(product => product.price), 0),
        [products]
    );

    // Check if filters are applied
    useEffect(() => {
        const hasFilters = selectedCategory !== "all" ||
            priceRange[0] !== minPrice ||
            priceRange[1] !== maxPrice ||
            sortOption !== "default";
        setIsFilterApplied(hasFilters);
    }, [selectedCategory, priceRange, sortOption, minPrice, maxPrice]);

    // Filter and sort products
    useEffect(() => {
        let result = [...products];

        // Apply category filter
        if (selectedCategory !== "all") {
            result = result.filter(product => product.category === selectedCategory);
        }

        // Apply price filter
        result = result.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply sorting
        switch (sortOption) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name":
                result.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "rating":
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
                // Default sorting (newest first)
                break;
        }

        setFilteredProducts(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [products, selectedCategory, sortOption, priceRange]);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers for pagination with ellipsis
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always include first page
            pageNumbers.push(1);

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            if (startPage > 2) {
                pageNumbers.push('...');
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always include last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    // Render star ratings
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-300" />);
            }
        }
        return stars;
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedCategory("all");
        setPriceRange([minPrice, maxPrice]);
        setSortOption("default");
    };

    // Loading state
    if (loading) {
        return (
            // <div className="container px-4 py-8 mx-auto">
            //     <div className="flex flex-col items-center justify-center py-12">
            //         <div className="w-16 h-16 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            //         <p className="mt-4 text-gray-600">Loading products...</p>
            //     </div>
            // </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute flex items-center justify-center bg-white rounded-full shadow-md inset-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-blue-600 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4m4-6h.01M16 6h.01M16 18h.01M8 18h.01"
                            />
                        </svg>
                    </div>
                </div>
                <p className="mt-4 font-medium text-gray-700 animate-pulse">
                    Loading products...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="container px-4 py-8 mx-auto">
                <div className="p-6 mb-6 rounded-lg bg-red-50">
                    <div className="flex items-center mb-3">
                        <FaTimes className="mr-2 text-red-500" />
                        <h3 className="text-lg font-semibold text-red-800">Error</h3>
                    </div>
                    <p className="text-red-700">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container px-4 py-8 mx-auto mt-10 md:mt-28">
            {/* Header and Controls */}
            <div className="flex flex-col mb-8 space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Our Products</h1>
                    <p className="text-gray-600">
                        Showing {filteredProducts.length} of {products.length} products
                        {isFilterApplied && (
                            <button
                                onClick={clearFilters}
                                className="ml-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear filters
                            </button>
                        )}
                    </p>
                </div>

                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        <select
                            className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:w-48"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="default">Default Sorting</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name">Name: A to Z</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <FaSort className="text-gray-400" />
                        </div>
                    </div>

                    {/* Filter Toggle Button */}
                    <button
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg md:hidden"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FaFilter className="mr-2" />
                        Filters
                        {isFilterApplied && (
                            <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 -mt-1 -mr-1 text-xs text-white bg-red-500 rounded-full"></span>
                        )}
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Filters Sidebar */}
                <div className={`w-full mb-6 md:w-64 md:mb-0 md:mr-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Filters</h3>
                            <button
                                className="md:hidden"
                                onClick={() => setShowFilters(false)}
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h4 className="mb-2 font-medium text-gray-700">Category</h4>
                            <div className="space-y-2 overflow-y-auto max-h-40">
                                {categories.map(category => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`category-${category}`}
                                            name="category"
                                            checked={selectedCategory === category}
                                            onChange={() => setSelectedCategory(category)}
                                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                        />
                                        <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h4 className="mb-2 font-medium text-gray-700">Price Range</h4>
                            <div className="space-y-4">
                                <div>
                                    <input
                                        type="range"
                                        min={minPrice}
                                        max={maxPrice}
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                                        <span>৳ {priceRange[0].toLocaleString()}</span>
                                        <span>৳ {priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters Button */}
                        <button
                            onClick={clearFilters}
                            className="w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    {currentProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {currentProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm"
                                    >
                                        <Link to={`/product/${product._id}`}>
                                            {/* Product Image */}
                                            <div className="relative aspect-w-1 aspect-h-1">
                                                <img
                                                    src={product.image}
                                                    alt={product.title}
                                                    className="object-contain w-full h-48 p-4"
                                                    onError={(e) => {
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e5e7eb'%3E%3Cpath d='M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z'/%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4">
                                                {/* Category */}
                                                <div className="mb-2">
                                                    <span className="text-xs font-medium text-gray-500 uppercase">
                                                        {product.category}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h2 className="h-10 mb-3 text-sm font-normal text-gray-800 line-clamp-2">
                                                    {product.title}
                                                </h2>

                                                {/* Price */}
                                                <div className="mb-4">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-lg font-bold text-gray-900">
                                                            ৳{product.price.toLocaleString()}
                                                        </span>
                                                        {product.originalPrice > product.price && (
                                                            <span className="text-sm font-medium text-gray-500 line-through">
                                                                ৳{product.originalPrice.toLocaleString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Details Button */}
                                                <button className="w-full py-2 text-sm font-medium text-center text-blue-600 transition-colors border border-blue-600 rounded-md hover:bg-blue-50">
                                                    Details
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <nav className="flex items-center space-x-2">
                                        <button
                                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="flex items-center px-3 py-2 text-gray-500 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaChevronLeft className="w-4 h-4" />
                                        </button>

                                        {getPageNumbers().map((number, index) => {
                                            if (number === '...') {
                                                return (
                                                    <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-500">...</span>
                                                );
                                            }

                                            return (
                                                <button
                                                    key={number}
                                                    onClick={() => paginate(number)}
                                                    className={`px-4 py-2 border rounded-md transition-colors ${currentPage === number
                                                        ? "text-white bg-blue-600 border-blue-600 hover:bg-blue-700"
                                                        : "text-gray-700 bg-white border-gray-300 hover:bg-gray-100"
                                                        }`}
                                                >
                                                    {number}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center px-3 py-2 text-gray-500 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaChevronRight className="w-4 h-4" />
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 mb-4 bg-gray-100 rounded-full">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">No products found</h3>
                            <p className="max-w-md text-gray-600">
                                Try adjusting your filters to find what you're looking for.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductGrid;