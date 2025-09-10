import React, { useState, useContext } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { FiX, FiPackage } from 'react-icons/fi';
import axios from 'axios';
import { authDataContext } from '../context/AuthContex.jsx';
import toast, { Toaster } from 'react-hot-toast';

function Add() {
  const { serverUrl } = useContext(authDataContext);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    subcategory: 'Topwear',
    bestseller: false
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const categories = [
    { value: 'Men', subcategories: ['Topwear', 'Bottomwear', 'Winterwear'] },
    { value: 'Women', subcategories: ['Topwear', 'Bottomwear', 'Winterwear'] },
    { value: 'Kids', subcategories: ['Topwear', 'Bottomwear', 'Winterwear'] }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: newCategory,
      subcategory: categories.find(cat => cat.value === newCategory)?.subcategories[0] || ''
    }));
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleImageChange = (index, file) => {
    if (file && file.type.startsWith('image/')) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (selectedSizes.length === 0) newErrors.sizes = 'At least one size must be selected';
    if (!images.some(img => img !== null)) newErrors.images = 'At least one image is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('subcategory', formData.subcategory);
      formDataToSend.append('size', JSON.stringify(selectedSizes));
      formDataToSend.append('bestseller', formData.bestseller);

      images.forEach((image, index) => {
        if (image) {
          formDataToSend.append(`image${index + 1}`, image);
        } else {
          const placeholder = new File([''], 'placeholder.jpg', { type: 'image/jpeg' });
          formDataToSend.append(`image${index + 1}`, placeholder);
        }
      });

      const response = await axios.post(
        `${serverUrl}/api/product/addproduct`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        toast.success('Product added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'Men',
          subcategory: 'Topwear',
          bestseller: false
        });
        setSelectedSizes([]);
        setImages([null, null, null, null]);
        setErrors({});
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 pt-[90px] p-4 md:p-8'>
      <Toaster position="top-right" />
      <div className='max-w-5xl mx-auto'>
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center mb-4'>
            <FiPackage className='text-teal-500 text-4xl mr-3' />
            {/* <h1 className='text-3xl md:text-4xl font-bold text-white'>Add New Product</h1> */}
          </div>
          {/* <p className='text-gray-400'>Create and manage your product inventory</p> */}
        </div>

        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
            <div className='flex items-center mb-6'>
              <IoCloudUploadOutline className='text-teal-500 text-2xl mr-3' />
              <h2 className='text-white text-xl font-semibold'>Upload Product Images</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {images.map((image, index) => (
                <div key={index} className='relative group'>
                  <div className='w-full h-32 md:h-40 border-2 border-dashed border-slate-600 rounded-xl flex items-center justify-center bg-slate-700 hover:bg-slate-600 hover:border-teal-500 transition-all duration-300 cursor-pointer'>
                    {image ? (
                      <div className='relative w-full h-full'>
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className='w-full h-full object-cover rounded-xl'
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-colors'
                        >
                          <FiX size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className='cursor-pointer flex flex-col items-center text-gray-400 hover:text-teal-500 transition-colors'>
                        <IoCloudUploadOutline size={28} />
                        <span className='text-sm mt-2 font-medium'>Upload Image</span>
                        <span className='text-xs text-gray-500 mt-1'>PNG, JPG up to 10MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e.target.files[0])}
                          className='hidden'
                        />
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.images && <p className='text-red-500 text-sm mt-3 flex items-center'><FiX className='mr-1' />{errors.images}</p>}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
              <label className='block text-white text-lg font-semibold mb-4'>Product Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Enter product name'
                className='w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
              />
              {errors.name && <p className='text-red-500 text-sm mt-2 flex items-center'><FiX className='mr-1' />{errors.name}</p>}
            </div>

            <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
              <label className='block text-white text-lg font-semibold mb-4'>Product Price</label>
              <div className='relative'>
                <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 font-medium'>₹</span>
                <input
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder='2000'
                  className='w-full p-4 pl-10 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
                />
              </div>
              {errors.price && <p className='text-red-500 text-sm mt-2 flex items-center'><FiX className='mr-1' />{errors.price}</p>}
            </div>
          </div>

          <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
            <label className='block text-white text-lg font-semibold mb-4'>Product Description</label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Describe your product features, materials, and benefits...'
              rows='5'
              className='w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all'
            />
            {errors.description && <p className='text-red-500 text-sm mt-2 flex items-center'><FiX className='mr-1' />{errors.description}</p>}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
              <label className='block text-white text-lg font-semibold mb-4'>Product Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleCategoryChange}
                className='w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.value}</option>
                ))}
              </select>
            </div>

            <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
              <label className='block text-white text-lg font-semibold mb-4'>Sub Category</label>
              <select
                name='subcategory'
                value={formData.subcategory}
                onChange={handleInputChange}
                className='w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all'
              >
                {categories.find(cat => cat.value === formData.category)?.subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
            <label className='block text-white text-lg font-semibold mb-4'>Available Sizes</label>
            <div className='flex flex-wrap gap-3'>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedSizes.includes(size)
                      ? 'bg-teal-600 text-white shadow-lg transform scale-105'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:shadow-md'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {errors.sizes && <p className='text-red-500 text-sm mt-3 flex items-center'><FiX className='mr-1' />{errors.sizes}</p>}
          </div>

          <div className='bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg border border-slate-700'>
            <label className='flex items-center space-x-4 cursor-pointer group'>
              <div className='relative'>
                <input
                  type='checkbox'
                  name='bestseller'
                  checked={formData.bestseller}
                  onChange={handleInputChange}
                  className='w-6 h-6 text-teal-600 bg-slate-700 border-slate-600 rounded focus:ring-teal-500 focus:ring-2 transition-all'
                />
              </div>
              <div>
                <span className='text-white text-lg font-semibold group-hover:text-teal-500 transition-colors'>Add to BestSeller</span>
                <p className='text-gray-400 text-sm'>Mark this product as a bestseller to feature it prominently</p>
              </div>
            </label>
          </div>

          <div className='pt-4'>
            <button
              type='submit'
              disabled={loading}
              className={`w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                  : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
              }`}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3'></div>
                  Adding Product...
                </div>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;