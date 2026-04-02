import SectionHeader from '../common/SectionHeader'

function PricingTableSection({ intro, rows, notes }) {
  return (
    <section className="section reveal">
      <SectionHeader kicker={intro.kicker} title={intro.title} />
      <p className="table-description">{intro.description}</p>

      <div className="pricing-table-wrap">
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Storitev</th>
              <th>Okvirna cena</th>
              <th>Čas popravila</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.service}>
                <td>{row.service}</td>
                <td>{row.estimate}</td>
                <td>{row.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="pricing-notes">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}

export default PricingTableSection
