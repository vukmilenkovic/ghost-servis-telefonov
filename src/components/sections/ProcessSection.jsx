import SectionHeader from '../common/SectionHeader'

function ProcessSection({ section, steps, sectionId }) {
  return (
    <section id={sectionId} className="section process reveal">
      <SectionHeader kicker={section.kicker} title={section.title} />
      <ol>
        {steps.map((step) => (
          <li key={step.title} className="reveal-stagger">
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default ProcessSection
