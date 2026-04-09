import SectionHeader from '../common/SectionHeader'
import ServiceTierCard from '../common/ServiceTierCard'

function ServiceTiersSection({ title, description, tiers }) {
  return (
    <section className="section service-tiers reveal">
      <SectionHeader kicker="Kakovostni nivoji" title={title} />
      <p className="service-tiers-description">{description}</p>

      <div className="service-tier-grid">
        {tiers.map((tier, index) => (
          <ServiceTierCard key={tier.slug} tier={tier} index={index} />
        ))}
      </div>
    </section>
  )
}

export default ServiceTiersSection
