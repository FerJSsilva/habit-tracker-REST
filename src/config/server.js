import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import loggerOptions from './logger.js';

const server = fastify({ logger: loggerOptions });

server.register(fastifyFormbody);

export default server;