import { Metadata } from 'next';
import Link from 'next/link';
import { getGeocodingStats } from '@/lib/geocoding-data';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Bible Maps | Interactive Maps of Biblical Lands, Cities, Routes & Events from Genesis to Revelation | Bible Maximum',
  description: 'Explore interactive Bible maps showing all 1,300+ biblical locations with GPS coordinates. Visualize ancient cities, routes of the patriarchs, the Exodus, the ministry of Jesus, and Paul\'s missionary journeys.',
  keywords: [
    'Bible maps', 'maps of the Bible', 'biblical maps', 'interactive Bible map',
    'Bible geography', 'Bible atlas', 'Bible map online', 'biblical geography map',
    'Holy Land map', 'ancient Israel map', 'Bible lands map', 'Bible places map',
    'Old Testament map', 'New Testament map', 'maps of Bible times',
    'Bible journey maps', 'Paul missionary journeys map', 'Exodus route map',
  ],
  openGraph: {
    title: 'Bible Maps — Interactive Maps of Biblical Lands & Cities',
    description: 'Explore 1,300+ biblical locations on interactive maps with GPS coordinates, verse references, and scholarly data.',
    url: '/bible-maps',
    type: 'website',
  },
  alternates: { canonical: '/bible-maps' },
};

const FEATURED_COLLECTIONS = [
  {
    title: 'All 1,300+ Biblical Locations',
    href: '/bible-places',
    description: 'Browse every identifiable place mentioned in Scripture with interactive maps, GPS coordinates, confidence scores, and verse references.',
  },
  {
    title: 'Bible Geography by Book',
    href: '/bible-geography',
    description: 'Explore biblical places organized by all 66 books of the Bible, from Genesis through Revelation, with chapter-level maps.',
  },
  {
    title: 'Old Testament Cities',
    href: '/bible-places/type/city',
    description: 'Discover the ancient cities of the Old Testament including Jerusalem, Jericho, Nineveh, Ur, and dozens of other fortified cities.',
  },
  {
    title: 'Mountains of the Bible',
    href: '/bible-places/type/mountain',
    description: 'Explore famous biblical mountains like Sinai, Ararat, Carmel, Zion, and the Mount of Olives where pivotal events took place.',
  },
  {
    title: 'Rivers & Bodies of Water',
    href: '/bible-places/type/river',
    description: 'Trace the rivers and seas of Scripture including the Jordan River, the Sea of Galilee, the Nile, and the Mediterranean.',
  },
  {
    title: 'Places in Genesis',
    href: '/bible-geography/genesis',
    description: 'Map the locations in Genesis from the Garden of Eden to the journeys of Abraham, Isaac, and Jacob across the ancient Near East.',
  },
  {
    title: 'Places in the Gospels',
    href: '/bible-geography/matthew',
    description: 'Follow the ministry of Jesus across Galilee, Judea, and Samaria with maps of every location mentioned in the Gospel accounts.',
  },
  {
    title: "Places in Acts (Paul's Journeys)",
    href: '/bible-geography/acts',
    description: "Trace Paul's missionary journeys across the Roman Empire, from Antioch to Athens, Corinth, Ephesus, and finally Rome.",
  },
];

