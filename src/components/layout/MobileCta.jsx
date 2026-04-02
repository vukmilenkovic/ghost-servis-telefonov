import { Link } from 'react-router-dom'

function MobileCta({ label }) {
  return (
    <Link className="mobile-cta" to="/kontakt">
      {label}
    </Link>
  )
}

export default MobileCta
