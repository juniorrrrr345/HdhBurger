import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
cloudinary.config({
  cloud_name: 'ddccdadjk',
  api_key: '825672258887667',
  api_secret: 'JDcBEeQ5vK8Dvh9r3RAynrZITvY',
  secure: true,
});

export default cloudinary;