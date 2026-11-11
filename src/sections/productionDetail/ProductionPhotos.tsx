import { useTranslation } from 'react-i18next'
import Section from '../../components/section/Section'
import Gallery from '../../components/gallery/Gallery'
import type { TKey } from '../../i18n'
import type { Production } from '../../types/production'

/** The production's photos as a row; a click opens one at full width. */
export default function ProductionPhotos({ production }: { production: Production }) {
  const { t } = useTranslation()
  if (!production.photos) return null

  const images = production.photos.map((photo) => ({
    src: photo.src,
    alt: t(`productions.items.${production.key}.photos.${photo.key}` as TKey),
  }))

  return (
    <Section id="photos" title={t('productions.photos')} tone="stage" spacing="compact">
      <Gallery images={images} />
    </Section>
  )
}
