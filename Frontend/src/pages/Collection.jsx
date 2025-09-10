import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../contex/ShopContext.jsx'
import { UserContext } from '../contex/UserContex.jsx'
import Card from '../component/Card.jsx'
import { FaStar, FaFilter, FaTimes, FaSearch } from 'react-icons/fa'
import { IoChevronDown } from 'react-icons/io5'

function Collection() {
  const { products, loading, searchQuery, setSearchQuery, searchProducts } = useContext(ShopContext)
  const { addToCart } = useContext(UserContext)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [sortBy, setSortBy] = useState('relevant')
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: []
  })
  const [searchParams] = useSearchParams()

  const categories = ['Men', 'Women', 'Kids']
  const subcategories = ['TopWear', 'BottomWear', 'WinterWear']
  const sortOptions = [
    { value: 'relevant', label: 'Relevant' },
    { value: 'low-high', label: 'Price: Low to High' },
    { value: 'high-low', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ]

  useEffect(() => {
    if (searchParams.get('search') === 'true') {
      setShowSearch(true)
    }
  }, [searchParams])

  useEffect(() => {
    applyFilters()
  }, [products, filters, sortBy, searchQuery])

  const applyFilters = () => {
    let filtered = [...products]

    // Apply search filter first
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery)
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category))
    }

    // Apply subcategory filter
    if (filters.subcategories.length > 0) {
      filtered = filtered.filter(product => filters.subcategories.includes(product.subcategory))
    }

    // Apply sorting
    switch (sortBy) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter(item => item !== value)
      } else {
        newFilters[type] = [...newFilters[type], value]
      }
      return newFilters
    })
  }

  const clearFilters = () => {
    setFilters({ categories: [], subcategories: [] })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-slate-800/60 rounded-2xl p-6 animate-pulse">
                <div className="h-6 bg-slate-700 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1,2,3].map(i => <div key={i} className="h-4 bg-slate-700 rounded"></div>)}
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-slate-800/60 rounded-2xl p-4 animate-pulse">
                    <div className="bg-slate-700 h-64 rounded-xl mb-4"></div>
                    <div className="bg-slate-700 h-4 rounded mb-2"></div>
                    <div className="bg-slate-700 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Search Bar */}
        {showSearch && (
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 text-slate-100 px-4 py-3 pl-10 rounded-lg border border-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                autoFocus
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <button
                onClick={() => setShowSearch(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-100"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700"
          >
            <FaFilter className="text-sm" />
            Filters
          </button>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700"
          >
            <FaSearch className="text-sm" />
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-100">FILTERS</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-slate-400 hover:text-slate-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">CATEGORIES</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => handleFilterChange('categories', category)}
                        className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400 focus:ring-2"
                      />
                      <span className="ml-3 text-slate-300 group-hover:text-slate-100 transition-colors">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub-Categories */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-200 mb-4">SUB-CATEGORIES</h4>
                <div className="space-y-3">
                  {subcategories.map(subcategory => (
                    <label key={subcategory} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={filters.subcategories.includes(subcategory)}
                        onChange={() => handleFilterChange('subcategories', subcategory)}
                        className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400 focus:ring-2"
                      />
                      <span className="ml-3 text-slate-300 group-hover:text-slate-100 transition-colors">
                        {subcategory}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'ALL COLLECTIONS'}
                </h1>
                <p className="text-slate-400">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              
              {/* Desktop Search Toggle */}
              <div className="hidden lg:block mt-4 sm:mt-0">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 hover:border-cyan-400 transition-colors mr-4"
                >
                  <FaSearch className="text-sm" />
                  Search
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="mt-4 sm:mt-0">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-slate-800 border border-slate-600 text-slate-100 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        Sort By: {option.label}
                      </option>
                    ))}
                  </select>
                  <IoChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card
                    key={product._id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-slate-400 text-lg mb-4">No products found</div>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection