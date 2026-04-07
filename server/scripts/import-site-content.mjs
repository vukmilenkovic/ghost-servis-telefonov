import { PrismaClient } from '@prisma/client'
import { siteContent } from '../../src/data/siteContent.js'

const prisma = new PrismaClient()
const UPDATED_BY = 'seed:siteContent'

const brandCodeNormalization = {
  readme: 'redmi',
}

const brandLabelNormalization = {
  readme: 'Redmi',
}

function normalizeBrandCode(code) {
  const normalized = brandCodeNormalization[code] ?? code
  return normalized.trim().toLowerCase()
}

function normalizeBrandLabel(brand) {
  if (brandLabelNormalization[brand.id]) {
    return brandLabelNormalization[brand.id]
  }

  return brand.label.trim()
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
}

function serviceKey(value) {
  return value.toLowerCase().trim()
}

function pickServiceForPricingLabel(label, serviceByKey) {
  const l = label.toLowerCase()

  if (l.includes('zaslon')) return serviceByKey['menjava zaslona']
  if (l.includes('baterij')) return serviceByKey['menjava baterije']
  if (l.includes('polnil')) return serviceByKey['popravilo polnjenja']
  if (l.includes('vodo') || l.includes('stiku z vodo')) return serviceByKey['sanacija po vodi']
  if (l.includes('kamer')) return serviceByKey['popravilo kamere in face id']
  if (l.includes('podatk')) return serviceByKey['resevanje podatkov']

  return null
}

async function resetTables(tx) {
  await tx.bookingFormFieldOption.deleteMany()
  await tx.bookingFormField.deleteMany()
  await tx.bookingForm.deleteMany()

  await tx.navigationItem.deleteMany()
  await tx.heroContent.deleteMany()
  await tx.sectionHeader.deleteMany()
  await tx.stat.deleteMany()
  await tx.pricingRow.deleteMany()
  await tx.service.deleteMany()
  await tx.benefit.deleteMany()
  await tx.processStep.deleteMany()
  await tx.review.deleteMany()
  await tx.faq.deleteMany()
  await tx.pageIntro.deleteMany()
  await tx.servicesPageMeta.deleteMany()
  await tx.serviceBrand.deleteMany()
  await tx.pricingNote.deleteMany()
  await tx.contactPageChannel.deleteMany()
  await tx.contactSectionDetail.deleteMany()
  await tx.contactSection.deleteMany()
  await tx.contactFormField.deleteMany()
  await tx.contactForm.deleteMany()
  await tx.siteSettings.deleteMany()
}

