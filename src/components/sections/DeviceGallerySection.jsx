import SectionHeader from '../common/SectionHeader'

function DeviceGallerySection({ title, devices }) {
  return (
    <section className="section reveal">
      <SectionHeader kicker="Naprave" title={title} />
      <div className="device-gallery">
        {devices.map((device) => (
          <article key={device.name} className="device-card reveal-stagger">
            <img src={device.image} alt={device.name} loading="lazy" />
            <h3>{device.name}</h3>
            <p>{device.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default DeviceGallerySection
