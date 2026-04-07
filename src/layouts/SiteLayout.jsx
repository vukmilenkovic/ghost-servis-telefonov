import { Outlet } from 'react-router-dom'
import TopBar from '../components/layout/TopBar'
import MainHeader from '../components/layout/MainHeader'
import MobileCta from '../components/layout/MobileCta'
import logoImage from '../assets/images/Instagram-profile-logo-2.0.png'
import { useSiteContent } from '../content/SiteContentContext.jsx'

function SiteLayout() {
  const { content, isLoading, error } = useSiteContent()

  return (
    <div className="site-shell">
      <div className="ambient ambient-left" aria-hidden="true"></div>
      <div className="ambient ambient-right" aria-hidden="true"></div>

      <TopBar workingHours={content.topBar.workingHours} fastContact={content.topBar.fastContact} />

      <MainHeader
        brand={content.brand}
        navigation={content.navigation}
        ctaLabel={content.ctas.primaryHeader}
        logoSrc={logoImage}
      />

      {isLoading ? <p className="section">Nalaganje vsebine...</p> : null}
      {error ? <p className="section form-note status-error">{error}</p> : null}

      <main className="page-main">
        <Outlet />
      </main>

      {/* <Footer title={content.footer.title} tagline={content.footer.tagline} logoSrc={logoImage} /> */}
      <MobileCta label={content.ctas.mobile} />
    </div>
  )
}

export default SiteLayout
