import Fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './lib/env.js'
import { contentRoutes } from './routes/contentRoutes.js'

export function buildServer() {
  const app = Fastify({ logger: true })

  app.register(cors, {
    origin: [env.frontendOrigin],
    methods: ['GET', 'HEAD', 'OPTIONS'],
  })

  app.addHook('onRequest', async (request, reply) => {
    if (request.method === 'GET' || request.method === 'HEAD' || request.method === 'OPTIONS') {
      return
    }

    if (!request.url.startsWith('/api/')) {
      return
    }

    if (!env.adminApiKey) {
      return reply.code(503).send({ error: 'ADMIN_API_KEY is not configured.' })
    }

    const providedKey = request.headers['x-admin-key']

    if (!providedKey || providedKey !== env.adminApiKey) {
      return reply.code(403).send({ error: 'Forbidden.' })
    }
  })

  app.get('/health', async () => ({ status: 'ok' }))

  app.register(contentRoutes, { prefix: '/api/content' })

  return app
}
