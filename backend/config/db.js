import dns from 'dns';
import mongoose from 'mongoose';

// Fix SRV lookup for mongodb+srv:// if default system resolver fails
try {
  const currentServers = dns.getServers();
  dns.setServers([...currentServers, '8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore in environments where setServers is restricted
}

// Cache the connection promise so Vercel serverless re-invocations
// don't open a new connection every time.
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

const connectDB = async () => {
  // Already connected — reuse
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // Connection in progress — wait for it
  if (cached.promise) {
    cached.conn = await cached.promise;
    return cached.conn;
  }

  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error(
      'MongoDB connection string is missing. Set MONGO_URI or MONGODB_URI.'
    );
  }

  mongoose.set('strictQuery', false);

  cached.promise = mongoose
    .connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    })
    .then((m) => {
      console.log(`MongoDB Connected: ${m.connection.host}`);
      return m;
    })
    .catch((error) => {
      // Reset so the next invocation retries instead of hanging on
      // a rejected promise forever.
      cached.promise = null;
      console.error(`MongoDB Connection Error: ${error.message}`);
      // Only exit in local dev — serverless must NOT call process.exit()
      if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
      }
      throw error;
    });

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;

