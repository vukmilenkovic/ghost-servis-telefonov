import SectionHeader from '../common/SectionHeader'

function BenefitsSection({ section, benefits }) {
  return (
    <section className="section why-us reveal">
      <SectionHeader kicker={section.kicker} title={section.title} />
      <div className="benefit-grid">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="benefit-card reveal-stagger">
            <h3>{benefit.title}</h3>
            <p>{benefit.copy}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BenefitsSection

