import SectionHeader from '../common/SectionHeader'

function ReviewsSection({ section, reviews }) {
  return (
    <section id="mnenja" className="section reviews reveal">
      <SectionHeader kicker={section.kicker} title={section.title} />
      <div className="review-grid">
        {reviews.map((review) => (
          <blockquote key={review.name} className="reveal-stagger">
            <p>{review.text}</p>
            <cite>{review.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export default ReviewsSection

