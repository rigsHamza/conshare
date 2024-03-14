const db = require('../config/dbConfig');

class Shipping {
    // static createShipping(userId, address, city, country) {
    //     const createdAt = new Date();
    //     return new Promise((resolve, reject) => {
    //         db.query('INSERT INTO shippings (user_id, address, city, country, created_at) VALUES (?, ?, ?, ?, ?)',
    //             [userId, address, city, country, createdAt],
    //             (error, results) => {
    //                 if (error) {
    //                     reject(error);
    //                     return;
    //                 }
    //                 resolve(results.insertId);
    //             });
    //     });
    // }
    static createShipping(userId, fullName, address, email, zipcode, country, companyName, phoneNumber) {
        const createdAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO shippings (user_id, full_name, address, email, zipcode, country, company_name, phone_number, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [userId, fullName, address, email, zipcode, country, companyName, phoneNumber, createdAt],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                });
        });
    }
    
    static updateShipping(shippingId, address, city, country) {
        const updatedAt = new Date();
        return new Promise((resolve, reject) => {
            db.query('UPDATE shippings SET address = ?, city = ?, country = ?, updated_at = ? WHERE id = ?',
                [address, city, country, updatedAt, shippingId],
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.affectedRows > 0);
                });
        });
    }

    static getShippingByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM shippings WHERE user_id = ?', [userId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }
}

module.exports = Shipping;
