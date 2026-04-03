import { Link } from 'react-router-dom'
import SectionHeader from '../common/SectionHeader'

function ServiceCategoryShowcase({ categories }) {
  return (
    <section className="section service-catalog reveal">
      <SectionHeader
        kicker="Servisne kategorije"
        title="Izberi tip popravila in nadaljuj na podrobnosti storitve"
      />

      <p className="service-catalog-note">
        Kartice so pripravljene za tvoje fotografije. Ko dodaš sliko, se bo samodejno prikazala na posamezni storitvi.
      </p>

      <div className="service-catalog-grid">
        {categories.map((category, index) => (
          <Link
            key={category.slug}
            className="service-catalog-card reveal-stagger"
            to={`/storitve/${category.slug}`}
            style={{ '--card-accent': category.accent, animationDelay: `${0.04 * index}s` }}
          >
            <div className="service-catalog-media" data-has-image={Boolean(category.imageSrc)}>
              {category.imageSrc ? (
                <img src={category.imageSrc} alt={category.title} loading="lazy" />
              ) : (
                <div className="service-catalog-fallback" aria-hidden="true">
                  <span>{category.short}</span>
                </div>
              )}
              <span className="service-catalog-chip">{category.eta}</span>
            </div>

            <div className="service-catalog-content">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <div className="service-catalog-meta">
                <strong>{category.priceHint}</strong>
                <span>Odpri podrobnosti</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ServiceCategoryShowcase
