import PageIntro from '../components/common/PageIntro'
import ServiceCategoryShowcase from '../components/sections/ServiceCategoryShowcase'
import { useSiteContent } from '../content/SiteContentContext.jsx'
import zasloniImage from '../assets/images/Zasloni/Samusng_ekrani_website.PNG'
import zadnjaSteklaImage from '../assets/images/Zadnja_stekla/zadnja_stekla_website.PNG'
import zvocnikiImage from '../assets/images/Zvocniki/Zvocnik.JPEG'

const serviceCategories = [
  {
    slug: 'zasloni',
    title: 'Zasloni',
    short: 'ZS',
    description: 'Menjava razbitega stekla, OLED/LCD panela ter kalibracija prikaza in dotika.',
    eta: '45-120 min',
    priceHint: 'od 79 EUR',
    accent: '#4f8f25',
    imageSrc: zasloniImage,
  },
  {
    slug: 'baterije',
    title: 'Baterije',
    short: 'BT',
    description: 'Hitra menjava baterije z diagnostiko zdravja in preverjanjem porabe energije.',
    eta: '30-60 min',
    priceHint: 'od 49 EUR',
    accent: '#739f28',
    imageSrc: null,
  },
  {
    slug: 'kamere',
    title: 'Kamere',
    short: 'KM',
    description: 'Popravilo zamegljene slike, napak ostrenja, stabilizacije in Face ID modula.',
    eta: '1 delovni dan',
    priceHint: 'od 59 EUR',
    accent: '#3c7b62',
    imageSrc: null,
  },
  {
    slug: 'zadnja-stekla',
    title: 'Zadnja stekla',
    short: 'ZS',
    description: 'Lasersko odstranjevanje in menjava zadnjega stekla z varnim lepljenjem ohišja.',
    eta: '2-4 h',
    priceHint: 'od 69 EUR',
    accent: '#6f7d2f',
    imageSrc: zadnjaSteklaImage,
  },
  {
    slug: 'zvocniki',
    title: 'Zvocniki',
    short: 'ZV',
    description: 'Tiho predvajanje, hrešcanje ali izpad zvoka pri klicih in medijev.',
    eta: '1-2 h',
    priceHint: 'od 39 EUR',
    accent: '#5a8f3e',
    imageSrc: zvocnikiImage,
  },
  {
    slug: 'ohisja',
    title: 'Ohišja',
    short: 'OH',
    description: 'Ravnanje ali menjava ohišja, okvirja in notranjih nosilcev po poškodbah.',
    eta: '1 dan',
    priceHint: 'od 89 EUR',
    accent: '#6a8250',
    imageSrc: null,
  },
  {
    slug: 'gumbi',
    title: 'Gumbi',
    short: 'GB',
    description: 'Popravilo tipk za vklop, glasnost, home in stranskih stikal.',
    eta: '1-2 h',
    priceHint: 'od 35 EUR',
    accent: '#456f28',
    imageSrc: null,
  },
  {
    slug: 'prenos-podatkov',
    title: 'Prenos podatkov',
    short: 'PP',
    description: 'Varen prenos stikov, fotografij, aplikacij in datotek na novo napravo.',
    eta: '30-120 min',
    priceHint: 'od 29 EUR',
    accent: '#2f7c53',
    imageSrc: null,
  },
]

function ServicesPage() {
  const { content } = useSiteContent()

  return (
    <>
      <PageIntro
        kicker={content.servicesPage.intro.kicker}
        title={content.servicesPage.intro.title}
        description={content.servicesPage.intro.description}
      />
      <ServiceCategoryShowcase categories={serviceCategories} />
    </>
  )
}

export default ServicesPage
