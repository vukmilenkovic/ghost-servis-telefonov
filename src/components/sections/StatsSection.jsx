function StatsSection({ stats }) {
  return (
    <section className="stats reveal" aria-label="Statistika servisa">
      {stats.map((item) => (
        <article key={item.label}>
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </article>
      ))}
    </section>
  )
}

export default StatsSection

