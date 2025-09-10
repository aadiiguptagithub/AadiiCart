import React from 'react'

function Invoice({ order, onClose }) {
  if (!order) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Invoice</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">Invoice #{order._id.slice(-8)}</h3>
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Bill To:</h4>
            <p>{order.address.firstName} {order.address.lastName}</p>
            <p>{order.address.street}</p>
            <p>{order.address.city}, {order.address.state} {order.address.pincode}</p>
            <p>Email: {order.address.email}</p>
            <p>Phone: {order.address.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Order Details:</h4>
            <p>Order ID: {order._id}</p>
            <p>Payment Method: {order.paymentMethod}</p>
            <p>Status: {order.payment ? 'Paid' : 'Pending'}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-4">Items:</h4>
          <div className="border rounded">
            <div className="bg-gray-50 px-4 py-2 font-semibold grid grid-cols-4 gap-4">
              <span>Item</span>
              <span>Size</span>
              <span>Quantity</span>
              <span>Price</span>
            </div>
            {Object.entries(order.items).map(([itemId, sizes]) =>
              Object.entries(sizes).map(([size, quantity]) => {
                const qty = typeof quantity === 'object' ? Object.values(quantity)[0] || 1 : quantity;
                return (
                  <div key={`${itemId}-${size}`} className="px-4 py-2 border-t grid grid-cols-4 gap-4">
                    <span>Item #{itemId.slice(-8)}</span>
                    <span>{size}</span>
                    <span>{qty}</span>
                    <span>₹{(qty * 1000).toFixed(2)}</span>
                  </div>
                );
              })
            ).flat()}
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="text-right">
            <p className="text-xl font-bold">Total: ₹{order.amount}</p>
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print Invoice
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice