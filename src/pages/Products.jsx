/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

  const getCategories = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      let url = `https://dummyjson.com/products?limit=10&skip=${skip}`;

      if (category) {
        url = `https://dummyjson.com/products/category/${category}?limit=10&skip=${skip}`;
      }

      const res = await axios.get(url);

      if (res.data.products.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...res.data.products]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setSkip((prev) => prev + 10);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [skip]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loader.current) observer.observe(loader.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
  }, [category]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Search + Category filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((ct, i) => (
            <option key={i} value={ct.slug}>
              {ct.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="border rounded p-3 shadow-sm">
            <img
              src={p.thumbnail}
              alt={p.title}
              className="h-32 w-full object-cover rounded"
            />

            <h2 className="font-semibold mt-2 line-clamp-1">{p.title}</h2>

            <p className="text-sm text-gray-500 capitalize">{p.category}</p>

            <p className="font-bold mt-1">${p.price}</p>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loader} className="h-10 mt-10 text-center font-semibold">
        {hasMore ? "Loading more..." : "No more products"}
      </div>
    </div>
  );
};

export default Products;
