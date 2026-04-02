import SectionHeader from './SectionHeader'

function PageIntro({ kicker, title, description }) {
  return (
    <section className="page-intro reveal">
      <SectionHeader kicker={kicker} title={title} />
      <p>{description}</p>
    </section>
  )
}

export default PageIntro
