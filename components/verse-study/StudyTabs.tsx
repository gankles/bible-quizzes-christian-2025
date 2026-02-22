'use client';

import { useState, useMemo } from 'react';

interface StudyTabsProps {
  reference: string;
  verseText: string;
  commentary: string | null;
  bookName: string;
}

type TabType = 'scholarly' | 'devotional' | 'practical';

// ─── Theme Detection ──────────────────────────────────────────────────────────
// Scans verse text for biblical themes and returns matched theme objects

interface Theme {
  name: string;
  reflectionQ: string;
  prayer: string;
  actionStep: string;
  applicationQ: string;
  applicationA: string;
}

const THEME_PATTERNS: { pattern: RegExp; theme: Theme }[] = [
  {
    pattern: /\b(lov(?:e[ds]?|ing|eth)|beloved)\b/i,
    theme: {
      name: 'God\'s Love',
      reflectionQ: 'How does this verse deepen your understanding of the love God has for you?',
      prayer: 'Father, thank You for Your unfailing love shown in this passage. Help me to receive it fully and extend it to others.',
      actionStep: 'Show unexpected kindness to someone today as a reflection of the love described here',
      applicationQ: 'How does the love described here change my relationships?',
      applicationA: 'This verse calls us to reflect God\'s love in our daily interactions — forgiving freely, serving selflessly, and prioritizing others\' good.',
    },
  },
  {
    pattern: /\b(faith|believ(?:e[ds]?|eth|ing)|trust(?:s|ed|eth|ing)?)\b/i,
    theme: {
      name: 'Faith & Belief',
      reflectionQ: 'What is this verse asking you to trust God with right now in your life?',
      prayer: 'Lord, strengthen my faith where it is weak. Help me to trust You fully as this passage teaches.',
      actionStep: 'Identify one area of worry or doubt and consciously surrender it to God in prayer this week',
      applicationQ: 'What does this verse teach about the nature of faith?',
      applicationA: 'Biblical faith is active trust — not merely intellectual agreement, but a confident reliance on God\'s character and promises that shapes how we live.',
    },
  },
  {
    pattern: /\b(grace|mercif?u?l?|mercy|mercies|compassion)\b/i,
    theme: {
      name: 'Grace & Mercy',
      reflectionQ: 'Where have you experienced God\'s undeserved grace recently, as reflected in this verse?',
      prayer: 'Gracious God, I am humbled by Your mercy. Help me show the same grace to those around me today.',
      actionStep: 'Extend grace to someone who has wronged you — forgive a grudge or respond with patience instead of anger',
      applicationQ: 'How should God\'s grace change my attitude toward others?',
      applicationA: 'Because God freely gives grace to the undeserving, we are called to do the same — releasing bitterness and responding to offenses with the mercy we have received.',
    },
  },
  {
    pattern: /\b(sin(?:s|ned|neth|ful|ner)?|transgress(?:ion)?s?|iniquit(?:y|ies)|wicked(?:ness)?)\b/i,
    theme: {
      name: 'Sin & Repentance',
      reflectionQ: 'Is there any sin this verse convicts you of that you need to confess and turn from?',
      prayer: 'Holy God, search my heart and reveal any unconfessed sin. Grant me true repentance and the power to walk in righteousness.',
      actionStep: 'Spend time in honest self-examination today; confess any known sin and make restitution where needed',
      applicationQ: 'What does this verse reveal about the seriousness of sin?',
      applicationA: 'Scripture consistently shows that sin separates us from God and harms ourselves and others. But it also points to God\'s provision for forgiveness through repentance and faith.',
    },
  },
  {
    pattern: /\b(pray(?:er|s|ed|ing|eth)?|supplicate?i?o?n?s?|intercession)\b/i,
    theme: {
      name: 'Prayer',
      reflectionQ: 'How does this verse encourage or instruct your prayer life?',
      prayer: 'Lord, teach me to pray as Your Word directs. May my prayers align with Your will and deepen my relationship with You.',
      actionStep: 'Set aside dedicated time this week to pray specifically about what this verse addresses',
      applicationQ: 'What does this verse teach about how we should approach God?',
      applicationA: 'God invites us to come to Him honestly and persistently. Prayer is not a ritual but a relationship — an ongoing conversation with our Creator who hears and answers.',
    },
  },
  {
    pattern: /\b(sav(?:e[ds]?|iour|ation|ing|eth)|redeem(?:ed|er|s)?|deliver(?:ed|ance|eth)?)\b/i,
    theme: {
      name: 'Salvation',
      reflectionQ: 'How does this verse deepen your gratitude for God\'s work of salvation?',
      prayer: 'Thank You, Lord, for the gift of salvation. Help me never take it for granted and to share it boldly with others.',
      actionStep: 'Share your testimony or the gospel with someone this week who needs to hear about God\'s saving power',
      applicationQ: 'What does this passage teach about God\'s plan of salvation?',
      applicationA: 'Salvation is God\'s initiative from start to finish — He seeks the lost, provides the sacrifice, and sustains the saved. Our response is faith and obedience.',
    },
  },
  {
    pattern: /\b(eternal|everlasting|forever|perish(?:eth)?|life)\b/i,
    theme: {
      name: 'Eternal Life',
      reflectionQ: 'How does the promise of eternal life in this verse reshape your priorities today?',
      prayer: 'Eternal God, fix my eyes on things above. Help me live today in light of eternity and the promises You have given.',
      actionStep: 'Evaluate one daily habit or priority — does it reflect an eternal perspective or a temporary one?',
      applicationQ: 'How should the reality of eternity affect my daily choices?',
      applicationA: 'Living with an eternal perspective means investing in what lasts — relationships, character, obedience, and the spread of the gospel — rather than chasing temporary comforts.',
    },
  },
  {
    pattern: /\b(command(?:ment|ed|s)?|obey(?:ed|eth|ing)?|obedien(?:t|ce)|statutes?|law)\b/i,
    theme: {
      name: 'Obedience',
      reflectionQ: 'What specific act of obedience is God calling you to through this verse?',
      prayer: 'Lord, give me a willing heart to obey Your Word, even when it is difficult. Let my obedience flow from love for You.',
      actionStep: 'Identify one specific area where you know God\'s will but have been slow to obey — take action today',
      applicationQ: 'Why does God call us to obedience?',
      applicationA: 'God\'s commands are not burdensome restrictions but loving boundaries designed for our flourishing. Obedience is the fruit of genuine faith and the pathway to blessing.',
    },
  },
  {
    pattern: /\b(strength|strong|power(?:ful)?|might(?:y)?|courage(?:ous)?|bold(?:ly|ness)?)\b/i,
    theme: {
      name: 'God\'s Strength',
      reflectionQ: 'In what area of weakness do you need to rely on God\'s strength as described here?',
      prayer: 'Almighty God, I am weak but You are strong. Empower me by Your Spirit to face today\'s challenges with confidence in You.',
      actionStep: 'Instead of relying on your own ability this week, pause before each challenge and ask God for His strength',
      applicationQ: 'How can I access God\'s strength in my weakness?',
      applicationA: 'God\'s strength is made available through prayer, His Word, and the Holy Spirit. It is often most evident when we acknowledge our own insufficiency and depend entirely on Him.',
    },
  },
  {
    pattern: /\b(peace|rest(?:eth)?|comfort(?:ed|eth|s)?|still(?:ness)?|quiet)\b/i,
    theme: {
      name: 'Peace & Rest',
      reflectionQ: 'What anxiety or burden do you need to release to God to experience the peace this verse describes?',
      prayer: 'Prince of Peace, calm the storms in my heart. Help me to rest in Your sovereignty and find true peace in Your presence.',
      actionStep: 'Practice being still before God for 10 minutes today — no requests, just resting in His presence',
      applicationQ: 'What is the source of true peace according to Scripture?',
      applicationA: 'Biblical peace is not the absence of trouble but the presence of God. It comes from trusting His sovereignty, resting in His promises, and surrendering our anxieties to Him.',
    },
  },
  {
    pattern: /\b(fear(?:ed|eth|ful|s)?not|afraid|terror|dread)\b/i,
    theme: {
      name: 'Overcoming Fear',
      reflectionQ: 'What fear is God addressing in your life through this verse?',
      prayer: 'Lord, replace my fear with faith. Remind me that You are with me and that nothing can separate me from Your love.',
      actionStep: 'Write down your biggest fear and next to it write a promise of God that directly addresses it',
      applicationQ: 'How does faith overcome fear?',
      applicationA: 'Fear loses its grip when we focus on God\'s character rather than our circumstances. As we meditate on His faithfulness and promises, courage replaces anxiety.',
    },
  },
  {
    pattern: /\b(holy|holines|sanctif(?:y|ied|ication)|righteous(?:ness)?|pure|purit?y?)\b/i,
    theme: {
      name: 'Holiness',
      reflectionQ: 'How is God calling you to greater holiness through what this verse teaches?',
      prayer: 'Holy God, purify my heart and set me apart for Your purposes. Help me to pursue holiness in every area of life.',
      actionStep: 'Remove or limit one thing in your life that hinders your pursuit of holiness',
      applicationQ: 'What does it mean to live a holy life in today\'s world?',
      applicationA: 'Holiness means being set apart for God — not withdrawing from the world, but living distinctly within it, reflecting God\'s character in our speech, conduct, and priorities.',
    },
  },
  {
    pattern: /\b(joy(?:ful|ous)?|rejoic(?:e[ds]?|ing|eth)|glad(?:ness)?|delight)\b/i,
    theme: {
      name: 'Joy',
      reflectionQ: 'What reason for joy does this verse give you, regardless of your current circumstances?',
      prayer: 'God of all joy, fill me with the deep gladness that comes from knowing You. Let my joy be rooted in You alone.',
      actionStep: 'Write down three things from Scripture (not circumstances) that give you reason for joy today',
      applicationQ: 'How is biblical joy different from happiness?',
      applicationA: 'Biblical joy is not dependent on circumstances but is rooted in our relationship with God and His promises. It persists through trials because its source is unchanging.',
    },
  },
  {
    pattern: /\b(wisdom|wise|understanding|knowledge|discern(?:ment|ing)?)\b/i,
    theme: {
      name: 'Wisdom',
      reflectionQ: 'What decision in your life right now needs the wisdom this verse points to?',
      prayer: 'God of all wisdom, grant me discernment and understanding. Help me to seek Your wisdom above the world\'s counsel.',
      actionStep: 'Before making your next decision this week, pause and ask: "What does God\'s Word say about this?"',
      applicationQ: 'How do we gain godly wisdom?',
      applicationA: 'Godly wisdom begins with the fear of the Lord and grows through prayerful study of Scripture, counsel from mature believers, and obedient application of what God reveals.',
    },
  },
  {
    pattern: /\b(shepherd|sheep|lamb|flock|pasture|rod|staff)\b/i,
    theme: {
      name: 'God as Shepherd',
      reflectionQ: 'In what way do you need the Good Shepherd\'s guidance and care right now?',
      prayer: 'Good Shepherd, lead me in paths of righteousness. Help me to hear Your voice and follow where You lead.',
      actionStep: 'Spend time today listening for God\'s direction in a specific area where you feel lost or uncertain',
      applicationQ: 'What does it mean that God is our Shepherd?',
      applicationA: 'A shepherd provides, protects, guides, and cares for his flock. God does all this and more — knowing each of us by name and laying down His life for our good.',
    },
  },
  {
    pattern: /\b(word|scripture|law|testimony|precepts?|commandment)\b/i,
    theme: {
      name: 'God\'s Word',
      reflectionQ: 'How is this verse calling you to a deeper engagement with God\'s Word?',
      prayer: 'Lord, give me a hunger for Your Word. Let it be a lamp to my feet and a light to my path every day.',
      actionStep: 'Commit to reading one chapter of the Bible each day this week and writing down one truth from each',
      applicationQ: 'Why is studying God\'s Word essential for the Christian life?',
      applicationA: 'God\'s Word renews our minds, equips us for every good work, reveals God\'s character, and provides the truth we need to live faithfully in a fallen world.',
    },
  },
  {
    pattern: /\b(heaven(?:ly|s)?|throne|kingdom|glory|glorious)\b/i,
    theme: {
      name: 'Heaven & Glory',
      reflectionQ: 'How does this verse\'s glimpse of God\'s glory or heaven change your perspective today?',
      prayer: 'Glorious God, let the reality of Your heavenly kingdom give me hope and endurance for today\'s journey.',
      actionStep: 'When frustration or disappointment hits this week, pause and remind yourself of the eternal glory that awaits',
      applicationQ: 'How should the reality of heaven shape how we live now?',
      applicationA: 'Knowing that this life is temporary and heaven is our true home frees us to hold earthly things loosely, endure suffering with hope, and invest in eternal treasures.',
    },
  },
  {
    pattern: /\b(forgiv(?:e[ns]?|ing|eness|eth)|pardon(?:ed)?)\b/i,
    theme: {
      name: 'Forgiveness',
      reflectionQ: 'Is there someone you need to forgive, or forgiveness you need to receive, in light of this verse?',
      prayer: 'Merciful Father, thank You for forgiving my sins. Give me the grace to forgive others as You have forgiven me.',
      actionStep: 'Pray specifically for someone who has hurt you and release the offense to God',
      applicationQ: 'Why is forgiveness so central to the Christian life?',
      applicationA: 'Forgiveness frees both the offender and the offended. Because God has forgiven us an unpayable debt, we are called to extend that same grace to others.',
    },
  },
  {
    pattern: /\b(hope|promis(?:e[ds]?|ing)|wait(?:ing|eth)?|expect(?:ation)?)\b/i,
    theme: {
      name: 'Hope & Promise',
      reflectionQ: 'What promise or hope in this verse do you need to hold onto today?',
      prayer: 'God of hope, anchor my soul in Your promises. When circumstances seem hopeless, remind me that You are faithful.',
      actionStep: 'Write out the promise from this verse and place it where you\'ll see it daily as a reminder of God\'s faithfulness',
      applicationQ: 'What makes Christian hope different from wishful thinking?',
      applicationA: 'Christian hope is confident expectation based on God\'s unchanging character and proven faithfulness. It is an anchor for the soul, grounded in the resurrection of Christ.',
    },
  },
  {
    pattern: /\b(servant|serve[ds]?|serv(?:ing|eth)|ministry|minister)\b/i,
    theme: {
      name: 'Service',
      reflectionQ: 'How is this verse calling you to serve God and others more faithfully?',
      prayer: 'Lord Jesus, You came not to be served but to serve. Shape my heart to follow Your example in humble service.',
      actionStep: 'Look for one practical way to serve someone in need this week without expecting anything in return',
      applicationQ: 'What does true Christian service look like?',
      applicationA: 'Biblical service is motivated by love for God, marked by humility, and directed toward others\' genuine good — following the example of Christ who gave Himself for us.',
    },
  },
  {
    pattern: /\b(spirit|holy\s*ghost|spirit\s*of\s*god|spirit\s*of\s*the\s*lord)\b/i,
    theme: {
      name: 'The Holy Spirit',
      reflectionQ: 'How does this verse encourage you to rely more on the Holy Spirit\'s work in your life?',
      prayer: 'Holy Spirit, fill me afresh. Guide me, convict me, comfort me, and empower me to live for God\'s glory.',
      actionStep: 'Before each major decision or conversation today, pause and ask the Holy Spirit for guidance',
      applicationQ: 'What role does the Holy Spirit play in the believer\'s life?',
      applicationA: 'The Holy Spirit convicts of sin, guides into truth, empowers for service, produces godly character, and assures us of our adoption as God\'s children.',
    },
  },
  {
    pattern: /\b(son|christ|jesus|messiah|lord|cross|blood|lamb\s*of\s*god)\b/i,
    theme: {
      name: 'Christ',
      reflectionQ: 'What does this verse reveal about Jesus that deepens your worship of Him?',
      prayer: 'Lord Jesus, You are worthy of all praise. Open my eyes to see more of Your beauty and sufficiency in this passage.',
      actionStep: 'Spend time today meditating specifically on who Jesus is and what He has done, as revealed in this verse',
      applicationQ: 'How does this verse point to the person and work of Christ?',
      applicationA: 'All of Scripture ultimately points to Jesus — His life, death, resurrection, and coming kingdom. Understanding how each passage connects to Christ enriches our faith and worship.',
    },
  },
];

