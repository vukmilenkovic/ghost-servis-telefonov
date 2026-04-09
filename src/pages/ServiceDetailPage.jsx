import { Link, useParams } from 'react-router-dom'
import PageIntro from '../components/common/PageIntro'
import ServiceTiersSection from '../components/sections/ServiceTiersSection'
import { serviceCategoryBySlug } from '../data/serviceCategories'
import { serviceTierDetailsBySlug } from '../data/serviceTierDetails'

function ServiceDetailPage() {
  const { serviceSlug } = useParams()
  const serviceCategory = serviceCategoryBySlug[serviceSlug]

  if (!serviceCategory) {
    return (
      <section className="section not-found reveal">
        <p className="kicker">Storitev ni najdena</p>
        <h2>Ta storitev ne obstaja</h2>
        <p>Preveri seznam storitev in izberi veljavno kategorijo.</p>
        <Link className="btn btn-primary" to="/storitve">
          Nazaj na storitve
        </Link>
      </section>
    )
  }

  const serviceDetail = serviceTierDetailsBySlug[serviceSlug]
  const hasTiers = Boolean(serviceDetail?.tiers?.length)

  return (
    <>
      <PageIntro
        kicker={serviceDetail?.kicker ?? 'Podrobnosti storitve'}
        title={serviceDetail?.title ?? serviceCategory.title}
        description={
          serviceDetail?.description ??
          `Podrobna vsebina za storitev ${serviceCategory.title} je v pripravi in bo kmalu objavljena.`
        }
      />

      <section className="section service-detail-summary reveal">
        <div className="service-detail-summary-head">
          <h3>{serviceCategory.title}</h3>
          <Link className="btn btn-link" to="/storitve">
            Nazaj na storitve
          </Link>
        </div>

        <div className="service-detail-meta">
          <article>
            <p>Predviden cas</p>
            <strong>{serviceCategory.eta}</strong>
          </article>
          <article>
            <p>Zacetna cena</p>
            <strong>{serviceCategory.priceHint}</strong>
          </article>
          <article>
            <p>Stevilo nivojev</p>
            <strong>{hasTiers ? serviceDetail.tiers.length : 'Kmalu'}</strong>
          </article>
        </div>
      </section>

      {hasTiers ? (
        <ServiceTiersSection
          title={serviceDetail.tiersTitle}
          description={serviceDetail.tiersDescription}
          tiers={serviceDetail.tiers}
        />
      ) : (
        <section className="section not-found reveal">
          <p className="kicker">V pripravi</p>
          <h2>Tier ponudba se pripravlja</h2>
          <p>
            Za storitev {serviceCategory.title} bomo dodali podrobne nivoje storitve v naslednjem koraku.
          </p>
          <Link className="btn btn-primary" to="/kontakt">
            Kontaktiraj nas za ponudbo
          </Link>
        </section>
      )}
    </>
  )
}

export default ServiceDetailPage
