const db = require('../config/dbConfig');

class Order {
    // static createOrder(user_id, products, total_amount, status) {
    //     const createdAt = new Date();
    //     return new Promise((resolve, reject) => {
    //         db.beginTransaction(async (error) => {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             try {
    //                 const orderQuery = 'INSERT INTO orders (user_id, total_amount, status, created_at) VALUES (?, ?, ?, ?)';
    //                 const orderResult = await db.query(orderQuery, [user_id, total_amount, status, createdAt]);
    //                 console.log('orderResult:', orderResult); 
    //                 const orderId = orderResult.insertId;
    //                 console.log('orderId:', orderId); 
    //                 const orderProductsQuery = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ?';
    //                 const orderProductsValues = products.map(product => [orderId, product.product_id, product.quantity]);
    //                 await db.query(orderProductsQuery, [orderProductsValues]);
    //                 db.commit((commitError) => {
    //                     if (commitError) {
    //                         reject(commitError);
    //                         return;
    //                     }
    //                     resolve(orderId);
    //                 });
    //             } catch (queryError) {
    //                 db.rollback(() => {
    //                     reject(queryError);
    //                 });
    //             }
    //         });
    //     });
    // }
    
    static createOrder(user_id, products, total_amount, status) {
        return new Promise((resolve, reject) => {
            const createdAt = new Date();
            const orderQuery = 'INSERT INTO orders (user_id, total_amount, status, created_at) VALUES (?, ?, ?, ?)';
            db.query(orderQuery, [user_id, total_amount, status, createdAt], (orderError, orderResult) => {
                if (orderError) {
                    reject(orderError);
                    return;
                }
                const orderId = orderResult.insertId;
                const orderProductsQuery = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ?';
                const orderProductsValues = products.map(product => [orderId, product.product_id, product.quantity]);
                db.query(orderProductsQuery, [orderProductsValues], (orderProductsError, orderProductsResult) => {
                    if (orderProductsError) {
                        reject(orderProductsError);
                        return;
                    }
                    resolve(orderId);
                });
            });
        });
    }
    
    static getOrdersByUserID(user_id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM orders WHERE user_id = ?';
            db.query(query, [user_id], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    
    static getOrderById(orderId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM orders WHERE id = ?';
            db.query(query, [orderId], (error, orderResults) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (orderResults.length === 0) {
                    resolve(null);
                    return;
                }
                const order = orderResults[0];
                const orderProductsQuery = 'SELECT * FROM order_products WHERE order_id = ?';
                db.query(orderProductsQuery, [orderId], (productError, productResults) => {
                    if (productError) {
                        reject(productError);
                        return;
                    }
                    const products = productResults.map(product => ({
                        product_id: product.product_id,
                        quantity: product.quantity
                    }));
                    order.products = products;
                    resolve(order);
                });
            });
        });
    }
    

    // static getAllOrders() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT * FROM orders', (error, results) => {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(results);
    //         });
    //     });
    // }
    // static getAllOrders() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT orders.id , orders.status, orders.total_amount, users.username, order_products.product_id, order_products.quantity, products.name,products.picture FROM orders LEFT JOIN users on orders.user_id = users.id LEFT JOIN order_products ON orders.id = order_products.order_id LEFT JOIN products on products.id = order_products.product_id;', (error, results) => {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             console.log(results, 'tt')
    //             resolve(results);
    //         });
    //     });
    // }
    // static getAllOrders() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT orders.id, orders.status, orders.total_amount, users.username, order_products.product_id, order_products.quantity, products.name, products.picture FROM orders LEFT JOIN users ON orders.user_id = users.id LEFT JOIN order_products ON orders.id = order_products.order_id LEFT JOIN products ON products.id = order_products.product_id;', (error, results) => {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
                
    //             // Create a map to group products by order ID
    //             const ordersMap = new Map();
                
    //             results.forEach(row => {
    //                 const orderId = row.id;
                    
    //                 // If order ID doesn't exist in the map, initialize it with an empty array
    //                 if (!ordersMap.has(orderId)) {
    //                     ordersMap.set(orderId, {
    //                         id: orderId,
    //                         status: row.status,
    //                         total_amount: row.total_amount,
    //                         username: row.username,
    //                         products: []
    //                     });
    //                 }
                    
    //                 // Push product details into the products array of the respective order
    //                 ordersMap.get(orderId).products.push({
    //                     product_id: row.product_id,
    //                     quantity: row.quantity,
    //                     name: row.name,
    //                     picture: row.picture
    //                 });
    //             });
                
    //             // Extract orders from the map
    //             const orders = Array.from(ordersMap.values());
                
    //             resolve(orders);
    //         });
    //     });
    // }
    static getAllOrders() {
        return new Promise((resolve, reject) => {
            db.query('SELECT orders.id, orders.status, orders.total_amount, users.username, order_products.product_id, order_products.quantity, products.name, products.picture, products.owner_id FROM orders LEFT JOIN users ON orders.user_id = users.id LEFT JOIN order_products ON orders.id = order_products.order_id LEFT JOIN products ON products.id = order_products.product_id;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                
                // Create a map to group products by order ID
                const ordersMap = new Map();
                
                results.forEach(row => {
                    const orderId = row.id;
                    
                    // If order ID doesn't exist in the map, initialize it with an empty array
                    if (!ordersMap.has(orderId)) {
                        ordersMap.set(orderId, {
                            id: orderId,
                            status: row.status,
                            total_amount: row.total_amount,
                            username: row.username,
                            products: []
                        });
                    }
                    
                    // Push product details into the products array of the respective order
                    ordersMap.get(orderId).products.push({
                        product_id: row.product_id,
                        quantity: row.quantity,
                        name: row.name,
                        picture: row.picture,
                        owner_id: row.owner_id
                    });
                });
                
                // Extract orders from the map
                const orders = Array.from(ordersMap.values());
                
                resolve(orders);
            });
        });
    }
    
    
    static updateOrderStatus(orderId, status) {
        const updatedAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('UPDATE orders SET status = ?, updated_at = ? WHERE id = ?',
                [status, updatedAt, orderId],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.affectedRows > 0);
                });
        });
    }

    static deleteOrder(orderId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM orders WHERE id = ?', [orderId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.affectedRows > 0);
            });
        });
    }
}

module.exports = Order;