function extractThemes(verseText: string): Theme[] {
  const matched: Theme[] = [];
  const seen = new Set<string>();
  for (const { pattern, theme } of THEME_PATTERNS) {
    if (pattern.test(verseText) && !seen.has(theme.name)) {
      seen.add(theme.name);
      matched.push(theme);
    }
  }
  return matched;
}

// Fallback themes when no specific themes are detected
const FALLBACK_THEMES: Theme[] = [
  {
    name: 'God\'s Character',
    reflectionQ: 'What does this verse reveal about who God is and how He works?',
    prayer: 'Lord, open my eyes to see Your character more clearly through this passage. Transform me by the truth of Your Word.',
    actionStep: 'Write down one attribute of God revealed in this verse and look for evidence of it in your life today',
    applicationQ: 'What does this verse teach about God?',
    applicationA: 'Every verse of Scripture reveals something about God\'s character — His faithfulness, sovereignty, love, justice, or wisdom. Recognizing these attributes strengthens our trust in Him.',
  },
  {
    name: 'Living by Scripture',
    reflectionQ: 'How does this passage challenge or encourage the way you are currently living?',
    prayer: 'Father, let this verse take root in my heart. Give me the desire and the power to live according to Your Word.',
    actionStep: 'Choose one truth from this verse and intentionally apply it in a specific situation this week',
    applicationQ: 'How can I make this verse part of my daily life?',
    applicationA: 'Living by Scripture means meditating on it, memorizing it, discussing it with other believers, and obeying it — allowing God\'s truth to shape our thoughts, words, and actions.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StudyTabs({
  reference,
  verseText,
  commentary,
  bookName
}: StudyTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('scholarly');

  const themes = useMemo(() => {
    const found = extractThemes(verseText);
    return found.length > 0 ? found : FALLBACK_THEMES;
  }, [verseText]);

  const tabs: { id: TabType; label: string }[] = [
    { id: 'scholarly', label: 'Scholarly' },
    { id: 'devotional', label: 'Devotional' },
    { id: 'practical', label: 'Practical' },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-scripture mb-4">Study Guide</h2>
      <div className="border border-grace rounded-lg overflow-hidden">
        <div className="flex border-b border-grace">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset ${
                activeTab === tab.id
                  ? 'text-scripture border-b-2 border-scripture bg-white'
                  : 'text-primary-dark/60 hover:text-primary-dark/80 bg-primary-light/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
        {activeTab === 'scholarly' && (
          <ScholarlyContent
            commentary={commentary}
            reference={reference}
            bookName={bookName}
          />
        )}
        {activeTab === 'devotional' && (
          <DevotionalContent
            verseText={verseText}
            reference={reference}
            themes={themes}
          />
        )}
        {activeTab === 'practical' && (
          <PracticalContent
            verseText={verseText}
            reference={reference}
            themes={themes}
          />
        )}
      </div>
      </div>
    </section>
  );
}

function ScholarlyContent({
  commentary,
  reference,
  bookName
}: {
  commentary: string | null;
  reference: string;
  bookName: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-scripture mb-2">Historical Context</h4>
        <p className="text-sm text-primary-dark/70">
          This verse is found in the book of {bookName}. Understanding the historical
          and cultural background helps illuminate its meaning for the original audience
          and for us today.
        </p>
      </div>

      {commentary && (
        <div>
          <h4 className="font-semibold text-scripture mb-2">Commentary</h4>
          <div
            className="text-sm text-primary-dark/80 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: commentary }}
          />
        </div>
      )}

      <div>
        <h4 className="font-semibold text-scripture mb-2">Theological Significance</h4>
        <p className="text-sm text-primary-dark/70">
          {reference} contributes to our understanding of God&apos;s character and His
          relationship with humanity. Consider how this verse connects to the broader
          themes of Scripture.
        </p>
      </div>
    </div>
  );
}

function DevotionalContent({
  verseText,
  reference,
  themes,
}: {
  verseText: string;
  reference: string;
  themes: Theme[];
}) {
  return (
    <div className="space-y-5">
      {/* Verse for meditation */}
      <div>
        <h4 className="font-semibold text-scripture mb-2">Scripture Meditation</h4>
        <blockquote className="text-sm text-scripture italic leading-relaxed border-l-4 border-grace pl-4">
          &ldquo;{verseText}&rdquo;
        </blockquote>
        <p className="text-xs text-primary-dark/60 mt-2 font-medium">&mdash; {reference} (KJV)</p>
      </div>

      {/* Theme-based reflections */}
      <div>
        <h4 className="font-semibold text-scripture mb-3">Reflection Questions</h4>
        <p className="text-xs text-primary-dark/60 mb-3">
          Themes found in this verse: {themes.map(t => t.name).join(', ')}
        </p>
        <ul className="space-y-3 text-sm text-primary-dark/80">
          {themes.slice(0, 4).map((theme, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-5 h-5 bg-grace/20 text-primary-dark/80 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <span className="font-medium text-scripture">{theme.name}:</span>{' '}
                {theme.reflectionQ}
              </div>
            </li>
          ))}
          <li className="flex gap-3 items-start">
            <span className="w-5 h-5 bg-grace/20 text-primary-dark/80 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {Math.min(themes.length, 4) + 1}
            </span>
            <span>How does {reference} connect to the gospel and the person of Jesus Christ?</span>
          </li>
        </ul>
      </div>

      {/* Prayer prompt based on themes */}
      <div>
        <h4 className="font-semibold text-scripture mb-2">Prayer</h4>
        <div className="space-y-2 text-sm text-primary-dark/80 italic border-l-4 border-grace pl-4">
          {themes.slice(0, 2).map((theme, i) => (
            <p key={i}>{theme.prayer}</p>
          ))}
          <p>In Jesus&apos; name, Amen.</p>
        </div>
      </div>

      {/* Memory verse challenge */}
      <div className="border-t border-grace/50 pt-4">
        <h4 className="font-semibold text-scripture mb-1 text-sm">Memory Verse Challenge</h4>
        <p className="text-sm text-primary-dark/70">
          Try to memorize {reference} this week. Read it aloud three times, then cover the text and recite it from memory.
        </p>
      </div>
    </div>
  );
}

function PracticalContent({
  verseText,
  reference,
  themes,
}: {
  verseText: string;
  reference: string;
  themes: Theme[];
}) {
  return (
    <div className="space-y-5">
      {/* Key Q&A drawn from detected themes */}
      <div>
        <h4 className="font-semibold text-scripture mb-3">Key Questions Answered</h4>
        <div className="space-y-3">
          {themes.slice(0, 3).map((theme, i) => (
            <div key={i} className="border-b border-grace/50 pb-3 last:border-0 last:pb-0">
              <p className="text-sm font-medium text-scripture">{theme.applicationQ}</p>
              <p className="text-sm text-primary-dark/70 mt-1">{theme.applicationA}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Verse-specific action steps */}
      <div>
        <h4 className="font-semibold text-scripture mb-3">This Week&apos;s Action Steps</h4>
        <ul className="space-y-3 text-sm text-primary-dark/80">
          {themes.slice(0, 3).map((theme, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="w-6 h-6 bg-grace/20 text-primary-dark/80 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <span className="font-medium text-scripture">{theme.name}:</span>{' '}
                {theme.actionStep}
              </div>
            </li>
          ))}
          <li className="flex gap-3 items-start">
            <span className="w-6 h-6 bg-grace/20 text-primary-dark/80 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {Math.min(themes.length, 3) + 1}
            </span>
            <span>Share {reference} with a friend or family member and discuss what it means to each of you</span>
          </li>
        </ul>
      </div>

      {/* Discussion starter */}
      <div className="border-t border-grace/50 pt-4">
        <h4 className="font-semibold text-scripture mb-2 text-sm">Group Discussion Starter</h4>
        <p className="text-sm text-primary-dark/80">
          Read {reference} aloud together. Then ask: &ldquo;{themes[0]?.reflectionQ || 'What stood out to you most in this verse, and why?'}&rdquo;
        </p>
      </div>

      {/* Further study */}
      <div className="border-t border-grace pt-4">
        <h4 className="font-semibold text-scripture mb-2">Further Study</h4>
        <p className="text-sm text-primary-dark/70">
          Explore the cross-references below to see how {reference} connects
          with other passages throughout Scripture. Look for recurring themes
          of {themes.slice(0, 2).map(t => t.name.toLowerCase()).join(' and ')}.
        </p>
      </div>
    </div>
  );
}
