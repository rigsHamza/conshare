// productRequestModel.js
const db = require('../config/dbConfig');

class ProductRequest {
    static createProductRequest(userId, productName, description, picture) {
        const createdAt = new Date();
      

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO custom_product_request (user_id, product_name, description, picture, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, productName, description, picture, 'Pending', createdAt],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
       

                });
        });
    }

    static getProductRequestsByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM custom_product_request WHERE user_id = ?', [userId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    static getAllProductRequests() {
        console.log('getAllProductRequests called')
        return new Promise((resolve, reject) => {
            db.query('SELECT custom_product_request.*, users.username AS user_username FROM custom_product_request INNER JOIN users ON custom_product_request.user_id = users.id', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    static getProductRequestById(requestId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM custom_product_request WHERE id = ?', [requestId], (error, results) => {
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

    static updateProductRequestStatus(requestId, status) {
        const updatedAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('UPDATE custom_product_request SET status = ?, updated_at = ? WHERE id = ?',
                [status, updatedAt, requestId],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.affectedRows > 0);
                });
        });
    }
}

module.exports = ProductRequest;
