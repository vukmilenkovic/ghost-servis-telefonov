import SectionHeader from '../common/SectionHeader'

function ServicesSection({ section, services, labels, sectionId }) {
  return (
    <section id={sectionId} className="section reveal">
      <SectionHeader kicker={section.kicker} title={section.title} />
      <div className="service-grid">
        {services.map((service) => (
          <article key={service.title} className="service-card reveal-stagger">
            <h3>{service.title}</h3>
            <p>{service.copy}</p>
            <dl>
              <div>
                <dt>{labels.time}</dt>
                <dd>{service.time}</dd>
              </div>
              <div>
                <dt>{labels.price}</dt>
                <dd>{service.price}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
