import { v2 as cloudinary } from 'cloudinary';

// Configuration Cloudinary
const config = {
  cloud_name: 'ddccdadjk',
  api_key: '825672258887667',
  api_secret: 'JDcBEeQ5vK8Dvh9r3RAynrZITvY',
  secure: true,
};

console.log('🔧 Configuration Cloudinary chargée:', {
  cloud_name: config.cloud_name,
  api_key: config.api_key ? `${config.api_key.substring(0, 6)}...` : 'MANQUANT',
  api_secret: config.api_secret ? 'OK' : 'MANQUANT'
});

cloudinary.config(config);

export default cloudinary;