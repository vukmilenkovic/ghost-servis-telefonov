import { Outlet } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import MainHeader from '../components/layout/MainHeader'
import Footer from '../components/layout/Footer'
import MobileCta from '../components/layout/MobileCta'
import { siteContent } from '../data/siteContent'
import logoImage from '../assets/images/Instagram-profile-logo-2.0.png'

function SiteLayout() {
  return (
    <div className="site-shell">
      <div className="ambient ambient-left" aria-hidden="true"></div>
      <div className="ambient ambient-right" aria-hidden="true"></div>

      <TopBar workingHours={siteContent.topBar.workingHours} fastContact={siteContent.topBar.fastContact} />

      <MainHeader
        brand={siteContent.brand}
        navigation={siteContent.navigation}
        ctaLabel={siteContent.ctas.primaryHeader}
        logoSrc={logoImage}
      />

      <main className="page-main">
        <Outlet />
      </main>

      <Footer title={siteContent.footer.title} tagline={siteContent.footer.tagline} logoSrc={logoImage} />
      <MobileCta label={siteContent.ctas.mobile} />
    </div>
  )
}

export default SiteLayout
