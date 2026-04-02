import PageIntro from '../components/common/PageIntro'
import PricingTableSection from '../components/sections/PricingTableSection'
import FaqSection from '../components/sections/FaqSection'
import { siteContent } from '../data/siteContent'

function PricingPage() {
  return (
    <>
      <PageIntro
        kicker={siteContent.pricingPage.intro.kicker}
        title={siteContent.pricingPage.intro.title}
        description={siteContent.pricingPage.intro.description}
      />
      <PricingTableSection
        intro={siteContent.pricingPage.intro}
        rows={siteContent.pricingPage.table}
        notes={siteContent.pricingPage.notes}
      />
      <FaqSection section={siteContent.faqSection} faqs={siteContent.faqs} />
    </>
  )
}

export default PricingPage
