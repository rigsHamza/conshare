const db = require('../config/dbConfig');

class Category {
    static createCategory(name, picturePath) { // Adjust the parameters
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO category (name, picture) VALUES (?, ?)', // Correct table name
                [name, picturePath], // Pass the picture path
                (error, results) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results.insertId);
                });
        });
    }

    static getAllCategories() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM category', (error, results) => { // Correct table name
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    static getCategoryById(categoryId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM category WHERE id = ?', [categoryId], (error, results) => { // Correct table name
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

    static deleteCategoryById(categoryId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM category WHERE id = ?', [categoryId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.affectedRows === 0) {
                    resolve(null); // Indicates no category was deleted (not found)
                    return;
                }
                resolve(results); // Indicates successful deletion
            });
        });
    }
    
    static deleteProductsByCategoryId(categoryId) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM products WHERE category_id = ?', [categoryId], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results); // Indicates successful deletion
            });
        });
    }
    
    // Additional methods like updateCategory, deleteCategory can be added similarly
}

module.exports = Category;
