import PageIntro from '../components/common/PageIntro'
import ContactChannelsSection from '../components/sections/ContactChannelsSection'
import ContactSection from '../components/sections/ContactSection'
import { useSiteContent } from '../content/SiteContentContext.jsx'

function ContactPage() {
  const { content } = useSiteContent()

  return (
    <>
      <PageIntro
        kicker={content.contactPage.intro.kicker}
        title={content.contactPage.intro.title}
        description={content.contactPage.intro.description}
      />
      <ContactChannelsSection channels={content.contactPage.channels} />
      <ContactSection section={content.contactSection} />
    </>
  )
}

export default ContactPage
