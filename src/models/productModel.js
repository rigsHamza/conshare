// productModel.js
const db = require('../config/dbConfig');

class Product {
    static getAllProducts() {
        return new Promise((resolve, reject) => {
            db.query('SELECT products.*,category.name AS category_name, admin_users.username AS owner_name FROM products INNER JOIN category ON products.category_id = category.id LEFT JOIN admin_users ON products.owner_id = admin_users.id;', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    // static getAllProducts() {
    //     return new Promise((resolve, reject) => {
    //         db.query('SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.category_id = category.id', (error, results) => {
    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }
    //             resolve(results);
    //         });
    //     });
    // }
    static getProductsByOwnerId(ownerId) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT products.*, category.name AS category_name FROM products INNER JOIN category ON products.category_id = category.id WHERE owner_id = ${ownerId}`, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    static getProductById(productId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length === 0) {
                    resolve(null);
                    return;
                }
                resolve(results[0]);
            });
        });
    }

    static createProduct(name, description, price, categoryId, picture, container_space, rating, reviews,ownerId) {
        console.log('sp', container_space)
        const createdAt = new Date();
        const updatedAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO products (name, description, price, category_id, picture, container_space, rating, reviews, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?,?)',
                [name, description, price, categoryId,picture,container_space,rating, reviews, ownerId, createdAt, updatedAt],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                });
        });
    }

    static updateProduct(productId, name, description, price, categoryId, picture , container_space, rating, reviews) {
        const updatedAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, picture = ?, container_space= ?, rating = ? , reviews = ? , updated_at = ? WHERE id = ?',
                [name, description, price, categoryId, picture, container_space,rating, reviews, updatedAt, productId],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.affectedRows > 0);
                });
        });
    }

    static deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.affectedRows > 0);
            });
        });
    }
    static deleteProduct(productId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results.affectedRows > 0);
            });
        });
    }
    static getProductsByCategoryId(categoryId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM products WHERE category_id = ?', [categoryId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    static getProductsByOrderId(orderId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM order_products WHERE order_id = ?', [orderId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
    
}

module.exports = Product;
