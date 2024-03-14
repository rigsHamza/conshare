const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dqkxqfag8', 
    api_key: '217785686632551', 
    api_secret: 'f7BSL9vVelXldF0TmYwXZkaOYkY' 
  });

module.exports = cloudinary;
