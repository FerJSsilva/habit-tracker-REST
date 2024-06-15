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
    const port = process.env.PORT || 4000;
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(
      `Server running on port: ${server.server.address().port}`
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
