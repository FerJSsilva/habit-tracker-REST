import fastify from 'fastify';
import fjwtJwks from 'fastify-jwt-jwks';
import { connectToDatabase } from './config/database.js';
import createRoutes from './api.js';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

/* ----------------------------- MongoDB Models ----------------------------- */

import Achievments from './models/Achievment.js';
import Categories from './models/Category.js';
import CategoriesTranslation from './models/CategoryTranslation.js';
import Habits from './models/Habit.js';
import HabitsTranslation from './models/HabitTranslation.js';
import Users from './models/User.js';
import UsersHabits from './models/UserHabit.js';

/* ------------------------------- Fastify Plugins ------------------------------ */


await server.register(fjwtJwks, {
  jwksUrl: 'https://ferjssilva.auth0.com/.well-known/jwks.json',
  audience: 'https://habit-tracker-api'
});

// Rota de exemplo
server.get('/health', { 
  preValidation: server.authenticate 
}, (request, reply) => {
  reply.send({ message: 'Secured Resource' });
});

// Register Mongoose API
server.register(createRoutes, {
  models: [Achievments, Categories, CategoriesTranslation, HabitsTranslation, Habits, Users, UsersHabits],
  prefix: '/api',
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
