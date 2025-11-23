import fp from 'fastify-plugin';
import cryptoJS from 'crypto-js';
import { HOUR, DAY } from '../utils/timeConstants.js';

// --- Configuration ---
// Define which routes should have browser caching (Cache-Control) enabled.
// The value is the max-age in seconds.
// Set to 0 or remove to disable browser caching for a route (ETag will still work).
const CACHE_CONFIG = {
  // '/api/habits': (1 * HOUR) / 1000, // 1 hour
  // '/api/categories': (1 * DAY) / 1000, // 24 hours
  // Add other routes here as needed
};

// Global variable to store ETags for each URL
// Key: URL (string), Value: ETag (string)
const etagCache = new Map();

async function httpCachePlugin(fastify, options) {
  
  // 1. Validation Hook (onRequest)
  // Checks if the client sent an ETag that matches what we have in memory.
  fastify.addHook('onRequest', async (request, reply) => {
    // We only care about GET requests
    if (request.method !== 'GET') {
      return;
    }

    // Check if we have an ETag stored for this URL
    const storedEtag = etagCache.get(request.url);

    if (storedEtag) {
      // If the client sent an If-None-Match header
      const ifNoneMatch = request.headers['if-none-match'];

      // If the client's ETag matches our stored ETag
      if (ifNoneMatch === storedEtag) {
        // Return 304 Not Modified immediately
        // This skips the database query entirely!
        reply.code(304).send();
        return reply;
      }
    }
  });

  // 2. Generation Hook (onSend)
  // Generates ETag for new responses and saves it to memory.
  fastify.addHook('onSend', async (request, reply, payload) => {
    // We only care about successful GET requests with a payload
    if (request.method !== 'GET' || reply.statusCode !== 200 || !payload) {
      return payload;
    }

    // Generate ETag from the payload
    // Note: payload is usually a string at this point
    const etag = `"${cryptoJS.MD5(payload).toString()}"`;

    // Save to our memory cache
    etagCache.set(request.url, etag);

    // Set the ETag header
    reply.header('ETag', etag);

    // Check if we should add Cache-Control for this route
    // We check if the URL starts with any of the configured keys
    // This allows matching /api/habits?foo=bar if config is /api/habits
    // But for strict matching, we can use exact match or regex. 
    // Let's stick to simple exact match or startsWith for now based on the user's previous code.
    // Ideally, we match the base path.
    
    const configKey = Object.keys(CACHE_CONFIG).find(key => request.url.startsWith(key));
    
    if (configKey) {
      const maxAge = CACHE_CONFIG[configKey];
      if (maxAge > 0) {
        // public: can be cached by shared caches (CDNs, proxies)
        // max-age: how long in seconds
        reply.header('Cache-Control', `public, max-age=${maxAge}`);
      } else {
        // no-cache: must validate with server (ETag) before using cached copy
        reply.header('Cache-Control', 'no-cache');
      }
    } else {
      // Default behavior: force validation
      reply.header('Cache-Control', 'no-cache');
    }

    return payload;
  });

  // 3. Invalidation Hook (onResponse)
  // Clears the cache if data is modified.
  fastify.addHook('onResponse', async (request, reply) => {
    // If a write operation was successful
    if (['POST', 'PUT', 'DELETE'].includes(request.method) && reply.statusCode < 400) {
      // Clear the entire cache to ensure consistency
      // In a larger app, we would clear only specific keys, but for now this is safer and simpler.
      etagCache.clear();
      request.log.info('Cache cleared due to write operation');
    }
  });
}

export default fp(httpCachePlugin);
