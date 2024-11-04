import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import preSerialization from './hooks/preSerialization.js';
import fastifyMongooseAPI from 'fastify-mongoose-api';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

server.register(fastifyFormbody);

/* ----------------------------- MongoDB Models ----------------------------- */

// Ensure that the models are imported so they are registered with Mongoose
import './models/Achievment.js';
import './models/Category.js';
import './models/CategoryTranslation.js';
import './models/Habit.js';
import './models/HabitTranslation.js';
import './models/User.js';
import './models/UserHabit.js';

/* ------------------------------- Fastify Plugins ------------------------------ */


// Register Mongoose API
server.register(fastifyMongooseAPI, {
  models: mongoose.models,
  prefix: '/api/',
  methods: ['list', 'get', 'post', 'put', 'delete'],
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
