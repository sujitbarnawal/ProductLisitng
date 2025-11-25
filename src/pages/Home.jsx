import React from 'react'

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 text-center">
      <h1 className="text-4xl font-semibold mb-4">Product Listing Webpage</h1>

      <p className="text-lg text-gray-700 leading-7">
        This project is a simple product listing webpage built using <strong>React</strong>.
        It demonstrates fundamental concepts such as API fetching, searching, filtering,
        infinite scrolling, and responsive UI design.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3"> Features</h2>
      <ul className="text-left text-gray-700 text-lg leading-7 mx-auto max-w-xl">
        <li>• Products page with product list (fetched from dummy API)</li>
        <li>• Search bar to filter products by name</li>
        <li>• Category filter dropdown</li>
        <li>• Infinite scroll to load more products</li>
        <li>• Fully responsive design</li>
      </ul>


      <h2 className="text-2xl font-semibold mt-10 mb-3">Tech Stack</h2>
      <ul className="text-left text-gray-700 text-lg leading-7 mx-auto max-w-xl">
        <li>• React (with React Router)</li>
        <li>• Tailwind CSS for styling</li>
        <li>• Dummy API for products</li>
      </ul>

      

      
    </div>
  )
}

export default Home


