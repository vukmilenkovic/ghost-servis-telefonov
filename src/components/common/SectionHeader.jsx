function SectionHeader({ kicker, title }) {
  return (
    <div className="section-head">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  )
}

export default SectionHeader

