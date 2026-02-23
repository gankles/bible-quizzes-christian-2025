interface GeoAttributionProps {
  imageCredit?: string | null;
  imageCreditUrl?: string | null;
  compact?: boolean;
}

export default function GeoAttribution({ imageCredit, imageCreditUrl, compact = false }: GeoAttributionProps) {
  if (compact) {
    return (
      <p className="text-xs text-primary-dark/40 mt-4">
        Geographic data:{' '}
        <a href="https://www.openbible.info/geo/" className="underline hover:text-primary-dark/60" target="_blank" rel="noopener noreferrer">
          OpenBible.info
        </a>{' '}
        (CC BY 4.0). Map tiles: OpenStreetMap contributors (ODbL).
        {imageCredit && (
          <>
            {' '}Image: {imageCreditUrl ? (
              <a href={imageCreditUrl} className="underline hover:text-primary-dark/60" target="_blank" rel="noopener noreferrer">{imageCredit}</a>
            ) : imageCredit}.
          </>
        )}
      </p>
    );
  }

  return (
    <div className="border-t border-grace pt-4 mt-8">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-dark/50 mb-2">Attribution</h3>
      <ul className="text-xs text-primary-dark/50 space-y-1">
        <li>
          Geographic data from{' '}
          <a href="https://www.openbible.info/geo/" className="underline hover:text-primary-dark/70" target="_blank" rel="noopener noreferrer">
            OpenBible.info Bible Geocoding Data
          </a>{' '}
          licensed under{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/" className="underline hover:text-primary-dark/70" target="_blank" rel="noopener noreferrer">
            CC BY 4.0
          </a>.
        </li>
        <li>
          Map tiles by{' '}
          <a href="https://www.openstreetmap.org/copyright" className="underline hover:text-primary-dark/70" target="_blank" rel="noopener noreferrer">
            OpenStreetMap
          </a>{' '}
          contributors (ODbL 1.0).
        </li>
        {imageCredit && (
          <li>
            Image: {imageCreditUrl ? (
              <a href={imageCreditUrl} className="underline hover:text-primary-dark/70" target="_blank" rel="noopener noreferrer">{imageCredit}</a>
            ) : imageCredit}.
          </li>
        )}
      </ul>
    </div>
  );
}
