const db = require('../config/dbConfig');

exports.getUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        
        return new Promise((resolve, reject) => {
            // Execute the query
            db.query(query, [email], (err, res) => {
                if (err) {
                    console.error('Error fetching user by email:', err);
                    return reject(err); // Reject the promise with the error
                }
                
                // Return the first row found, or null if no rows were found
                resolve(res.length > 0 ? res[0] : null);
            });
        });
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};


exports.createUser = async (email, username, password, verificationToken) => {
    try {
        const query = 'INSERT INTO users (email, username, password, picture, verification_token, verified) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [email, username, password, '', verificationToken, false]);
        return { id: result.insertId, email, username };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
exports.updateUserById = async (userId, email, username, picture) => {
    try {
        const query = 'UPDATE users SET email = ?, username = ?, picture = ? WHERE id = ?';
        await db.query(query, [email, username, picture, userId]);
        return { id: userId, email, username , picture};
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
exports.GetAllUsers = async () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (error, results) => { // Correct table name
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};


exports.verifyUserByToken = (token) => {
    return new Promise((resolve, reject) => {
        try {
            const query = 'SELECT * FROM users WHERE verification_token = ?';
            db.query(query, [token], (err, res) => {
                if (err) {
                    console.error('Error verifying user by token:', err);
                    reject(err);
                } else {
                    // Check if user exists
                    if (res.length === 0) {
                        reject(new Error('Invalid token')); // Token does not exist in the database
                    } else {
                        // Update user's verification status
                        const updateQuery = 'UPDATE users SET verified = ? WHERE verification_token = ?';
                        db.query(updateQuery, [true, token], (err, result) => {
                            if (err) {
                                console.error('Error updating verification status:', err);
                                reject(err);
                            } else {
                                resolve({ message: 'User verified successfully' });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error verifying user by token:', error);
            reject(error);
        }
    });
};