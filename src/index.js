import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import mongoose from 'mongoose';
import connectToDatabase from './config/database';
import preSerialization from './hooks/preSerialization';
import fastifyMongooseAPI from "fastify-mongoose-api";
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

server.register(fastifyFormbody);

/* ----------------------------- MongoDB Models ----------------------------- */

import './models/Achievment';
import './models/Category';
import './models/CategoryTranslation';
import './models/Habit';
import './models/HabitTranslation';
import './models/User';
import './models/UserHabit';

/* ------------------------------- Fastify Plugins ------------------------------ */

server.register(fastifyMongooseAPI, {
  models: mongoose.models,
  prefix: "/api/",
  methods: ["list", "get", "post", "patch", "put", "delete"],
  setDefaults: true,
});

/* ------------------------------- Fastify Hooks ------------------------------ */

server.addHook('preSerialization', preSerialization);

/* ------------------------------- Start Server ------------------------------ */
const start = async () => {
  try {
    connectToDatabase();
    const port = process.env.PORT || 4000;
    await server.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
