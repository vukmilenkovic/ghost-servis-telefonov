import SectionHeader from '../common/SectionHeader'

function ContactChannelsSection({ channels }) {
  return (
    <section className="section reveal">
      <SectionHeader kicker="Kontaktni kanali" title="Dosegljivi smo na več načinov" />
      <div className="channel-grid">
        {channels.map((channel) => (
          <article key={channel.title} className="channel-card reveal-stagger">
            <h3>{channel.title}</h3>
            <p className="channel-value">{channel.value}</p>
            <p>{channel.detail}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContactChannelsSection
