import { Redis } from "@upstash/redis";

// Works with either the Upstash Marketplace integration (KV_REST_API_URL /
// KV_REST_API_TOKEN) or a direct Upstash integration (UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN) — whichever env vars Vercel injected.
const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  console.error(
    "Missing Redis credentials. Add the Upstash Redis integration to this project in the Vercel dashboard (Storage tab)."
  );
}

export const redis = new Redis({ url, token });

const DATA_KEY = "hh_data";

const DEFAULT_DATA = {
  tables: [
    { id: 1, capacity: 2, status: "available", bookingId: null },
    { id: 2, capacity: 4, status: "available", bookingId: null },
    { id: 3, capacity: 4, status: "reserved", bookingId: "HH-1003" },
    { id: 4, capacity: 6, status: "occupied", bookingId: "HH-1004" },
    { id: 5, capacity: 4, status: "available", bookingId: null },
    { id: 6, capacity: 8, status: "available", bookingId: null },
    { id: 7, capacity: 2, status: "available", bookingId: null },
    { id: 8, capacity: 4, status: "available", bookingId: null },
    { id: 9, capacity: 6, status: "available", bookingId: null },
    { id: 10, capacity: 4, status: "available", bookingId: null },
    { id: 11, capacity: 2, status: "available", bookingId: null },
    { id: 12, capacity: 8, status: "available", bookingId: null }
  ],
  bookings: [
    { id: "HH-1003", name: "Ali Ahmed", phone: "", guests: 4, tableId: 3, time: "08:00 PM", status: "confirmed" },
    { id: "HH-1004", name: "Kamran Khan", phone: "", guests: 5, tableId: 4, time: "07:00 PM", status: "seated" }
  ]
};

export async function getData() {
  let data = await redis.get(DATA_KEY);
  if (!data) {
    data = DEFAULT_DATA;
    await redis.set(DATA_KEY, data);
  }
  return data;
}

export async function saveData(data) {
  await redis.set(DATA_KEY, data);
}
