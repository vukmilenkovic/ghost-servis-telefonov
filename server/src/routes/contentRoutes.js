import {
  getContactContent,
  getFullContent,
  getHomeContent,
  getLayoutContent,
  getPricingContent,
  getServisContent,
  getServicesPageContent,
} from '../services/contentService.js'

export async function contentRoutes(app) {
  app.get('/layout', async (request, reply) => {
    try {
      const data = await getLayoutContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load layout content.' })
    }
  })

  app.get('/home', async (request, reply) => {
    try {
      const data = await getHomeContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load home content.' })
    }
  })

  app.get('/pricing', async (request, reply) => {
    try {
      const data = await getPricingContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load pricing content.' })
    }
  })

  app.get('/contact', async (request, reply) => {
    try {
      const data = await getContactContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load contact content.' })
    }
  })

  app.get('/servis', async (request, reply) => {
    try {
      const data = await getServisContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load servis content.' })
    }
  })

  app.get('/services', async (request, reply) => {
    try {
      const data = await getServicesPageContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load services page content.' })
    }
  })

  app.get('/full', async (request, reply) => {
    try {
      const data = await getFullContent()
      return reply.send({ data })
    } catch (error) {
      request.log.error(error)
      return reply.code(500).send({ error: 'Unable to load full site content.' })
    }
  })
}
