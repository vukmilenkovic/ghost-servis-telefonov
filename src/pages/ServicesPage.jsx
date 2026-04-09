import PageIntro from '../components/common/PageIntro'
import ServiceCategoryShowcase from '../components/sections/ServiceCategoryShowcase'
import { useSiteContent } from '../content/SiteContentContext.jsx'
import { serviceCategories } from '../data/serviceCategories'

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