const POPULAR_LOCATIONS = [
  {
    name: 'Jerusalem',
    slug: 'jerusalem',
    description: 'The holy city and spiritual center of Israel, site of Solomon\'s Temple and the crucifixion and resurrection of Jesus Christ.',
  },
  {
    name: 'Bethlehem',
    slug: 'bethlehem',
    description: 'Birthplace of Jesus Christ and King David, located just south of Jerusalem in the Judean hill country.',
  },
  {
    name: 'Nazareth',
    slug: 'nazareth',
    description: 'The childhood home of Jesus in lower Galilee, where the angel Gabriel announced His birth to Mary.',
  },
  {
    name: 'Egypt',
    slug: 'egypt',
    description: 'The land of the pharaohs where Israel was enslaved for 400 years before God delivered them through Moses.',
  },
  {
    name: 'Babylon',
    slug: 'babylon',
    description: 'Capital of the Neo-Babylonian Empire that destroyed Jerusalem in 586 BC and exiled the Jewish people.',
  },
  {
    name: 'Mount Sinai',
    slug: 'mount-sinai',
    description: 'The mountain where God gave the Ten Commandments to Moses and established the covenant with Israel.',
  },
  {
    name: 'Jericho',
    slug: 'jericho',
    description: 'One of the oldest cities in the world, whose walls fell when Israel marched around them under Joshua.',
  },
  {
    name: 'Rome',
    slug: 'rome',
    description: 'Capital of the Roman Empire, where Paul was imprisoned and where the early church took root among the Gentiles.',
  },
  {
    name: 'Damascus',
    slug: 'damascus',
    description: 'One of the world\'s oldest continuously inhabited cities, where Saul was converted on the road and became the apostle Paul.',
  },
  {
    name: 'Corinth',
    slug: 'corinth',
    description: 'A major Greek trade city where Paul founded a church and later wrote two epistles addressing its struggles.',
  },
  {
    name: 'Ephesus',
    slug: 'ephesus',
    description: 'A prominent city in Asia Minor with a significant early church, addressed in both Acts and Revelation.',
  },
  {
    name: 'Galilee',
    slug: 'galilee',
    description: 'The region in northern Israel where Jesus spent most of His ministry, calling His disciples and performing miracles.',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How many places are mentioned in the Bible?',
    answer: 'Scholars have identified over 1,300 distinct locations mentioned in the Bible. These range from major cities like Jerusalem, Babylon, and Rome to smaller villages, mountains, rivers, and regions. Our database includes GPS coordinates for the vast majority of these locations, allowing you to see exactly where biblical events took place on a modern map.',
  },
  {
    question: 'Where was ancient Israel located?',
    answer: 'Ancient Israel was located in the eastern Mediterranean region, in the area known today as Israel, Palestine, and parts of Jordan, Lebanon, and Syria. It was situated along vital trade routes connecting Egypt, Mesopotamia, and Anatolia. The land stretched from Dan in the north to Beersheba in the south, and from the Mediterranean coast to the Jordan River Valley.',
  },
  {
    question: 'What is the significance of Jerusalem in the Bible?',
    answer: 'Jerusalem is the most frequently mentioned city in the Bible, appearing over 800 times. It was established as Israel\'s capital by King David around 1000 BC and became the site of Solomon\'s Temple. For Christians, Jerusalem is where Jesus was crucified, buried, and resurrected. The city appears in both the earliest narratives of Genesis (as Salem) and the final vision of Revelation as the New Jerusalem descending from heaven.',
  },
];

