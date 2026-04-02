import HeroSection from '../components/sections/HeroSection'
import StatsSection from '../components/sections/StatsSection'
import ServicesSection from '../components/sections/ServicesSection'
import BenefitsSection from '../components/sections/BenefitsSection'
import ProcessSection from '../components/sections/ProcessSection'
import ReviewsSection from '../components/sections/ReviewsSection'
import FaqSection from '../components/sections/FaqSection'
import { siteContent } from '../data/siteContent'

function HomePage() {
  return (
    <>
      <HeroSection hero={siteContent.hero} ctas={siteContent.ctas} bookingForm={siteContent.bookingForm} />
      <StatsSection stats={siteContent.stats} />
      <ServicesSection
        section={siteContent.servicesSection}
        services={siteContent.services.slice(0, 3)}
        labels={siteContent.commonLabels}
      />
      <BenefitsSection section={siteContent.benefitsSection} benefits={siteContent.benefits} />
      <ProcessSection section={siteContent.processSection} steps={siteContent.processSteps} />
      <ReviewsSection section={siteContent.reviewsSection} reviews={siteContent.reviews} />
      <FaqSection section={siteContent.faqSection} faqs={siteContent.faqs.slice(0, 3)} />
    </>
  )
}

export default HomePage
