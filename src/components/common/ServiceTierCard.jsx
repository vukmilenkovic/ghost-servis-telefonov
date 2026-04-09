function ServiceTierCard({ tier, index }) {
  return (
    <article
      className="service-tier-card reveal-stagger"
      style={{ '--tier-accent': tier.accent, animationDelay: `${0.05 * index}s` }}
    >
      <div className="service-tier-card-media" data-has-image={Boolean(tier.imageSrc)}>
        {tier.imageSrc ? (
          <img src={tier.imageSrc} alt={tier.imageAlt ?? tier.name} loading="lazy" />
        ) : (
          <div className="service-tier-card-fallback" aria-hidden="true">
            <div className="service-tier-badge">
              <span>{tier.fallbackLabel ?? tier.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <p>{tier.name}</p>
            <small>Slika bo dodana kasneje</small>
          </div>
        )}
      </div>

      <div className="service-tier-card-content">
        <p className="service-tier-name">{tier.name}</p>
        <h3>{tier.partLabel}</h3>
        <p>{tier.description}</p>
      </div>
    </article>
  )
}

export default ServiceTierCard
