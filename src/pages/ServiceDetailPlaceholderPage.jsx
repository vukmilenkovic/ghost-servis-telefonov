import { Link, useParams } from 'react-router-dom'

const serviceTitles = {
  zasloni: 'Zasloni',
  baterije: 'Baterije',
  kamere: 'Kamere',
  'zadnja-stekla': 'Zadnja stekla',
  zvocniki: 'Zvočniki',
  ohisja: 'Ohišja',
  gumbi: 'Gumbi',
  'prenos-podatkov': 'Prenos podatkov',
}

function ServiceDetailPlaceholderPage() {
  const { serviceSlug } = useParams()
  const title = serviceTitles[serviceSlug] ?? 'Storitev'

  return (
    <section className="section not-found reveal">
      <p className="kicker">Podrobnosti storitve</p>
      <h2>{title}</h2>
      <p>Podrobna vsebina za to storitev je naslednji korak. Stran je pripravljena za razširitev.</p>
      <Link className="btn btn-primary" to="/storitve">
        Nazaj na storitve
      </Link>
    </section>
  )
}

export default ServiceDetailPlaceholderPage
