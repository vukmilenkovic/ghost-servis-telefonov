import { buildServer } from './app.js'
import { prisma } from './db/prisma.js'
import { env } from './lib/env.js'

const app = buildServer()

async function start() {
  try {
    await app.listen({ port: env.port, host: '0.0.0.0' })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

start()

const closeGracefully = async () => {
  await app.close()
  await prisma.$disconnect()
  process.exit(0)
}

process.on('SIGINT', closeGracefully)
process.on('SIGTERM', closeGracefully)
