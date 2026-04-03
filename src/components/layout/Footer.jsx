// import { Link } from 'react-router-dom'

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
    {/* TODO: Create a real footer*/}
    </footer>
  )
}

export default Footer