export default function BibleMapsPage() {
  const stats = getGeocodingStats();

  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bible Maps',
    description: metadata.description,
    url: 'https://biblemaximum.com/bible-maps',
    numberOfItems: stats.totalPlaces,
    about: {
      '@type': 'Thing',
      name: 'Biblical Geography',
      description: 'The study of places, lands, and geography mentioned in the Bible.',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://biblemaximum.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bible Maps',
        item: 'https://biblemaximum.com/bible-maps',
      },
    ],
  };

  return (
    <>
      <StructuredData data={collectionPageJsonLd} />
      <StructuredData data={faqJsonLd} />
      <StructuredData data={breadcrumbJsonLd} />

      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 pt-4 text-sm text-primary-dark/60">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-1.5">/</span>
        <span className="text-scripture font-medium">Bible Maps</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-8 pb-10">
        <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-xl p-8 md:p-12 text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            Bible Maps
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mb-6">
            Explore interactive maps of every place mentioned in Scripture — from the
            ancient cities of Mesopotamia to the churches of Revelation.
          </p>
          <div className="flex flex-wrap gap-6 text-center">
            <div>
              <p className="text-3xl font-bold">{stats.totalPlaces.toLocaleString()}+</p>
              <p className="text-xs text-white/70 uppercase tracking-wider">Biblical Places</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.withCoordinates.toLocaleString()}</p>
              <p className="text-xs text-white/70 uppercase tracking-wider">GPS-Mapped</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalVerseRefs.toLocaleString()}</p>
              <p className="text-xs text-white/70 uppercase tracking-wider">Verse References</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.totalBooks}</p>
              <p className="text-xs text-white/70 uppercase tracking-wider">Bible Books</p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl shadow-sm border border-grace p-8 md:p-10">
          <h2 className="text-2xl font-bold font-display text-scripture mb-4">
            Why Bible Maps Matter for Scripture Study
          </h2>
          <div className="prose prose-lg max-w-none text-primary-dark/70 space-y-4">
            <p>
              The Bible is not an abstract collection of theological ideas — it is a record of God
              acting in real places, among real people, across real landscapes. From the fertile
              plains of Mesopotamia where Abraham received his calling, to the dusty roads of
              Galilee where Jesus walked with His disciples, geography shapes the meaning of
              Scripture in ways that words alone cannot convey.
            </p>
            <p>
              Bible maps bring the text to life by showing the distances between cities, the
              terrain that travelers crossed, the strategic importance of fortified towns, and the
              trade routes that connected ancient civilizations. When you see that Nazareth is
              nestled in the hills of lower Galilee, or that the journey from Egypt to Canaan
              passes through harsh desert wilderness, the narrative gains a vivid, tangible
              quality that deepens understanding and strengthens faith.
            </p>
            <p>
              Our interactive Bible maps cover {stats.totalPlaces.toLocaleString()}+ locations
              identified by scholars, each with GPS coordinates, verse references, and confidence
              ratings. Whether you are studying the patriarchs, the conquest of Canaan, the
              kingdoms of Israel and Judah, or the missionary journeys of Paul, these maps provide
              the geographical context you need to read Scripture with clarity and insight.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Map Collections */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold font-display text-scripture mb-6">
          Featured Map Collections
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_COLLECTIONS.map((collection) => (
            <Link
              key={collection.href}
              href={collection.href}
              className="group bg-white rounded-xl shadow-sm border border-grace p-6 hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold font-display text-scripture group-hover:text-green-700 mb-2 transition-colors">
                {collection.title}
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                {collection.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Biblical Locations */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold font-display text-scripture mb-6">
          Popular Biblical Locations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_LOCATIONS.map((place) => (
            <Link
              key={place.slug}
              href={`/bible-places/${place.slug}`}
              className="group bg-white rounded-xl shadow-sm border border-grace p-5 hover:border-green-400 hover:shadow-md transition-all"
            >
              <h3 className="text-lg font-bold font-display text-scripture group-hover:text-green-700 mb-1.5 transition-colors">
                {place.name}
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                {place.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How Bible Maps Enhance Your Study */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-primary-light/30 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold font-display text-scripture mb-6">
            How Bible Maps Enhance Your Study
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl border border-grace p-6">
              <h3 className="text-lg font-bold font-display text-scripture mb-2">
                Understand Distances & Terrain
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                The Bible frequently mentions journeys that spanned days or weeks on foot.
                Maps reveal the actual distances between cities like Jerusalem and Jericho
                (about 15 miles through dangerous desert), or the 1,000-mile trek from Ur
                to Canaan that Abraham undertook. Understanding the terrain — mountains,
                deserts, valleys, and rivers — helps you appreciate the physical challenges
                that biblical figures faced and the strategic importance of key locations.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-grace p-6">
              <h3 className="text-lg font-bold font-display text-scripture mb-2">
                Visualize Biblical Journeys
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                From the Exodus out of Egypt to Paul&apos;s four missionary journeys across the
                Roman Empire, the Bible is filled with travel narratives. Seeing these routes
                on a map transforms abstract place names into concrete paths. You can trace
                the Israelites&apos; 40-year wilderness wandering, follow Jesus from Galilee to
                Jerusalem, or chart Paul&apos;s sea voyages across the Mediterranean — gaining
                new insight into the narrative flow of Scripture.
              </p>
            </div>
            <div className="bg-white rounded-xl border border-grace p-6">
              <h3 className="text-lg font-bold font-display text-scripture mb-2">
                Historical & Archaeological Context
              </h3>
              <p className="text-sm text-primary-dark/70 leading-relaxed">
                Modern archaeology has confirmed the existence of hundreds of biblical
                locations. Maps that incorporate scholarly data and confidence scores help
                you see which sites have been positively identified and which remain
                debated. This context strengthens your understanding of Scripture&apos;s
                historical reliability and connects the ancient text to the physical
                landscape that still exists today in Israel, Jordan, Turkey, Greece,
                and across the Near East.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold font-display text-scripture mb-6">
          Frequently Asked Questions About Bible Maps
        </h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border border-grace p-6"
            >
              <h3 className="text-lg font-bold font-display text-scripture mb-2">
                {item.question}
              </h3>
              <p className="text-primary-dark/70 leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Internal Links */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold font-display text-scripture mb-4">
          Continue Exploring
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/bible-places"
            className="bg-white rounded-xl border border-grace p-4 hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-scripture">Bible Places Directory</span>
            <p className="text-sm text-primary-dark/60 mt-1">Browse all 1,300+ biblical locations</p>
          </Link>
          <Link
            href="/bible-geography"
            className="bg-white rounded-xl border border-grace p-4 hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-scripture">Bible Geography by Book</span>
            <p className="text-sm text-primary-dark/60 mt-1">Places organized by all 66 books</p>
          </Link>
          <Link
            href="/bible-geography/genesis"
            className="bg-white rounded-xl border border-grace p-4 hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-scripture">Genesis Geography</span>
            <p className="text-sm text-primary-dark/60 mt-1">Map the journeys of the patriarchs</p>
          </Link>
          <Link
            href="/topics"
            className="bg-white rounded-xl border border-grace p-4 hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-scripture">Bible Topics</span>
            <p className="text-sm text-primary-dark/60 mt-1">Study themes across Scripture</p>
          </Link>
          <Link
            href="/bible-quizzes"
            className="bg-white rounded-xl border border-grace p-4 hover:border-green-400 hover:shadow-sm transition-all"
          >
            <span className="font-bold text-scripture">Bible Quizzes</span>
            <p className="text-sm text-primary-dark/60 mt-1">Test your Bible knowledge</p>
          </Link>
        </div>
      </section>
    </>
  );
}
