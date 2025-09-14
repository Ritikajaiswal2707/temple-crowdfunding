export default async function handler(req, res) {
  res.status(200).json({
    mongoUriExists: !!process.env.MONGODB_URI,
    mongoUriLength: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
    mongoUriStart: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 25) + '...' : 'not found',
    nodeEnv: process.env.NODE_ENV
  });
}
