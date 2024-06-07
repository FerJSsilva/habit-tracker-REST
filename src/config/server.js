import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';

const server = fastify({ logger: false });

server.register(fastifyFormbody);

export default server;