import dotenv from 'dotenv'

dotenv.config()

const requiredEnvVars = ['DATABASE_URL']

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

export const env = {
  databaseUrl: process.env.DATABASE_URL,
  port: Number(process.env.PORT ?? 8787),
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173',
  adminApiKey: process.env.ADMIN_API_KEY ?? '',
}
