import fastify from 'fastify';
import Auth0 from '@auth0/auth0-fastify-api';
import { connectToDatabase } from './config/database.js';
import createRoutes from '@ferjssilva/fast-crud-api'
import dotenv from 'dotenv';
import fastifyCors from '@fastify/cors';
import loggerOptions from './config/logger.js';

dotenv.config();

const server = fastify({ logger: loggerOptions });

/* ----------------------------- MongoDB Models ----------------------------- */

import Achievments from './models/Achievment.js';
import Categories from './models/Category.js';
import CategoriesTranslation from './models/CategoryTranslation.js';
import Habits from './models/Habit.js';
import HabitsTranslation from './models/HabitTranslation.js';
import Users from './models/User.js';
import UsersHabits from './models/UserHabit.js';

/* ------------------------------- Fastify Plugins ------------------------------ */

// Register CORS plugin
await server.register(fastifyCors, {
  origin: true, // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
});

await server.register(Auth0, {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
});

// Register HTTP Cache Plugin
await server.register(import('./plugins/httpCache.js'));

// Rota de exemplo
server.get('/health', (request, reply) => {
  reply.send({ message: 'App is running' });
});

// Register Mongoose API
server.register(async (instance) => {
  instance.addHook('preHandler', instance.requireAuth());

  // Automatically inject userId from token into request body for POST/PUT
  instance.addHook('preHandler', async (request) => {
    if (request.user && request.user.sub && request.body && typeof request.body === 'object') {
      request.body.userId = request.user.sub;
    }
  });

  instance.register(createRoutes, {
    models: [Achievments, Categories, CategoriesTranslation, HabitsTranslation, Habits, Users, UsersHabits],
    prefix: '/api',
    methods: {
      "achievments": ['GET', 'POST', 'PUT', 'DELETE'],
      "categories": ['GET', 'POST', 'PUT', 'DELETE'],
      "category-translations": ['GET', 'POST', 'PUT'],
      "habits": ['GET', 'POST', 'PUT', 'DELETE'],  // Keep GET in the auto-generated routes
      "habit-translations": ['GET', 'POST', 'PUT'],
      "users": ['GET', 'POST'],
      "user-habits": ['GET', 'POST', 'PUT', 'DELETE']
    }
  });
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
