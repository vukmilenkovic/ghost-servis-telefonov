import { prisma } from '../db/prisma.js'

function toObjectByCode(items) {
  return items.reduce((acc, item) => {
    acc[item.code] = item
    return acc
  }, {})
}

function mapBookingFields(fields) {
  const sorted = [...fields].sort((a, b) => a.sortOrder - b.sortOrder)

  const mapped = {
    labels: {},
    placeholders: {},
    options: {},
  }

  for (const field of sorted) {
    const normalizedKey =
      field.code === 'device_type' ? 'deviceType' : field.code === 'full_name' ? 'fullName' : field.code

    mapped.labels[normalizedKey] = field.label
    mapped.placeholders[normalizedKey] = field.placeholder
    mapped.options[normalizedKey] = field.options
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((option) => option.value)
  }

  return mapped
}

function mapContactFormFields(fields) {
  const sorted = [...fields].sort((a, b) => a.sortOrder - b.sortOrder)

  const labels = {}
  const placeholders = {}

  for (const field of sorted) {
    const key = field.code === 'full_name' ? 'fullName' : field.code
    labels[key] = field.label
    placeholders[key] = field.placeholder
  }

  return { labels, placeholders }
}

export async function getLayoutContent() {
  const [settings, navigationItems] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.navigationItem.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!settings) {
    throw new Error('Site settings not found. Run database seed first.')
  }

  return {
    topBar: {
      workingHours: settings.workingHours,
      fastContact: settings.fastContact,
    },
    brand: {
      title: settings.brandTitle,
      subtitle: settings.brandSubtitle,
    },
    navigation: navigationItems.map((item) => ({ to: item.route, label: item.label })),
    ctas: {
      primaryHeader: settings.ctaPrimaryHeader,
      mobile: settings.ctaMobile,
    },
    footer: {
      title: settings.footerTitle,
      tagline: settings.footerTagline,
    },
  }
}

export async function getHomeContent() {
  const [
    settings,
    hero,
    bookingForm,
    headers,
    stats,
    services,
    benefits,
    processSteps,
    reviews,
    faqs,
  ] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
    prisma.heroContent.findUnique({ where: { id: 1 } }),
    prisma.bookingForm.findUnique({
      where: { id: 1 },
      include: { fields: { include: { options: true } } },
    }),
    prisma.sectionHeader.findMany(),
    prisma.stat.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.benefit.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.processStep.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.review.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.faq.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!settings || !hero || !bookingForm) {
    throw new Error('Core home content not found. Run database seed first.')
  }

  const sectionByCode = toObjectByCode(headers)
  const bookingFieldMap = mapBookingFields(bookingForm.fields)

  return {
    hero: {
      kicker: hero.kicker,
      title: hero.title,
      titleAccent: hero.titleAccent,
      description: hero.description,
    },
    ctas: {
      primaryHeader: settings.ctaPrimaryHeader,
      heroPrimary: settings.ctaHeroPrimary,
      heroSecondary: settings.ctaHeroSecondary,
      mobile: settings.ctaMobile,
    },
    bookingForm: {
      title: bookingForm.title,
      description: bookingForm.description,
      submitLabel: bookingForm.submitLabel,
      labels: bookingFieldMap.labels,
      placeholders: bookingFieldMap.placeholders,
      options: bookingFieldMap.options,
    },
    stats: stats.map((item) => ({ value: item.value, label: item.label })),
    servicesSection: {
      kicker: sectionByCode.services?.kicker ?? '',
      title: sectionByCode.services?.title ?? '',
    },
    services: services.map((service) => ({
      slug: service.slug,
      title: service.title,
      copy: service.copy,
      time: service.etaText,
      price: service.priceText,
    })),
    commonLabels: {
      time: settings.commonLabelTime,
      price: settings.commonLabelPrice,
    },
    benefitsSection: {
      kicker: sectionByCode.benefits?.kicker ?? '',
      title: sectionByCode.benefits?.title ?? '',
    },
    benefits: benefits.map((benefit) => ({ title: benefit.title, copy: benefit.copy })),
    processSection: {
      kicker: sectionByCode.process?.kicker ?? '',
      title: sectionByCode.process?.title ?? '',
    },
    processSteps: processSteps.map((step) => ({ title: step.title, text: step.text })),
    reviewsSection: {
      kicker: sectionByCode.reviews?.kicker ?? '',
      title: sectionByCode.reviews?.title ?? '',
    },
    reviews: reviews.map((review) => ({ name: review.authorName, text: review.text })),
    faqSection: {
      kicker: sectionByCode.faq?.kicker ?? '',
      title: sectionByCode.faq?.title ?? '',
    },
    faqs: faqs.map((faq) => ({ q: faq.question, a: faq.answer })),
  }
}

