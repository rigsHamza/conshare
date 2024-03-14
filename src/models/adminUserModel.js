const db = require('../config/dbConfig');

exports.getUserByEmail = async (email) => {
    try {
        const query = 'SELECT * FROM admin_users WHERE email = ?';
        
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
exports.getAllApprovedUsers = async () => {
    try {
        const query = 'SELECT * FROM admin_users WHERE verified = 1 AND role = "Admin"';
        
        return new Promise((resolve, reject) => {
            // Execute the query
            db.query(query, (err, res) => {
                if (err) {
                    console.error('Error fetching approved users:', err);
                    return reject(err); // Reject the promise with the error
                }
                
                // Return all rows found
                resolve(res);
            });
        });
    } catch (error) {
        console.error('Error fetching approved users:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
exports.requestedUsers = async () => {
    try {
        const query = 'SELECT * FROM admin_users WHERE verified = 0 AND role = "Admin"';
        
        return new Promise((resolve, reject) => {
            // Execute the query
            db.query(query, (err, res) => {
                if (err) {
                    console.error('Error fetching requested users:', err);
                    return reject(err); // Reject the promise with the error
                }
                
                // Return all rows found
                resolve(res);
            });
        });
    } catch (error) {
        console.error('Error fetching requested users:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
exports.verifyUserByOwner = async (id) => {
    try {
        const query = 'UPDATE admin_users SET verified = 1 WHERE id = ?';
        const query2 = 'SELECT email FROM admin_users WHERE id = ?';

        return new Promise((resolve, reject) => {
            // Execute the update query
            db.query(query, [id], async (err, result) => {
                if (err) {
                    console.error('Error updating user verification:', err);
                    return reject(err); // Reject the promise with the error
                }

                // Check if any rows are affected
                if (result.affectedRows === 0) {
                    // If no rows are affected, throw an error
                    const error = new Error('User not found');
                    error.statusCode = 404;
                    return reject(error);
                }

                // Execute the query to get the user's email
                db.query(query2, [id], (err, emailResult) => {
                    if (err) {
                        console.error('Error fetching user email:', err);
                        return reject(err);
                    }

                    if (emailResult.length === 0) {
                        // If no email found for the user, throw an error
                        const error = new Error('User email not found');
                        error.statusCode = 404;
                        return reject(error);
                    }

                    const email = emailResult[0].email;

                    // Return the result of the update operation along with the user's email
                    resolve({ result, email });
                });
            });
        });
    } catch (error) {
        console.error('Error updating user verification:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

exports.DeleteUserByOwner = async (id) => {
    try {
        const query = 'DELETE FROM admin_users WHERE id = ?';
        
        return new Promise((resolve, reject) => {
            // Execute the query
            db.query(query, [id], (err, result) => {
                if (err) {
                    console.error('Error deleting user:', err);
                    return reject(err); // Reject the promise with the error
                }

                // Check if any rows are affected
                if (result.affectedRows === 0) {
                    // If no rows are affected, throw an error
                    const error = new Error('User not found');
                    error.statusCode = 404;
                    return reject(error);
                }

                // Return the result of the delete operation
                resolve(result);
            });
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};




exports.createAdminUser = async (email, username, password, verificationToken) => {
    try {
        const query = 'INSERT INTO admin_users (email, username, password, picture, verification_token, verified, Role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const result = await db.query(query, [email, username, password, '', verificationToken, false, 'Admin']);
        return { id: result.insertId, email, username, role:'Admin' };
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// exports.updateUserById = async (userId, email, username, picture) => {
//     return new Promise((resolve, reject) => {
//         // Check if the user exists before updating
//         const checkUserQuery = 'SELECT * FROM admin_users WHERE id = ?';
//         db.query(checkUserQuery, [userId], (err, res) => {
//             if (err) {
//                 console.error('Error checking user:', err);
//                 reject(err); // Reject the promise if there's an error with the query
//                 return;
//             }
//             if (res.length === 0) {
//                 reject(new Error('User not found')); // Reject the promise if no user exists
//                 return;
//             }
//             // Update the user if found
//             const updateUserQuery = 'UPDATE admin_users SET email = ?, username = ?, picture = ? WHERE id = ?';
//             db.query(updateUserQuery, [email, username, picture, userId], (err, result) => {
//                 if (err) {
//                     console.error('Error updating user:', err);
//                     reject(err); // Reject the promise if there's an issue with the update query
//                     return;
//                 }
//                 console.log('User updated successfully');
//                 resolve({ id: userId, email, username, picture }); // Resolve the promise with updated user information
//             });
//         });
//     });
// };

exports.updateUserById = async (userId, email, username, picture) => {
    return new Promise((resolve, reject) => {
        // Check if the user exists before updating
        const checkUserQuery = 'SELECT * FROM admin_users WHERE id = ?';
        db.query(checkUserQuery, [userId], (err, res) => {
            if (err) {
                console.error('Error checking user:', err);
                reject(err); // Reject the promise if there's an error with the query
                return;
            }
            if (res.length === 0) {
                reject(new Error('User not found')); // Reject the promise if no user exists
                return;
            }
            // Construct the query parameters
            const queryParams = [email, username];
            let updateUserQuery = 'UPDATE admin_users SET email = ?, username = ?';

            // Include picture if provided
            if (picture) {
                updateUserQuery += ', picture = ?';
                queryParams.push(picture);
            }
            
            updateUserQuery += ' WHERE id = ?';
            queryParams.push(userId);

            // Update the user
            db.query(updateUserQuery, queryParams, (err, result) => {
                if (err) {
                    console.error('Error updating user:', err);
                    reject(err); // Reject the promise if there's an issue with the update query
                    return;
                }
                console.log('User updated successfully');
                resolve({ id: userId, email, username, picture }); // Resolve the promise with updated user information
            });
        });
    });
};

exports.checkPassword = async (userId, oldPassword) => {
    return new Promise((resolve, reject) => {
        // Retrieve the user's password from the database
        const getPasswordQuery = 'SELECT password FROM admin_users WHERE id = ?';
        db.query(getPasswordQuery, [userId], (err, result) => {
            if (err) {
                console.error('Error retrieving password:', err);
                reject(err);
                return;
            }

            if (result.length === 0) {
                reject(new Error('User not found'));
                return;
            }

            // Compare the old password with the hashed password
            const hashedPassword = result[0].password;
            resolve(hashedPassword === oldPassword);
        });
    });
};


// Function to update the password by userId
exports.updatePasswordById = async (userId, newPassword) => {
    // Hash the new password

    // Update the password in the database
    const updatePasswordQuery = 'UPDATE admin_users SET password = ? WHERE id = ?';
    await db.query(updatePasswordQuery, [newPassword, userId]);
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