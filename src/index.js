import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import preSerialization from './hooks/preSerialization.js';
import fastifyMongooseAPI from 'fastify-mongoose-api';
import fjwtJwks from 'fastify-jwt-jwks';

import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

await server.register(fjwtJwks, {
  jwksUrl: 'https://fernandojssilva.auth0.com/.well-known/jwks.json',
  audience: 'habit-tracker-api'
});

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


// Rota de exemplo
server.get('/authorized', { 
  preValidation: server.authenticate 
}, (request, reply) => {
  reply.send({ message: 'Secured Resource' });
});

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