export async function getPricingContent() {
  const [pricingIntro, rows, notes, faqHeader, faqs] = await Promise.all([
    prisma.pageIntro.findUnique({ where: { pageCode: 'pricing' } }),
    prisma.pricingRow.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.pricingNote.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.sectionHeader.findUnique({ where: { code: 'faq' } }),
    prisma.faq.findMany({ where: { isPublished: true }, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!pricingIntro) {
    throw new Error('Pricing intro not found. Run database seed first.')
  }

  return {
    pricingPage: {
      intro: {
        kicker: pricingIntro.kicker,
        title: pricingIntro.title,
        description: pricingIntro.description,
      },
      table: rows.map((row) => ({
        service: row.serviceLabel,
        estimate: row.estimateText,
        eta: row.etaText,
      })),
      notes: notes.map((note) => note.note),
    },
    faqSection: {
      kicker: faqHeader?.kicker ?? '',
      title: faqHeader?.title ?? '',
    },
    faqs: faqs.map((faq) => ({ q: faq.question, a: faq.answer })),
  }
}

export async function getContactContent() {
  const [contactIntro, channels, contactSection, contactForm] = await Promise.all([
    prisma.pageIntro.findUnique({ where: { pageCode: 'contact' } }),
    prisma.contactPageChannel.findMany({ orderBy: { sortOrder: 'asc' } }),
    prisma.contactSection.findUnique({
      where: { id: 1 },
      include: { details: { orderBy: { sortOrder: 'asc' } } },
    }),
    prisma.contactForm.findUnique({ where: { id: 1 }, include: { fields: true } }),
  ])

  if (!contactIntro || !contactSection || !contactForm) {
    throw new Error('Contact content not found. Run database seed first.')
  }

  const contactFormMap = mapContactFormFields(contactForm.fields)

  return {
    contactPage: {
      intro: {
        kicker: contactIntro.kicker,
        title: contactIntro.title,
        description: contactIntro.description,
      },
      channels: channels.map((channel) => ({
        title: channel.title,
        value: channel.value,
        detail: channel.detail,
      })),
    },
    contactSection: {
      title: contactSection.title,
      text: contactSection.text,
      details: contactSection.details.map((detail) => detail.detail),
      callLabel: contactSection.callLabel,
      callHref: contactSection.callHref,
      form: {
        fullName: contactFormMap.labels.fullName,
        phone: contactFormMap.labels.phone,
        model: contactFormMap.labels.model,
        issue: contactFormMap.labels.issue,
        placeholders: {
          fullName: contactFormMap.placeholders.fullName,
          phone: contactFormMap.placeholders.phone,
          model: contactFormMap.placeholders.model,
          issue: contactFormMap.placeholders.issue,
        },
        submitLabel: contactForm.submitLabel,
      },
    },
  }
}

export async function getServisContent() {
  const [servisIntro, brands] = await Promise.all([
    prisma.pageIntro.findUnique({ where: { pageCode: 'servis' } }),
    prisma.serviceBrand.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!servisIntro) {
    throw new Error('Servis page intro not found. Run database seed first.')
  }

  return {
    servisPage: {
      intro: {
        kicker: servisIntro.kicker,
        title: servisIntro.title,
        description: servisIntro.description,
      },
      brands: brands.map((brand) => ({ id: brand.code, label: brand.label })),
    },
  }
}

export async function getServicesPageContent() {
  const [servicesIntro, servicesMeta, services] = await Promise.all([
    prisma.pageIntro.findUnique({ where: { pageCode: 'services' } }),
    prisma.servicesPageMeta.findUnique({ where: { id: 1 } }),
    prisma.service.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' } }),
  ])

  if (!servicesIntro || !servicesMeta) {
    throw new Error('Services page content not found. Run database seed first.')
  }

  return {
    servicesPage: {
      intro: {
        kicker: servicesIntro.kicker,
        title: servicesIntro.title,
        description: servicesIntro.description,
      },
      galleryTitle: servicesMeta.galleryTitle,
      services: services.map((service) => ({
        slug: service.slug,
        title: service.title,
        copy: service.copy,
        time: service.etaText,
        price: service.priceText,
      })),
    },
  }
}

export async function getFullContent() {
  const [layout, home, pricing, contact, servis, servicesPage] = await Promise.all([
    getLayoutContent(),
    getHomeContent(),
    getPricingContent(),
    getContactContent(),
    getServisContent(),
    getServicesPageContent(),
  ])

  return {
    ...layout,
    ...home,
    ...pricing,
    ...contact,
    ...servis,
    ...servicesPage,
  }
}
