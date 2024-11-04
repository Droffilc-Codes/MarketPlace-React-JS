import { getClient } from "../Config/mail.config.js"

export const sendEmailReceipt = function(order){
    const mailClient = getClient()
    mailClient.messages.create('sandbox56deb6fa00ef48749923f0a3caa93115.mailgun.org',{
        from: 'orders@colifmart.com',
        to: order.user.email,
        subject: `We are processing your Order with ID: ${order.id}`,
        html: getReceiptHtml(order)
        }
    ).then(msg => console.log(msg)) // success
    .catch(err => console.log(err))// fail
}
// Stopped here
const getReceiptHtml = function (order){
    return `
    <html>
        <head>
            <style>
            table {
                border-collapse: collapse;
                max-width: 35rem;
                width: 100%;
            }
            th, td{
                text-align: left;
                padding: 8px;
            }
            th {
                border-bottom: 1px solid #dddddd;
            }
            </style>
        </head>
        <body>
            <h1>Order Payment Confirmation</h1>
            <p>Dear ${order.name},</p>
            <p>Thank you for choosing Colif Mart! Your Order has been successfully Paid and is now being processed.</p>
            <p><strong>Tracking ID: </strong>${order.id}</p>
            <p><strong>Order Date: </strong> ${order.createdAt
                .toISOString()
                .replace('T', ' ')
                .substr(0, 16)}     
            </p>
            <h2>Order details</h2>
            <table>
            <thead>
            <tr>
            <th>Item</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
                ${order.items.map(
                    item => 
                    `
                    <tr>
                    <td>${item.grocery.name}</td>
                    <td>${item.grocery.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price.toFixed(2)}</td>
                    </tr>
                    
                    `
                )
                .join(`\n`) }
            </tbody>
            <tfoot>
            <tr>
            <td colspan="3"><strong>subtotal</strong></td>
            <td>₦${order.subTotal}</td>
            </tr>
            <tr>
            <td colspan="3"><strong>Delivery fee</strong></td>
            <td>₦${order.delivery}</td>
            </tr>
            <tr>
            <td colspan="3"><strong>Total</strong></td>
            <td>₦${order.totalPrice}</td>
            </tr>
            </tfoot>
            </table>
            <p><strong>Shipping Address: ${order.address}</strong></p>
        </body>
    </html>
    `
}