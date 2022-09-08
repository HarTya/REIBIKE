require('dotenv').config();

module.exports = {
    pageExtensions: ['tsx', 'ts'],
    env: {
        API_URL: process.env.API_URL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        CLOUDINARY_PRESET_NAME: process.env.CLOUDINARY_PRESET_NAME,
        CLOUDINARY_REQ_URL: process.env.CLOUDINARY_REQ_URL,
        CLOUDINARY_RES_URL: process.env.CLOUDINARY_RES_URL
    }
}