async function seed() {
  await prisma.$transaction(async (tx) => {
    await resetTables(tx)

    await tx.siteSettings.create({
      data: {
        id: 1,
        workingHours: siteContent.topBar.workingHours,
        fastContact: siteContent.topBar.fastContact,
        brandTitle: siteContent.brand.title,
        brandSubtitle: siteContent.brand.subtitle,
        ctaPrimaryHeader: siteContent.ctas.primaryHeader,
        ctaHeroPrimary: siteContent.ctas.heroPrimary,
        ctaHeroSecondary: siteContent.ctas.heroSecondary,
        ctaMobile: siteContent.ctas.mobile,
        commonLabelTime: siteContent.commonLabels.time,
        commonLabelPrice: siteContent.commonLabels.price,
        footerTitle: siteContent.footer.title,
        footerTagline: siteContent.footer.tagline,
        updatedBy: UPDATED_BY,
      },
    })

    await tx.navigationItem.createMany({
      data: siteContent.navigation.map((item, index) => ({
        label: item.label,
        route: item.to,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.heroContent.create({
      data: {
        id: 1,
        kicker: siteContent.hero.kicker,
        title: siteContent.hero.title,
        titleAccent: siteContent.hero.titleAccent,
        description: siteContent.hero.description,
        updatedBy: UPDATED_BY,
      },
    })

    await tx.bookingForm.create({
      data: {
        id: 1,
        title: siteContent.bookingForm.title,
        description: siteContent.bookingForm.description,
        submitLabel: siteContent.bookingForm.submitLabel,
        updatedBy: UPDATED_BY,
      },
    })

    const bookingFieldConfig = [
      {
        code: 'device_type',
        label: siteContent.bookingForm.labels.deviceType,
        placeholder: siteContent.bookingForm.placeholders.deviceType,
        options: siteContent.bookingForm.options.deviceType,
      },
      {
        code: 'brand',
        label: siteContent.bookingForm.labels.brand,
        placeholder: siteContent.bookingForm.placeholders.brand,
        options: siteContent.bookingForm.options.brand,
      },
      {
        code: 'issue',
        label: siteContent.bookingForm.labels.issue,
        placeholder: siteContent.bookingForm.placeholders.issue,
        options: siteContent.bookingForm.options.issue,
      },
    ]

    for (const [index, field] of bookingFieldConfig.entries()) {
      const createdField = await tx.bookingFormField.create({
        data: {
          bookingFormId: 1,
          code: field.code,
          label: field.label,
          placeholder: field.placeholder,
          sortOrder: index,
          updatedBy: UPDATED_BY,
        },
      })

      await tx.bookingFormFieldOption.createMany({
        data: field.options.map((option, optionIndex) => ({
          fieldId: createdField.id,
          value: option,
          sortOrder: optionIndex,
          updatedBy: UPDATED_BY,
        })),
      })
    }

    await tx.sectionHeader.createMany({
      data: [
        { code: 'services', kicker: siteContent.servicesSection.kicker, title: siteContent.servicesSection.title, updatedBy: UPDATED_BY },
        { code: 'benefits', kicker: siteContent.benefitsSection.kicker, title: siteContent.benefitsSection.title, updatedBy: UPDATED_BY },
        { code: 'process', kicker: siteContent.processSection.kicker, title: siteContent.processSection.title, updatedBy: UPDATED_BY },
        { code: 'reviews', kicker: siteContent.reviewsSection.kicker, title: siteContent.reviewsSection.title, updatedBy: UPDATED_BY },
        { code: 'faq', kicker: siteContent.faqSection.kicker, title: siteContent.faqSection.title, updatedBy: UPDATED_BY },
      ],
    })

    await tx.stat.createMany({
      data: siteContent.stats.map((stat, index) => ({
        value: stat.value,
        label: stat.label,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    const createdServices = []

    for (const [index, service] of siteContent.services.entries()) {
      const created = await tx.service.create({
        data: {
          slug: slugify(service.title),
          title: service.title,
          copy: service.copy,
          etaText: service.time,
          priceText: service.price,
          sortOrder: index,
          updatedBy: UPDATED_BY,
        },
      })
      createdServices.push(created)
    }

    const serviceByKey = Object.fromEntries(
      createdServices.map((service) => [serviceKey(service.title), service])
    )

    await tx.benefit.createMany({
      data: siteContent.benefits.map((benefit, index) => ({
        title: benefit.title,
        copy: benefit.copy,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.processStep.createMany({
      data: siteContent.processSteps.map((step, index) => ({
        title: step.title,
        text: step.text,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.review.createMany({
      data: siteContent.reviews.map((review, index) => ({
        authorName: review.name,
        text: review.text,
        sortOrder: index,
        isPublished: true,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.faq.createMany({
      data: siteContent.faqs.map((faq, index) => ({
        question: faq.q,
        answer: faq.a,
        sortOrder: index,
        isPublished: true,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.pageIntro.createMany({
      data: [
        {
          pageCode: 'services',
          kicker: siteContent.servicesPage.intro.kicker,
          title: siteContent.servicesPage.intro.title,
          description: siteContent.servicesPage.intro.description,
          updatedBy: UPDATED_BY,
        },
        {
          pageCode: 'servis',
          kicker: siteContent.servisPage.intro.kicker,
          title: siteContent.servisPage.intro.title,
          description: siteContent.servisPage.intro.description,
          updatedBy: UPDATED_BY,
        },
        {
          pageCode: 'pricing',
          kicker: siteContent.pricingPage.intro.kicker,
          title: siteContent.pricingPage.intro.title,
          description: siteContent.pricingPage.intro.description,
          updatedBy: UPDATED_BY,
        },
        {
          pageCode: 'contact',
          kicker: siteContent.contactPage.intro.kicker,
          title: siteContent.contactPage.intro.title,
          description: siteContent.contactPage.intro.description,
          updatedBy: UPDATED_BY,
        },
      ],
    })

    await tx.servicesPageMeta.create({
      data: {
        id: 1,
        galleryTitle: siteContent.servicesPage.galleryTitle,
        updatedBy: UPDATED_BY,
      },
    })

    await tx.serviceBrand.createMany({
      data: siteContent.servisPage.brands.map((brand, index) => ({
        code: normalizeBrandCode(brand.id),
        label: normalizeBrandLabel(brand),
        sortOrder: index,
        isActive: true,
        updatedBy: UPDATED_BY,
      })),
    })

    for (const [index, row] of siteContent.pricingPage.table.entries()) {
      const service = pickServiceForPricingLabel(row.service, serviceByKey)

      await tx.pricingRow.create({
        data: {
          serviceId: service?.id,
          serviceLabel: row.service,
          estimateText: row.estimate,
          etaText: row.eta,
          sortOrder: index,
          updatedBy: UPDATED_BY,
        },
      })
    }

    await tx.pricingNote.createMany({
      data: siteContent.pricingPage.notes.map((note, index) => ({
        note,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.contactPageChannel.createMany({
      data: siteContent.contactPage.channels.map((channel, index) => ({
        title: channel.title,
        value: channel.value,
        detail: channel.detail,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.contactSection.create({
      data: {
        id: 1,
        title: siteContent.contactSection.title,
        text: siteContent.contactSection.text,
        callLabel: siteContent.contactSection.callLabel,
        callHref: siteContent.contactSection.callHref,
        updatedBy: UPDATED_BY,
      },
    })

    await tx.contactSectionDetail.createMany({
      data: siteContent.contactSection.details.map((detail, index) => ({
        contactSectionId: 1,
        detail,
        sortOrder: index,
        updatedBy: UPDATED_BY,
      })),
    })

    await tx.contactForm.create({
      data: {
        id: 1,
        submitLabel: siteContent.contactSection.form.submitLabel,
        updatedBy: UPDATED_BY,
      },
    })

    await tx.contactFormField.createMany({
      data: [
        {
          contactFormId: 1,
          code: 'full_name',
          label: siteContent.contactSection.form.fullName,
          placeholder: siteContent.contactSection.form.placeholders.fullName,
          sortOrder: 0,
          updatedBy: UPDATED_BY,
        },
        {
          contactFormId: 1,
          code: 'phone',
          label: siteContent.contactSection.form.phone,
          placeholder: siteContent.contactSection.form.placeholders.phone,
          sortOrder: 1,
          updatedBy: UPDATED_BY,
        },
        {
          contactFormId: 1,
          code: 'model',
          label: siteContent.contactSection.form.model,
          placeholder: siteContent.contactSection.form.placeholders.model,
          sortOrder: 2,
          updatedBy: UPDATED_BY,
        },
        {
          contactFormId: 1,
          code: 'issue',
          label: siteContent.contactSection.form.issue,
          placeholder: siteContent.contactSection.form.placeholders.issue,
          sortOrder: 3,
          updatedBy: UPDATED_BY,
        },
      ],
    })
  })
}

seed()
  .then(async () => {
    console.log('Database content imported from src/data/siteContent.js')
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('Failed to import site content:', error)
    await prisma.$disconnect()
    process.exit(1)
  })
