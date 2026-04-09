import { Link } from 'react-router-dom'

function HeroSection({ hero, ctas }) {
  return (
    <section id="domov" className="hero reveal">
      <div className="hero-copy">
        <p className="kicker">{hero.kicker}</p>
        <h1>
          {hero.title}
          <span>{hero.titleAccent}</span>
        </h1>
        <p>{hero.description}</p>
        <div className="hero-cta-group">
          <Link className="btn btn-primary" to="/servis">
            {ctas.heroPrimary}
          </Link>
          <Link className="btn btn-link" to="/storitve">
            {ctas.heroSecondary}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
