import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Configuration MongoDB directe - URI confirmée fonctionnelle
  const MONGODB_URI = process.env.MONGODB_URI || 
    'mongodb+srv://Junior:Junior50@hshburgeer.59w7g4q.mongodb.net/hashburger?retryWrites=true&w=majority&appName=HshBurgeer';

  console.log('🔗 Connexion MongoDB avec URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));

  if (!MONGODB_URI) {
    throw new Error('⚠️ Impossible de se connecter à MongoDB');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;