import SectionHeader from '../common/SectionHeader'

function FaqSection({ section, faqs }) {
  return (
    <section className="section faq reveal">
      <SectionHeader kicker={section.kicker} title={section.title} />
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q} className="reveal-stagger">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqSection

