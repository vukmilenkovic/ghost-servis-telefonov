import PageIntro from '../components/common/PageIntro'
import ServicesSection from '../components/sections/ServicesSection'
import ProcessSection from '../components/sections/ProcessSection'
import DeviceGallerySection from '../components/sections/DeviceGallerySection'
import { siteContent } from '../data/siteContent'
import iphone16Pro from '../assets/images/iPhone_16/iPhone 16 Pro/iPhone 16 Pro - Desert Titanium - Portrait.png'
import iphone16 from '../assets/images/iPhone_16/iPhone 16/iPhone 16 - Ultramarine - Portrait.png'
import iphone15ProMax from '../assets/images/iPhone_15/iPhone 15 Pro Max/iPhone 15 Pro Max - Natural Titanium - Portrait.png'

const featuredDevices = [
  {
    name: 'iPhone 16 Pro',
    image: iphone16Pro,
    note: 'Menjava zaslona, baterije in napredna diagnostika matične plošče.',
  },
  {
    name: 'iPhone 16',
    image: iphone16,
    note: 'Hitra popravila stekla, polnjenja in kamer v istem dnevu.',
  },
  {
    name: 'iPhone 15 Pro Max',
    image: iphone15ProMax,
    note: 'Natančna kalibracija po popravilu in test vseh senzorjev.',
  },
]

function ServicesPage() {
  return (
    <>
      {/* <PageIntro
        kicker={siteContent.servicesPage.intro.kicker}
        title={siteContent.servicesPage.intro.title}
        description={siteContent.servicesPage.intro.description}
      /> */}
      {/* <ServicesSection section={siteContent.servicesSection} services={siteContent.services} labels={siteContent.commonLabels} /> */}
      {/* <ProcessSection section={siteContent.processSection} steps={siteContent.processSteps} /> */}
      {/* <DeviceGallerySection title={siteContent.servicesPage.galleryTitle} devices={featuredDevices} /> */}
    </>
  )
}

export default ServicesPage
