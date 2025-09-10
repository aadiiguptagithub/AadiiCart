import React, { useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { authDataContext } from '../contex/AuthContex.jsx'

function NewLetterBox() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { serverUrl } = useContext(authDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch(`${serverUrl}/api/contact/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        credentials: 'include'
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success(result.message)
        setEmail('')
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <section className="py-16 lg:py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
          Subscribe now & get 20% off
        </h2>
        <p className="text-slate-300 text-lg mb-8">
          Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-lg border border-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-slate-600 text-slate-100 rounded-lg hover:bg-slate-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
    </>
  )
}

export default NewLetterBox