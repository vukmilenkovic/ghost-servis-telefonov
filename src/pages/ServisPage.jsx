import { useMemo, useState } from 'react'
import { siteContent } from '../data/siteContent'


const appleImageModules = import.meta.glob('../assets/images/iPhone_*/**/*.png', {
  eager: true,
  import: 'default',
})

const fallbackModelsByBrand = {
  samsung: ['Galaxy S24 Ultra', 'Galaxy S24', 'Galaxy S23', 'Galaxy S26', 'Galaxy S26 Ultra' ,'Galaxy A55', 'Galaxy A35' ],
  huawei: ['P60 Pro', 'P50 Pro', 'Mate 50 Pro', 'Nova 11'],
  readme: ['Note 13 Pro', 'Note 12', '13C', '12C'],
  realme: ['GT 6', '12 Pro+', '11 Pro', 'C67'],
}

const brandNames = {
  apple: 'Apple / iPhone',
  samsung: 'Samsung',
  huawei: 'Huawei',
  readme: 'Readme',
  realme: 'RealMe',
}

function buildAppleModels() {
  const modelMap = new Map()

  Object.entries(appleImageModules).forEach(([path, image]) => {
    const fileName = path.split('/').pop() ?? ''
    const cleanName = fileName.replace('.png', '')

    if (!cleanName.startsWith('iPhone ')) {
      return
    }

    const modelName = cleanName.split(' - ')[0].trim()
    const score = cleanName.includes('Portrait') ? 3 : cleanName.includes('Landscape') ? 2 : 1
    const current = modelMap.get(modelName)

    if (!current || score > current.score) {
      modelMap.set(modelName, { name: modelName, image, score })
    }
  })

  const collator = new Intl.Collator('sl', { numeric: true, sensitivity: 'base' })

  return Array.from(modelMap.values())
    .sort((a, b) => collator.compare(a.name, b.name))
    .map(({ name, image }) => ({ name, image }))
}

function ServisPage() {
  const [selectedBrand, setSelectedBrand] = useState(null)

  const appleModels = useMemo(() => buildAppleModels(), [])

  const models = useMemo(() => {
    if (!selectedBrand) {
      return []
    }

    if (selectedBrand === 'apple') {
      return appleModels
    }

    return (fallbackModelsByBrand[selectedBrand] ?? []).map((name) => ({ name, image: null }))
  }, [appleModels, selectedBrand])

  const handleBack = () => setSelectedBrand(null)

  return (
    <>

      <section className="section reveal">
        {!selectedBrand ? (
          <div className="servis-brand-grid">
            {siteContent.servisPage.brands.map((brand) => (
              <button
                key={brand.id}
                type="button"
                className="servis-brand-card reveal-stagger"
                onClick={() => setSelectedBrand(brand.id)}
              >
                <h3>{brand.label}</h3>
                <p>Klikni za prikaz modelov</p>
              </button>
            ))}
          </div>
        ) : (
          <>
            <div className="servis-model-toolbar">
              <button type="button" className="btn btn-ghost" onClick={handleBack}>
                Nazaj na znamke
              </button>
              <p>
                Izbrana znamka: <strong>{brandNames[selectedBrand]}</strong>
              </p>
            </div>

            <div className="servis-model-grid">
              {models.map((model) => (
                <article key={model.name} className="servis-model-card reveal-stagger">
                  {model.image ? (
                    <img src={model.image} alt={model.name} loading="lazy" />
                  ) : (
                    <div className="servis-model-placeholder">Brez slike</div>
                  )}
                  <h3>{model.name}</h3>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default ServisPage
