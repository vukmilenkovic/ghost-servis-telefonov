# ghost-servis-telefonov

This project is migrated from `src/data/siteContent.js` to a relational database setup.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Fastify (`/server`)
- ORM and migrations: Prisma
- Database: PostgreSQL

## Backend setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create `.env` from template:

```bash
cp .env.example .env
```

PowerShell alternative:

```powershell
Copy-Item .env.example .env
```

3. Set `DATABASE_URL` in `.env` to your PostgreSQL instance.

4. Run migrations and generate Prisma client:

```bash
npm run db:migrate
npm run db:generate
```

5. Import existing content from `src/data/siteContent.js`:

```bash
npm run db:seed
```

6. Start the API:

```bash
npm run dev
```

API default URL: `http://localhost:8787`

## Frontend setup

From project root:

```bash
npm install
npm run dev
```

Frontend content source:

- `VITE_API_BASE_URL` when set
- otherwise `http://localhost:8787`

Example root `.env`:

```bash
VITE_API_BASE_URL=http://localhost:8787
```

## API endpoints

- `GET /health`
- `GET /api/content/layout`
- `GET /api/content/home`
- `GET /api/content/pricing`
- `GET /api/content/contact`
- `GET /api/content/servis`
- `GET /api/content/services`
- `GET /api/content/full`

## Migration notes

- `src/data/siteContent.js` remains as the one-time import source for the seed script.
- Runtime React pages no longer import `siteContent.js`.
- Import script includes brand normalization: `readme -> redmi`.
