export const generateSimpleInvoice = (order) => {
    const invoiceData = {
        invoiceId: `INV-${order._id.slice(-8)}`,
        date: new Date().toLocaleDateString(),
        customer: {
            name: `${order.address.firstName} ${order.address.lastName}`,
            email: order.address.email,
            phone: order.address.phone,
            address: `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.pincode}`
        },
        items: order.items,
        total: order.amount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.payment ? 'Paid' : 'Pending'
    };
    
    return invoiceData;
};