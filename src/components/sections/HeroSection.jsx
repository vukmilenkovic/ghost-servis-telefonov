import { Link } from 'react-router-dom'
import { useState } from 'react'

const turnaroundByIssue = {
  'Počeno steklo': 'Predviden čas popravila je 60-120 minut.',
  'Slaba baterija': 'Predviden čas popravila je približno 45 minut.',
  'Težava s polnjenjem': 'Predviden čas popravila je isti delovni dan.',
  'Poškodba zaradi vode': 'Najprej izvedemo diagnostiko, običajno v 1-3 delovnih dneh.',
  'Napaka kamere': 'Predviden čas popravila je do 1 delovni dan.',
}

const emptyBooking = {
  deviceType: '',
  brand: '',
  issue: '',
}

function HeroSection({ hero, ctas, bookingForm }) {
  const [booking, setBooking] = useState(emptyBooking)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('ok')

  const handleChange = (field) => (event) => {
    setBooking((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!booking.deviceType || !booking.brand || !booking.issue) {
      setStatus('Prosim, izberi napravo, znamko in težavo, da pripravimo oceno.')
      setStatusType('error')
      return
    }

    const eta = turnaroundByIssue[booking.issue] ?? 'Predviden čas sporočimo po hitrem pregledu.'
    setStatus(`Super, povpraševanje je pripravljeno za: ${booking.brand} / ${booking.deviceType}. ${eta}`)
    setStatusType('ok')
  }

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
          <Link className="btn btn-primary" to="/kontakt">
            {ctas.heroPrimary}
          </Link>
          <Link className="btn btn-link" to="/storitve">
            {ctas.heroSecondary}
          </Link>
        </div>
      </div>

      <aside className="booking-card reveal">
        <h2>{bookingForm.title}</h2>
        <p>{bookingForm.description}</p>
        <form onSubmit={handleSubmit}>
          <label>
            {bookingForm.labels.deviceType}
            <select value={booking.deviceType} onChange={handleChange('deviceType')}>
              <option value="" disabled>
                {bookingForm.placeholders.deviceType}
              </option>
              {bookingForm.options.deviceType.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            {bookingForm.labels.brand}
            <select value={booking.brand} onChange={handleChange('brand')}>
              <option value="" disabled>
                {bookingForm.placeholders.brand}
              </option>
              {bookingForm.options.brand.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label>
            {bookingForm.labels.issue}
            <select value={booking.issue} onChange={handleChange('issue')}>
              <option value="" disabled>
                {bookingForm.placeholders.issue}
              </option>
              {bookingForm.options.issue.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="btn btn-primary full-width">
            {bookingForm.submitLabel}
          </button>

          {status ? <p className={`form-note status-${statusType}`}>{status}</p> : null}
        </form>
      </aside>
    </section>
  )
}

export default HeroSection
