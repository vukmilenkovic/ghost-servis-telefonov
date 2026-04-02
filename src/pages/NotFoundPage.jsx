import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="section not-found reveal">
      <p className="kicker">404</p>
      <h2>Stran ne obstaja</h2>
      <p>Stran, ki jo iščeš, ni bila najdena. Vrni se na domačo stran.</p>
      <Link className="btn btn-primary" to="/">
        Nazaj na domov
      </Link>
    </section>
  )
}

export default NotFoundPage
