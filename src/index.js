import server from "./config/server";
import mongoose from 'mongoose';
import connectToDatabase from './config/database';
import preSerialization from './hooks/preSerialization';
import fastifyMongooseAPI from "fastify-mongoose-api";
import dotenv from 'dotenv';
dotenv.config();

/* ----------------------- Load environment variables ----------------------- */

/* ----------------------------- MongoDB Models ----------------------------- */

import './models/Achievment';
import './models/Category';
import './models/Habit';
import './models/User';
import './models/UserHabit';

/* ------------------------------- Fastify Plugins ------------------------------ */

server.register(fastifyMongooseAPI, {
  models: mongoose.models,
  prefix: "/api/",
  methods: ["list", "get", "post", "patch", "delete"],
  setDefaults: true,
});

/* ------------------------------- Fastify Hooks ------------------------------ */

server.addHook('preSerialization', preSerialization);

/* ------------------------------- Start Server ------------------------------ */
const start = async () => {
  try {
    connectToDatabase();
    await server.listen({ port: process.env.PORT || 4000 });
    server.log.info(
      `Server running on http://localhost:${server.server.address().port}`
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
