import { Link } from 'react-router-dom'

function Footer({ title, tagline, logoSrc }) {
  return (
    <footer className="footer reveal">
      <div className="footer-brand">
        <img className="footer-logo" src={logoSrc} alt="Ghost Servis logotip" />
        <div>
          <p>{title}</p>
          <p>{tagline}</p>
        </div>
      </div>
      <div className="footer-links">
        <Link to="/">Domov</Link>
        <Link to="/storitve">Storitve</Link>
        <Link to="/cenik">Cenik</Link>
        <Link to="/kontakt">Kontakt</Link>
      </div>
    </footer>
  )
}

export default Footer
