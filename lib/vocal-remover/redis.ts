import Redis from 'ioredis';

// Use a global to survive Next.js hot-reload without leaking connections.
const g = global as typeof globalThis & { _vrRedis?: Redis };

/**
 * Lazily creates (and caches) a single ioredis connection for job-store
 * operations (HSET / HGET / EXPIRE / DEL).
 */
export function getRedisClient(): Redis {
  if (g._vrRedis) return g._vrRedis;

  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  const client = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck:     false,
    lazyConnect:          false,
  });

  client.on('error', (err: Error) => {
    console.error('[vocal-remover] Redis error:', err.message);
  });

  g._vrRedis = client;
  return client;
}

/**
 * Returns a plain connection-options object suitable for passing to BullMQ
 * Queue / Worker constructors.  BullMQ calls .duplicate() internally and
 * manages its own connections, so we don't share the job-store client.
 */
export function getBullMQConnection(): {
  host: string;
  port: number;
  password?: string;
  db?: number;
} {
  const url = process.env.REDIS_URL || 'redis://localhost:6379';
  try {
    const u = new URL(url);
    return {
      host:     u.hostname || 'localhost',
      port:     parseInt(u.port || '6379', 10),
      password: u.password || undefined,
      db:       parseInt(u.pathname.replace('/', '') || '0', 10) || undefined,
    };
  } catch {
    return { host: 'localhost', port: 6379 };
  }
}
