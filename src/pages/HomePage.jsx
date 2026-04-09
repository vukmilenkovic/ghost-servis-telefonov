import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ServicesSection from '../components/sections/ServicesSection'
import BenefitsSection from '../components/sections/BenefitsSection'
import ProcessSection from '../components/sections/ProcessSection'
import ReviewsSection from '../components/sections/ReviewsSection'
import FaqSection from '../components/sections/FaqSection'
import { useSiteContent } from '../content/SiteContentContext.jsx'

function HomePage() {
  const { content } = useSiteContent()

  return (
    <>
      <HeroSection hero={content.hero} ctas={content.ctas} />
      <StatsSection stats={content.stats} />
      <ServicesSection
        section={content.servicesSection}
        services={content.services.slice(0, 3)}
        labels={content.commonLabels}
      />
      <BenefitsSection section={content.benefitsSection} benefits={content.benefits} />
      <ProcessSection section={content.processSection} steps={content.processSteps} />
      <ReviewsSection section={content.reviewsSection} reviews={content.reviews} />
      <FaqSection section={content.faqSection} faqs={content.faqs.slice(0, 3)} />
    </>
  )
}

export default HomePage
