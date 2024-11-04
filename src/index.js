import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import preSerialization from './hooks/preSerialization.js';
import fastifyMongooseAPI from 'fastify-mongoose-api';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
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

// Swagger options
const swaggerOptions = {
  openapi: {
    info: {
      title: 'Habit Tracker API',
      description: 'API documentation',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    }
  }
};

// Register Swagger
server.register(swagger, swaggerOptions);

// Register Swagger UI
server.register(swaggerUi, {
  customSiteTitle: 'Habit Tracker API Docs',
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

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
