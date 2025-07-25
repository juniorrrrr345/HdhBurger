// Configuration MongoDB robuste pour production et développement
export const getMongoDBURI = () => {
  // Priorité 1 : Variable d'environnement (Vercel, local)
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  // Priorité 2 : Configuration directe pour éviter les problèmes de déploiement
  const PRODUCTION_URI = 'mongodb+srv://Junior:Junior50@hshburgeer.59w7g4q.mongodb.net/hashburger?retryWrites=true&w=majority&appName=HshBurgeer';
  
  // Priorité 3 : URI locale de développement
  const LOCAL_URI = 'mongodb://localhost:27017/hashburger';
  
  // En production (Vercel), utiliser l'URI de production
  if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
    console.log('🌐 Mode production détecté - Utilisation MongoDB Atlas');
    return PRODUCTION_URI;
  }
  
  // En développement local, essayer MongoDB local puis Atlas
  console.log('🔧 Mode développement - Tentative MongoDB local puis Atlas');
  return LOCAL_URI;
};

// Configuration de connexion optimisée
export const getMongoDBOptions = () => ({
  bufferCommands: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: 'majority'
});

// Test de connectivité
export const testConnection = async () => {
  try {
    const uri = getMongoDBURI();
    console.log('🔍 Test de connexion MongoDB...');
    console.log('📡 URI utilisée:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')); // Masquer les credentials
    return true;
  } catch (error) {
    console.error('❌ Erreur de test de connexion:', error);
    return false;
  }
};