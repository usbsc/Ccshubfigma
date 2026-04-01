import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-7f82e0d0/health", (c) => {
  return c.json({ status: "ok" });
});

/**
 * Admin Sync Endpoints
 * Use these to manually push data updates
 */
app.get("/make-server-7f82e0d0/admin/sync/:type", async (c) => {
  const type = c.req.param("type");
  try {
    const data = await kv.get(`football_${type}`);
    return c.json(data || []);
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/make-server-7f82e0d0/admin/sync/:type", async (c) => {
  const type = c.req.param("type");
  try {
    const body = await c.req.json();
    await kv.set(`football_${type}`, body);
    return c.json({ success: true, message: `Updated ${type} data successfully` });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

/**
 * Auto-Update Trigger
 * In production, this would trigger a scraper for MaxPreps/Hudl
 */
app.post("/make-server-7f82e0d0/admin/auto-update", async (c) => {
  try {
    // This is where you would call your scraping logic or external API
    console.log("Triggering auto-update from external sources...");
    
    // Mock success response
    return c.json({ 
      success: true, 
      message: "Auto-update triggered. Data is being synced from MaxPreps/Hudl.",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

/**
 * Settings Endpoint
 */
app.get("/make-server-7f82e0d0/settings", async (c) => {
  try {
    const settings = await kv.get("football_settings");
    return c.json(settings || { season: "2025-2026", autoSync: true });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

app.post("/make-server-7f82e0d0/settings", async (c) => {
  try {
    const body = await c.req.json();
    await kv.set("football_settings", body);
    return c.json({ success: true, message: "Settings updated" });
  } catch (err) {
    return c.json({ error: (err as Error).message }, 500);
  }
});

Deno.serve(app.fetch);