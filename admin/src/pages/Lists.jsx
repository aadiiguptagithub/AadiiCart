import React, { useState, useEffect, useContext } from 'react';
import { FiTrash2, FiPackage, FiEdit, FiEye } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdOutlineInventory } from 'react-icons/md';
import { BiRupee } from 'react-icons/bi';
import axios from 'axios';
import { authDataContext } from '../context/AuthContex.jsx';
import toast, { Toaster } from 'react-hot-toast';

function Lists() {
  const { serverUrl } = useContext(authDataContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverUrl}/api/product/listproduct`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        setProducts(response.data.products || []);
        toast.success('Products loaded successfully');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(productId);
      const response = await axios.delete(`${serverUrl}/api/product/removeproduct/${productId}`, {
        withCredentials: true
      });
      
      if (response.status === 200) {
        setProducts(products.filter(product => product._id !== productId));
        toast.success('Product deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product: ' + (error.response?.data?.message || error.message));
    } finally {
      setDeleteLoading(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center '>
        
        <div className='text-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4'></div>
          <p className='text-white text-lg'>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 pt-[90px] p-4 md:p-8'>
      <Toaster position="top-right" />
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <MdOutlineInventory className='text-teal-500 text-4xl mr-3' />
            {/* <h1 className='text-3xl md:text-4xl font-bold text-white'>Product Inventory</h1> */}
          </div>
          {/* <p className='text-gray-400'>Manage and view all your products</p> */}
          <div className='mt-4 inline-flex items-center bg-slate-800 px-6 py-3 rounded-full border border-slate-700'>
            <FiPackage className='text-teal-500 mr-2' />
            <span className='text-white font-medium'>{products.length} Products Total</span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className='bg-slate-800 p-12 rounded-xl shadow-lg border border-slate-700 text-center'>
            <FiPackage className='text-gray-500 text-6xl mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-white mb-2'>No Products Found</h3>
            <p className='text-gray-400 mb-6'>Start by adding your first product to the inventory.</p>
            <button 
              onClick={() => window.location.href = '/add'}
              className='bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors'
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className='grid gap-6'>
            <div className='hidden md:grid md:grid-cols-12 gap-4 bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-700 font-semibold text-gray-300'>
              <div className='col-span-2'>Image</div>
              <div className='col-span-3'>Product Details</div>
              <div className='col-span-2'>Category</div>
              <div className='col-span-2'>Price</div>
              <div className='col-span-2'>Sizes</div>
              <div className='col-span-1'>Actions</div>
            </div>

            {products.map((product) => (
              <div key={product._id} className='bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 hover:border-teal-500 transition-all duration-300'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-4 items-center'>
                  <div className='col-span-1 md:col-span-2'>
                    <div className='w-20 h-20 md:w-16 md:h-16 rounded-lg overflow-hidden bg-slate-700 mx-auto md:mx-0'>
                      {product.image && product.image.length > 0 ? (
                        <img 
                          src={product.image[0]} 
                          alt={product.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full flex items-center justify-center'>
                          <FiPackage className='text-gray-500 text-xl' />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-3 text-center md:text-left'>
                    <h3 className='font-semibold text-white text-lg mb-1'>{product.name}</h3>
                    <p className='text-gray-400 text-sm line-clamp-2'>{product.description}</p>
                    {product.bestseller && (
                      <span className='inline-block bg-yellow-600 text-yellow-100 text-xs px-2 py-1 rounded-full mt-2'>
                        ⭐ Bestseller
                      </span>
                    )}
                  </div>

                  <div className='col-span-1 md:col-span-2 text-center md:text-left'>
                    <div className='inline-flex flex-col items-center md:items-start'>
                      <span className='bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                        {product.category}
                      </span>
                      <span className='text-gray-400 text-xs mt-1'>{product.subcategory}</span>
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-2 text-center md:text-left'>
                    <div className='flex items-center justify-center md:justify-start text-2xl font-bold text-green-400'>
                      <BiRupee />
                      <span>{product.price}</span>
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-2 text-center md:text-left'>
                    <div className='flex flex-wrap gap-1 justify-center md:justify-start'>
                      {product.size && product.size.map((size, index) => (
                        <span key={index} className='bg-slate-700 text-gray-300 px-2 py-1 rounded text-xs font-medium'>
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className='col-span-1 md:col-span-1 flex justify-center md:justify-end'>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      disabled={deleteLoading === product._id}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        deleteLoading === product._id
                          ? 'bg-slate-700 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                      title="Delete Product"
                    >
                      {deleteLoading === product._id ? (
                        <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                      ) : (
                        <RiDeleteBin6Line size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='text-center mt-8'>
          <button
            onClick={fetchProducts}
            disabled={loading}
            className='bg-slate-800 text-white px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-700 transition-colors shadow-sm'
          >
            {loading ? 'Refreshing...' : 'Refresh Products'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lists;