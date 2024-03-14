const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const cloudinary = require('../config/cloudinarConfig');

const sendVerificationEmail = async (email, token) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hamzahayat1888@gmail.com',
            pass: 'kpxwrlcnzimiorps',
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Your App" <yourEmail@gmail.com>',
        to: email,
        subject: 'Account Verification',
        text: 'Click the link below to verify your account:',
        html: `<a href="https://backend-ecomerce-gordon-29gl.vercel.app/api/user/verify/${token}">Verify Account</a>`,
    });

    console.log('Message sent: %s', info.messageId);
};
const sendPasswordEmail = async (email, pass) => {
    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hamzahayat1888@gmail.com',
            pass: 'kpxwrlcnzimiorps',
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Your App" <yourEmail@gmail.com>',
        to: email,
        subject: 'Your Password',
        text: 'Your Password is : ',
        html: `${pass}`,
    });

    console.log('Message sent: %s', info.messageId);
};

// exports.signup = async (req, res) => {
//     try {
//         const { email, username, password, confirmPassword } = req.body;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "Passwords do not match" });
//         }

//         // Check if user with the same email already exists
//         const existingUser = await userModel.getUserByEmail(email);
//         if (existingUser) {
//             return res.status(400).json({ error: "User with this email already exists" });
//         }

//         // Create new user
//         const newUser = await userModel.createUser(email, username, password);
//         const token = jwt.sign({ userId: newUser._id }, 'process.env.JWT_SECRET', { expiresIn: '1h' });

//         // Send verification email
//         await sendVerificationEmail(email, token);
//         res.status(201).json({ message: "User signed up successfully", user: newUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };
exports.signup = async (req, res) => {
    try {
        const { email, username, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        // Check if user with the same email already exists
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Generate verification token
        const verificationToken = jwt.sign({ email }, 'process.env.JWT_VERIFICATION_SECRET', { expiresIn: '1h' });

        // Create new user with verification token
        const newUser = await userModel.createUser(email, username, password, verificationToken);

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: "User signed up successfully", user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// exports.signin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if the user with the provided email exists
//         const user = await userModel.getUserByEmail(email);
//         console.log('user with email', user)
//         if (!user) {
//             return res.status(401).json({ error: "User not found" });
//         }

//         // Check if the password is correct
//         if (password !== user.password) {
//             return res.status(401).json({ error: "Invalid password" });
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET', { expiresIn: '1h' });

//         // Send the token in the response
//         res.status(200).json({ message: "Sign in successfull", token, userId: user.id, name: user.username, email: user.email, picture:user.picture  });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user with the provided email exists
        const user = await userModel.getUserByEmail(email);
        console.log('user with email', user)
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Check if the user is verified
        if (!user.verified) {
            return res.status(401).json({ error: "User is not verified" });
        }

        // Check if the password is correct
        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'process.env.JWT_SECRET', { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ message: "Sign in successful", token, userId: user.id, name: user.username, email: user.email, picture: user.picture });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { email, username, password } = req.body;
    const picturePath = req.file.filename;
    const result = await cloudinary.uploader.upload(req.file.path);
    
    try {
        const updatedUser = await userModel.updateUserById(id, email, username, result.url);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user.' });
    }
};

exports.verifyUserByToken = async (req, res) => {
    const { token } = req.params;

    try {
        await userModel.verifyUserByToken(token);
        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify user' });
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if user with the same email already exists
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            await sendPasswordEmail(email, existingUser.password);
            res.status(201).json({ message: "Email Sent With your Password",});
        } else {
            res.status(201).json({ message: "Email Does not exist",});

        }

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.GetAllUsers = async (req, res) => {
    try {
        const shippings = await userModel.GetAllUsers();
        res.json(shippings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};