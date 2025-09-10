import React from 'react'
import { FaExchangeAlt, FaUndo, FaHeadset } from 'react-icons/fa'

function OurPolicy() {
  const policies = [
    {
      icon: <FaExchangeAlt className="text-4xl text-slate-300 mb-4" />,
      title: "Easy Exchange Policy",
      description: "Exchange Made Easy – Quick, Simple, and Customer-Friendly Process."
    },
    {
      icon: <FaUndo className="text-4xl text-slate-300 mb-4" />,
      title: "7 Days Return Policy",
      description: "Shop with Confidence – 7 Days Easy Return Guarantee."
    },
    {
      icon: <FaHeadset className="text-4xl text-slate-300 mb-4" />,
      title: "Best Customer Support",
      description: "Trusted Customer Support – Your Satisfaction Is Our Priority."
    }
  ]

  return (
    <section className="py-16 lg:py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            OUR POLICY
          </h2>
          <p className="text-slate-300 text-lg">
            Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {policy.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">
                {policy.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy