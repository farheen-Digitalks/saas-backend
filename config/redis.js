// backend/config/redis.js
import { createClient } from "redis";

const url = process.env.REDIS_URL || "redis://127.0.0.1:6379";
// if you have password: redis://:password@host:port

const redisClient = createClient({ url });

// Optional: attach a retry strategy (you can tune)
redisClient.on("error", (err) => {
  console.error("Redis error", err);
});
redisClient.on("connect", () => console.log("Redis connecting..."));
redisClient.on("ready", () => console.log("Redis ready"));
redisClient.on("end", () => console.log("Redis connection closed"));

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
    // decide if you want process.exit(1) - often better to crash and let orchestrator restart
  }
})();

export { redisClient };
