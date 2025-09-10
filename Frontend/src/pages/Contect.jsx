import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast, { Toaster } from 'react-hot-toast'
import { authDataContext } from '../contex/AuthContex.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import { FaUser, FaEnvelope, FaComment, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaBriefcase } from 'react-icons/fa'

// Zod validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be less than 500 characters')
})

function Contect() {
  const { serverUrl, userData } = useContext(authDataContext)
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, setValue } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (userData) {
      setValue('name', userData.name || '')
      setValue('email', userData.email || '')
    }
  }, [userData, setValue])

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${serverUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success(result.message || 'Message sent successfully! We\'ll get back to you soon.')
        reset()
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.')
      }
    } catch (err) {
      toast.error('Network error. Please check your connection and try again.')
    }
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#374151',
            color: '#fff',
            border: '1px solid #4B5563'
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff'
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wider mb-4">
              CONTACT US
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get in touch with us. We'd love to hear from you and help with any questions.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Send us a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div className="group">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        {...register('name')}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white px-12 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="group">
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white px-12 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div className="group">
                    <div className="relative">
                      <FaComment className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                      <input
                        {...register('subject')}
                        type="text"
                        placeholder="Subject"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white px-12 py-3 sm:py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500"
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="group">
                    <div className="relative">
                      <FaComment className="absolute left-4 top-4 text-gray-400 text-sm" />
                      <textarea
                        {...register('message')}
                        rows={5}
                        placeholder="Your Message"
                        className="w-full bg-gray-700/50 border border-gray-600 text-white px-12 py-4 rounded-xl placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 group-hover:border-gray-500 resize-none"
                      />
                    </div>
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-2 ml-2">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Our Store */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-3 rounded-xl">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Our Store</h3>
                </div>
                <div className="text-gray-300 space-y-3 ml-16">
                  <p className="text-lg">Sector 62 </p>
                  <p className="text-lg">Noida, Uttar Pradesh, India</p>
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-teal-400" />
                      <span>+91-6306399253</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-teal-400" />
                      <span>admin@aadiicart.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Careers */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-3 rounded-xl">
                    <FaBriefcase className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Careers at AadiiCart</h3>
                </div>
                <div className="ml-16">
                  <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                    Join our team and be part of something amazing. We're always looking for talented individuals.
                  </p>
                  <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                    Explore Jobs
                  </button>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Business Hours</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-teal-400 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-teal-400 font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-red-400 font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <NewLetterBox />
    </>
  )
}

export default Contect
