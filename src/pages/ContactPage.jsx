import PageIntro from '../components/common/PageIntro'
import ContactChannelsSection from '../components/sections/ContactChannelsSection'
import ContactSection from '../components/sections/ContactSection'
import { siteContent } from '../data/siteContent'

function ContactPage() {
  return (
    <>
      <PageIntro
        kicker={siteContent.contactPage.intro.kicker}
        title={siteContent.contactPage.intro.title}
        description={siteContent.contactPage.intro.description}
      />
      <ContactChannelsSection channels={siteContent.contactPage.channels} />
      <ContactSection section={siteContent.contactSection} />
    </>
  )
}

export default ContactPage
