import { Link, NavLink } from 'react-router-dom'

function MainHeader({ brand, navigation, ctaLabel, logoSrc }) {
  return (
    <header className="main-header reveal">
      <Link className="brand" to="/">
        <img className="brand-logo" src={logoSrc} alt="Ghost Servis logotip" />
        <span>
          {brand.title}
          <small>{brand.subtitle}</small>
        </span>
      </Link>
      <nav>
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
            end={item.to === '/'}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="btn btn-ghost" to="/kontakt">
        {ctaLabel}
      </Link>
    </header>
  )
}

export default MainHeader
