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

  const [cart, setCart] = useState([]);

  const loader = useRef(null);

  // Load Cart from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  // Save Cart
  const saveCart = (data) => {
      setCart(data);
      localStorage.setItem("cart", JSON.stringify(data));
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    saveCart(updatedCart);
  };

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
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 w-full sm:w-1/2 rounded-lg "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded-lg "
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

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-md bg-white hover:shadow-xl transition p-4"
          >
            <img
              src={p.thumbnail}
              alt={p.title}
              className="h-40 w-full object-cover rounded-lg"
            />

            <h2 className="font-semibold mt-2 line-clamp-1 text-gray-800">
              {p.title}
            </h2>

            <p className="text-sm text-gray-500 capitalize">{p.category}</p>

            <p className="font-bold text-blue-600 mt-1">${p.price}</p>

            <button
              onClick={() => addToCart(p)}
              className="mt-3 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Infinite Loader */}
      <div ref={loader} className="h-10 mt-10 text-center font-semibold">
        {hasMore ? "Loading more..." : "No more products"}
      </div>
    </div>
  );
};

export default Products;
