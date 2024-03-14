// models/spaceQuotaModel.js

const db = require('../config/dbConfig');

class SpaceQuota {
    static getUserSpaceQuota(userId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user_space_quota WHERE user_id = ?', [userId], (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
    
                resolve(result[0]);
            });
        });
    }

    // static async updateUserSpaceQuota(userId, bookedSpace, containerId) {
    //     try {
    //         const existingSpaceQuota = await this.getUserSpaceQuota(userId);
    //         if (!existingSpaceQuota) {
    //             await db.query('INSERT INTO user_space_quota (user_id, booked_space, container_id) VALUES (?, ?, ?)', [userId, bookedSpace, containerId]);
    //         } else {
    //             await db.query('UPDATE user_space_quota SET booked_space = ? WHERE user_id = ? && container_id = ?' , [bookedSpace, userId, containerId]);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    static updateUserSpaceQuota(userId, bookedSpace, containerId) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user_space_quota WHERE user_id = ? AND container_id = ?', [userId, containerId], async (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
    
                try {
                    if (result.length === 0) {
                        await db.query('INSERT INTO user_space_quota (user_id, booked_space, container_id) VALUES (?, ?, ?)', [userId, bookedSpace, containerId]);
                    } else {
                        await db.query('UPDATE user_space_quota SET booked_space = ? WHERE user_id = ? AND container_id = ?', [bookedSpace, userId, containerId]);
                    }
                    resolve(true); // Resolve with true to indicate success
                } catch (error) {
                    reject(error);
                }
            });
        });
    }
    
}

module.exports = SpaceQuota;
