import PageIntro from '../components/common/PageIntro'
import PricingTableSection from '../components/sections/PricingTableSection'
import FaqSection from '../components/sections/FaqSection'
import { useSiteContent } from '../content/SiteContentContext.jsx'

function PricingPage() {
  const { content } = useSiteContent()

  return (
    <>
      <PageIntro
        kicker={content.pricingPage.intro.kicker}
        title={content.pricingPage.intro.title}
        description={content.pricingPage.intro.description}
      />
      <PricingTableSection
        intro={content.pricingPage.intro}
        rows={content.pricingPage.table}
        notes={content.pricingPage.notes}
      />
      <FaqSection section={content.faqSection} faqs={content.faqs} />
    </>
  )
}

export default PricingPage
