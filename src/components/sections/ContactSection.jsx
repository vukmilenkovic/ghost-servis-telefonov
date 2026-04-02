import { useState } from 'react'

const emptyContact = {
  fullName: '',
  phone: '',
  model: '',
  issue: '',
}

function ContactSection({ section }) {
  const [contact, setContact] = useState(emptyContact)
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('ok')

  const handleChange = (field) => (event) => {
    setContact((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!contact.fullName || !contact.phone || !contact.model || !contact.issue) {
      setStatus('Za oddajo povpraševanja prosim izpolni vsa polja.')
      setStatusType('error')
      return
    }

    setStatus(`Hvala, ${contact.fullName}. Povpraševanje smo prejeli in te kontaktiramo v najkrajšem času.`)
    setStatusType('ok')
    setContact(emptyContact)
  }

  return (
    <section id="kontakt" className="section contact reveal">
      <div className="contact-card">
        <h2>{section.title}</h2>
        <p>{section.text}</p>
        <ul>
          {section.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <a className="btn btn-primary" href={section.callHref}>
          {section.callLabel}
        </a>
      </div>

      <form className="contact-form" aria-label="Obrazec za povpraševanje" onSubmit={handleSubmit}>
        <label>
          {section.form.fullName}
          <input
            type="text"
            value={contact.fullName}
            onChange={handleChange('fullName')}
            placeholder={section.form.placeholders.fullName}
          />
        </label>
        <label>
          {section.form.phone}
          <input
            type="tel"
            value={contact.phone}
            onChange={handleChange('phone')}
            placeholder={section.form.placeholders.phone}
          />
        </label>
        <label>
          {section.form.model}
          <input
            type="text"
            value={contact.model}
            onChange={handleChange('model')}
            placeholder={section.form.placeholders.model}
          />
        </label>
        <label>
          {section.form.issue}
          <textarea
            rows="4"
            value={contact.issue}
            onChange={handleChange('issue')}
            placeholder={section.form.placeholders.issue}
          ></textarea>
        </label>
        <button type="submit" className="btn btn-primary full-width">
          {section.form.submitLabel}
        </button>

        {status ? <p className={`form-note status-${statusType}`}>{status}</p> : null}
      </form>
    </section>
  )
}

export default ContactSection
