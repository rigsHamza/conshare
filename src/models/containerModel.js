// models/containerModel.js

const db = require('../config/dbConfig');

class Container {
    static getAvailableContainer() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM containers WHERE is_shipped = 0 LIMIT 1', (error, results) => {
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
    static getAllAvailableContainerAdmin() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM containers', (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    }

    static async createContainer(totalSpace) {
        try {
            await db.query('INSERT INTO containers (available_space, total_space) VALUES (?, ?)', [totalSpace, totalSpace]);
        } catch (error) {
            throw error;
        }
    }

    static async updateContainerSpace(containerId, usedSpace) {
        try {
            await db.query('UPDATE containers SET available_space = available_space - ? WHERE id = ?', [usedSpace, containerId]);
        } catch (error) {
            throw error;
        }
    }

    static async markContainerAsShipped(containerId) {
        try {
            const result = await db.query('UPDATE containers SET is_shipped = 1 WHERE id = ?', [containerId]);
            return result.affectedRows; // Return the number of affected rows
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Container;
