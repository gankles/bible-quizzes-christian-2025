import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { StructuredData } from '@/components/StructuredData';
import Breadcrumb from '@/components/Breadcrumb';

interface PopularVerse {
  reference: string;
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  endVerse?: number;
  text: string;
  theme: string;
  themeSlug: string;
}

const POPULAR_VERSES: PopularVerse[] = [
  { reference: 'John 3:16', book: 'John', bookSlug: 'john', chapter: 3, verse: 16, text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', theme: 'Salvation', themeSlug: 'salvation' },
  { reference: 'Jeremiah 29:11', book: 'Jeremiah', bookSlug: 'jeremiah', chapter: 29, verse: 11, text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.', theme: 'Hope', themeSlug: 'hope' },
  { reference: 'Philippians 4:13', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 13, text: 'I can do all things through Christ which strengtheneth me.', theme: 'Strength', themeSlug: 'strength' },
  { reference: 'John 10:10', book: 'John', bookSlug: 'john', chapter: 10, verse: 10, text: 'The thief cometh not, but for to steal, and to kill, and to destroy: I am come that they might have life, and that they might have it more abundantly.', theme: 'Abundant Life', themeSlug: 'life' },
  { reference: 'Proverbs 3:5\u20136', book: 'Proverbs', bookSlug: 'proverbs', chapter: 3, verse: 5, endVerse: 6, text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.', theme: 'Trust', themeSlug: 'trust' },
  { reference: 'Matthew 28:19', book: 'Matthew', bookSlug: 'matthew', chapter: 28, verse: 19, text: 'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.', theme: 'Great Commission', themeSlug: 'evangelism' },
  { reference: 'Philippians 4:8', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 8, text: 'Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.', theme: 'Thought Life', themeSlug: 'wisdom' },
  { reference: 'Philippians 4:6', book: 'Philippians', bookSlug: 'philippians', chapter: 4, verse: 6, text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.', theme: 'Prayer', themeSlug: 'prayer' },
  { reference: 'Romans 8:28', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 28, text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', theme: 'Providence', themeSlug: 'gods-promises' },
  { reference: 'Ephesians 2:8', book: 'Ephesians', bookSlug: 'ephesians', chapter: 2, verse: 8, text: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.', theme: 'Grace', themeSlug: 'grace' },
  { reference: 'Psalm 23:1', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.', theme: 'Comfort', themeSlug: 'comfort' },
  { reference: 'Isaiah 41:10', book: 'Isaiah', bookSlug: 'isaiah', chapter: 41, verse: 10, text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Romans 12:2', book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 2, text: 'And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.', theme: 'Transformation', themeSlug: 'faith' },
  { reference: 'John 14:6', book: 'John', bookSlug: 'john', chapter: 14, verse: 6, text: 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.', theme: 'Truth', themeSlug: 'jesus' },
  { reference: 'Matthew 6:33', book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 33, text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.', theme: 'Priorities', themeSlug: 'faith' },
  { reference: 'Joshua 1:9', book: 'Joshua', bookSlug: 'joshua', chapter: 1, verse: 9, text: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Isaiah 40:31', book: 'Isaiah', bookSlug: 'isaiah', chapter: 40, verse: 31, text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.', theme: 'Renewal', themeSlug: 'strength' },
  { reference: 'Romans 5:8', book: 'Romans', bookSlug: 'romans', chapter: 5, verse: 8, text: 'But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.', theme: 'Love', themeSlug: 'love' },
  { reference: 'Galatians 5:22\u201323', book: 'Galatians', bookSlug: 'galatians', chapter: 5, verse: 22, endVerse: 23, text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.', theme: 'Spiritual Fruit', themeSlug: 'holy-spirit' },
  { reference: 'Hebrews 11:1', book: 'Hebrews', bookSlug: 'hebrews', chapter: 11, verse: 1, text: 'Now faith is the substance of things hoped for, the evidence of things not seen.', theme: 'Faith', themeSlug: 'faith' },
  { reference: 'Romans 6:23', book: 'Romans', bookSlug: 'romans', chapter: 6, verse: 23, text: 'For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.', theme: 'Salvation', themeSlug: 'salvation' },
  { reference: '2 Timothy 1:7', book: '2 Timothy', bookSlug: '2-timothy', chapter: 1, verse: 7, text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.', theme: 'Power', themeSlug: 'strength' },
  { reference: 'Psalm 46:1', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 1, text: 'God is our refuge and strength, a very present help in trouble.', theme: 'Refuge', themeSlug: 'comfort' },
  { reference: 'Matthew 11:28', book: 'Matthew', bookSlug: 'matthew', chapter: 11, verse: 28, text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.', theme: 'Rest', themeSlug: 'comfort' },
  { reference: '1 Corinthians 13:4\u20137', book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 13, verse: 4, endVerse: 7, text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.', theme: 'Love', themeSlug: 'love' },
  { reference: 'Psalm 119:105', book: 'Psalms', bookSlug: 'psalms', chapter: 119, verse: 105, text: 'Thy word is a lamp unto my feet, and a light unto my path.', theme: 'Guidance', themeSlug: 'wisdom' },
  { reference: 'Proverbs 22:6', book: 'Proverbs', bookSlug: 'proverbs', chapter: 22, verse: 6, text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.', theme: 'Parenting', themeSlug: 'family' },
  { reference: 'James 1:2\u20133', book: 'James', bookSlug: 'james', chapter: 1, verse: 2, endVerse: 3, text: 'My brethren, count it all joy when ye fall into divers temptations; Knowing this, that the trying of your faith worketh patience.', theme: 'Trials', themeSlug: 'perseverance' },
  { reference: 'John 1:1', book: 'John', bookSlug: 'john', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.', theme: 'Deity of Christ', themeSlug: 'jesus' },
  { reference: 'Genesis 1:1', book: 'Genesis', bookSlug: 'genesis', chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.', theme: 'Creation', themeSlug: 'creation' },
  { reference: 'Psalm 27:1', book: 'Psalms', bookSlug: 'psalms', chapter: 27, verse: 1, text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?', theme: 'Fearlessness', themeSlug: 'courage' },
  { reference: 'Isaiah 53:5', book: 'Isaiah', bookSlug: 'isaiah', chapter: 53, verse: 5, text: 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.', theme: 'Atonement', themeSlug: 'salvation' },
  { reference: 'Ephesians 6:10\u201311', book: 'Ephesians', bookSlug: 'ephesians', chapter: 6, verse: 10, endVerse: 11, text: 'Finally, my brethren, be strong in the Lord, and in the power of his might. Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.', theme: 'Spiritual Warfare', themeSlug: 'spiritual-warfare' },
  { reference: 'Psalm 37:4', book: 'Psalms', bookSlug: 'psalms', chapter: 37, verse: 4, text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.', theme: 'Desire', themeSlug: 'faith' },
];

const POPULAR_VERSES_2: PopularVerse[] = [
  { reference: 'John 8:32', book: 'John', bookSlug: 'john', chapter: 8, verse: 32, text: 'And ye shall know the truth, and the truth shall make you free.', theme: 'Freedom', themeSlug: 'freedom' },
  { reference: 'Proverbs 18:10', book: 'Proverbs', bookSlug: 'proverbs', chapter: 18, verse: 10, text: 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.', theme: 'Protection', themeSlug: 'protection' },
  { reference: 'Matthew 5:16', book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 16, text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.', theme: 'Witness', themeSlug: 'evangelism' },
  { reference: 'Romans 10:9', book: 'Romans', bookSlug: 'romans', chapter: 10, verse: 9, text: 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.', theme: 'Confession', themeSlug: 'salvation' },
  { reference: 'Colossians 3:23', book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 23, text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.', theme: 'Work', themeSlug: 'faith' },
  { reference: '1 Peter 5:7', book: '1 Peter', bookSlug: '1-peter', chapter: 5, verse: 7, text: 'Casting all your care upon him; for he careth for you.', theme: 'Anxiety', themeSlug: 'worry' },
  { reference: 'Psalm 139:14', book: 'Psalms', bookSlug: 'psalms', chapter: 139, verse: 14, text: 'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.', theme: 'Identity', themeSlug: 'praise' },
  { reference: 'Micah 6:8', book: 'Micah', bookSlug: 'micah', chapter: 6, verse: 8, text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?', theme: 'Righteousness', themeSlug: 'righteousness' },
  { reference: 'Lamentations 3:22\u201323', book: 'Lamentations', bookSlug: 'lamentations', chapter: 3, verse: 22, endVerse: 23, text: 'It is of the LORD\u2019s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.', theme: 'Faithfulness', themeSlug: 'gods-promises' },
  { reference: '2 Corinthians 5:17', book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 5, verse: 17, text: 'Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.', theme: 'New Life', themeSlug: 'salvation' },
  { reference: 'John 16:33', book: 'John', bookSlug: 'john', chapter: 16, verse: 33, text: 'These things I have spoken unto you, that in me ye might have peace. In the world ye shall have tribulation: but be of good cheer; I have overcome the world.', theme: 'Overcoming', themeSlug: 'peace' },
  { reference: 'Psalm 91:1', book: 'Psalms', bookSlug: 'psalms', chapter: 91, verse: 1, text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.', theme: 'Dwelling', themeSlug: 'protection' },
  { reference: 'Isaiah 26:3', book: 'Isaiah', bookSlug: 'isaiah', chapter: 26, verse: 3, text: 'Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee.', theme: 'Peace', themeSlug: 'peace' },
  { reference: 'Matthew 6:34', book: 'Matthew', bookSlug: 'matthew', chapter: 6, verse: 34, text: 'Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.', theme: 'Worry', themeSlug: 'worry' },
  { reference: 'Proverbs 4:23', book: 'Proverbs', bookSlug: 'proverbs', chapter: 4, verse: 23, text: 'Keep thy heart with all diligence; for out of it are the issues of life.', theme: 'Heart', themeSlug: 'wisdom' },
  { reference: '1 John 4:19', book: '1 John', bookSlug: '1-john', chapter: 4, verse: 19, text: 'We love him, because he first loved us.', theme: 'Love', themeSlug: 'love' },
  { reference: 'Revelation 21:4', book: 'Revelation', bookSlug: 'revelation', chapter: 21, verse: 4, text: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.', theme: 'Eternity', themeSlug: 'heaven' },
  { reference: 'Proverbs 16:3', book: 'Proverbs', bookSlug: 'proverbs', chapter: 16, verse: 3, text: 'Commit thy works unto the LORD, and thy thoughts shall be established.', theme: 'Commitment', themeSlug: 'faith' },
  { reference: 'Psalm 34:8', book: 'Psalms', bookSlug: 'psalms', chapter: 34, verse: 8, text: 'O taste and see that the LORD is good: blessed is the man that trusteth in him.', theme: 'Blessing', themeSlug: 'trust' },
  { reference: 'Deuteronomy 31:6', book: 'Deuteronomy', bookSlug: 'deuteronomy', chapter: 31, verse: 6, text: 'Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.', theme: 'Courage', themeSlug: 'courage' },
  { reference: 'Romans 8:38\u201339', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 38, endVerse: 39, text: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.', theme: 'Eternal Love', themeSlug: 'love' },
  { reference: '2 Corinthians 12:9', book: '2 Corinthians', bookSlug: '2-corinthians', chapter: 12, verse: 9, text: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness. Most gladly therefore will I rather glory in my infirmities, that the power of Christ may rest upon me.', theme: 'Grace', themeSlug: 'grace' },
  { reference: 'Psalm 23:4', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 4, text: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.', theme: 'Comfort', themeSlug: 'comfort' },
  { reference: 'Matthew 7:7', book: 'Matthew', bookSlug: 'matthew', chapter: 7, verse: 7, text: 'Ask, and it shall be given you; seek, and ye shall find; knock, and it shall be opened unto you.', theme: 'Prayer', themeSlug: 'prayer' },
  { reference: 'Psalm 100:4\u20135', book: 'Psalms', bookSlug: 'psalms', chapter: 100, verse: 4, endVerse: 5, text: 'Enter into his gates with thanksgiving, and into his courts with praise: be thankful unto him, and bless his name. For the LORD is good; his mercy is everlasting; and his truth endureth to all generations.', theme: 'Thanksgiving', themeSlug: 'praise' },
  { reference: 'Hebrews 12:1\u20132', book: 'Hebrews', bookSlug: 'hebrews', chapter: 12, verse: 1, endVerse: 2, text: 'Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith.', theme: 'Perseverance', themeSlug: 'perseverance' },
  { reference: 'James 4:7', book: 'James', bookSlug: 'james', chapter: 4, verse: 7, text: 'Submit yourselves therefore to God. Resist the devil, and he will flee from you.', theme: 'Spiritual Warfare', themeSlug: 'spiritual-warfare' },
  { reference: '1 John 1:9', book: '1 John', bookSlug: '1-john', chapter: 1, verse: 9, text: 'If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'Ephesians 4:32', book: 'Ephesians', bookSlug: 'ephesians', chapter: 4, verse: 32, text: 'And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\u2019s sake hath forgiven you.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'Psalm 103:12', book: 'Psalms', bookSlug: 'psalms', chapter: 103, verse: 12, text: 'As far as the east is from the west, so far hath he removed our transgressions from us.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'John 14:27', book: 'John', bookSlug: 'john', chapter: 14, verse: 27, text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.', theme: 'Peace', themeSlug: 'peace' },
  { reference: 'Nahum 1:7', book: 'Nahum', bookSlug: 'nahum', chapter: 1, verse: 7, text: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.', theme: 'Protection', themeSlug: 'protection' },
  { reference: 'Matthew 19:26', book: 'Matthew', bookSlug: 'matthew', chapter: 19, verse: 26, text: 'But Jesus beheld them, and said unto them, With men this is impossible; but with God all things are possible.', theme: 'Faith', themeSlug: 'faith' },
  { reference: 'Psalm 121:1\u20132', book: 'Psalms', bookSlug: 'psalms', chapter: 121, verse: 1, endVerse: 2, text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.', theme: 'Help', themeSlug: 'comfort' },
];

const POPULAR_VERSES_3: PopularVerse[] = [
  { reference: 'Romans 12:12', book: 'Romans', bookSlug: 'romans', chapter: 12, verse: 12, text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.', theme: 'Perseverance', themeSlug: 'perseverance' },
  { reference: 'Psalm 56:3', book: 'Psalms', bookSlug: 'psalms', chapter: 56, verse: 3, text: 'What time I am afraid, I will trust in thee.', theme: 'Trust', themeSlug: 'trust' },
  { reference: 'Hebrews 13:8', book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 8, text: 'Jesus Christ the same yesterday, and to day, and for ever.', theme: 'Unchanging God', themeSlug: 'jesus' },
  { reference: 'Mark 10:27', book: 'Mark', bookSlug: 'mark', chapter: 10, verse: 27, text: 'And Jesus looking upon them saith, With men it is impossible, but not with God: for with God all things are possible.', theme: 'Faith', themeSlug: 'faith' },
  { reference: '1 Thessalonians 5:16\u201318', book: '1 Thessalonians', bookSlug: '1-thessalonians', chapter: 5, verse: 16, endVerse: 18, text: 'Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.', theme: 'Gratitude', themeSlug: 'praise' },
  { reference: 'John 15:13', book: 'John', bookSlug: 'john', chapter: 15, verse: 13, text: 'Greater love hath no man than this, that a man lay down his life for his friends.', theme: 'Sacrifice', themeSlug: 'love' },
  { reference: 'Proverbs 27:17', book: 'Proverbs', bookSlug: 'proverbs', chapter: 27, verse: 17, text: 'Iron sharpeneth iron; so a man sharpeneth the countenance of his friend.', theme: 'Fellowship', themeSlug: 'friendship' },
  { reference: 'Psalm 118:24', book: 'Psalms', bookSlug: 'psalms', chapter: 118, verse: 24, text: 'This is the day which the LORD hath made; we will rejoice and be glad in it.', theme: 'Joy', themeSlug: 'joy' },
  { reference: 'Romans 15:13', book: 'Romans', bookSlug: 'romans', chapter: 15, verse: 13, text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.', theme: 'Hope', themeSlug: 'hope' },
  { reference: 'Matthew 5:44', book: 'Matthew', bookSlug: 'matthew', chapter: 5, verse: 44, text: 'But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you.', theme: 'Forgiveness', themeSlug: 'forgiveness' },
  { reference: 'Psalm 16:11', book: 'Psalms', bookSlug: 'psalms', chapter: 16, verse: 11, text: 'Thou wilt shew me the path of life: in thy presence is fulness of joy; at thy right hand there are pleasures for evermore.', theme: 'Joy', themeSlug: 'joy' },
  { reference: 'Colossians 3:2', book: 'Colossians', bookSlug: 'colossians', chapter: 3, verse: 2, text: 'Set your affection on things above, not on things on the earth.', theme: 'Priorities', themeSlug: 'faith' },
  { reference: 'Psalm 51:10', book: 'Psalms', bookSlug: 'psalms', chapter: 51, verse: 10, text: 'Create in me a clean heart, O God; and renew a right spirit within me.', theme: 'Repentance', themeSlug: 'repentance' },
  { reference: 'Isaiah 43:2', book: 'Isaiah', bookSlug: 'isaiah', chapter: 43, verse: 2, text: 'When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned; neither shall the flame kindle upon thee.', theme: 'Protection', themeSlug: 'protection' },
  { reference: '2 Chronicles 7:14', book: '2 Chronicles', bookSlug: '2-chronicles', chapter: 7, verse: 14, text: 'If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.', theme: 'Repentance', themeSlug: 'repentance' },
  { reference: 'Galatians 2:20', book: 'Galatians', bookSlug: 'galatians', chapter: 2, verse: 20, text: 'I am crucified with Christ: nevertheless I live; yet not I, but Christ liveth in me: and the life which I now live in the flesh I live by the faith of the Son of God, who loved me, and gave himself for me.', theme: 'New Life', themeSlug: 'salvation' },
  { reference: 'Psalm 46:10', book: 'Psalms', bookSlug: 'psalms', chapter: 46, verse: 10, text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.', theme: 'Stillness', themeSlug: 'peace' },
  { reference: 'Acts 1:8', book: 'Acts', bookSlug: 'acts', chapter: 1, verse: 8, text: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.', theme: 'Holy Spirit', themeSlug: 'holy-spirit' },
  { reference: 'Philippians 2:3\u20134', book: 'Philippians', bookSlug: 'philippians', chapter: 2, verse: 3, endVerse: 4, text: 'Let nothing be done through strife or vainglory; but in lowliness of mind let each esteem other better than themselves. Look not every man on his own things, but every man also on the things of others.', theme: 'Humility', themeSlug: 'humility' },
  { reference: 'Psalm 23:6', book: 'Psalms', bookSlug: 'psalms', chapter: 23, verse: 6, text: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.', theme: 'Blessing', themeSlug: 'gods-promises' },
  { reference: 'John 11:25\u201326', book: 'John', bookSlug: 'john', chapter: 11, verse: 25, endVerse: 26, text: 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: And whosoever liveth and believeth in me shall never die.', theme: 'Resurrection', themeSlug: 'eternal-life' },
  { reference: 'Philippians 1:6', book: 'Philippians', bookSlug: 'philippians', chapter: 1, verse: 6, text: 'Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.', theme: 'Assurance', themeSlug: 'gods-promises' },
  { reference: 'Ecclesiastes 3:1', book: 'Ecclesiastes', bookSlug: 'ecclesiastes', chapter: 3, verse: 1, text: 'To every thing there is a season, and a time to every purpose under the heaven.', theme: 'Seasons', themeSlug: 'wisdom' },
  { reference: 'Matthew 22:37\u201339', book: 'Matthew', bookSlug: 'matthew', chapter: 22, verse: 37, endVerse: 39, text: 'Jesus said unto him, Thou shalt love the Lord thy God with all thy heart, and with all thy soul, and with all thy mind. This is the first and great commandment. And the second is like unto it, Thou shalt love thy neighbour as thyself.', theme: 'Greatest Commandment', themeSlug: 'love' },
  { reference: '1 Corinthians 10:13', book: '1 Corinthians', bookSlug: '1-corinthians', chapter: 10, verse: 13, text: 'There hath no temptation taken you but such as is common to man: but God is faithful, who will not suffer you to be tempted above that ye are able; but will with the temptation also make a way to escape, that ye may be able to bear it.', theme: 'Temptation', themeSlug: 'perseverance' },
  { reference: 'Titus 3:5', book: 'Titus', bookSlug: 'titus', chapter: 3, verse: 5, text: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.', theme: 'Mercy', themeSlug: 'grace' },
  { reference: 'Psalm 32:8', book: 'Psalms', bookSlug: 'psalms', chapter: 32, verse: 8, text: 'I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye.', theme: 'Guidance', themeSlug: 'wisdom' },
  { reference: 'Isaiah 55:8\u20139', book: 'Isaiah', bookSlug: 'isaiah', chapter: 55, verse: 8, endVerse: 9, text: 'For my thoughts are not your thoughts, neither are your ways my ways, saith the LORD. For as the heavens are higher than the earth, so are my ways higher than your ways, and my thoughts than your thoughts.', theme: 'Sovereignty', themeSlug: 'trust' },
  { reference: 'Romans 8:1', book: 'Romans', bookSlug: 'romans', chapter: 8, verse: 1, text: 'There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit.', theme: 'Freedom', themeSlug: 'freedom' },
  { reference: 'John 13:34\u201335', book: 'John', bookSlug: 'john', chapter: 13, verse: 34, endVerse: 35, text: 'A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another. By this shall all men know that ye are my disciples, if ye have love one to another.', theme: 'Love', themeSlug: 'love' },
  { reference: 'Hebrews 4:12', book: 'Hebrews', bookSlug: 'hebrews', chapter: 4, verse: 12, text: 'For the word of God is quick, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul and spirit, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.', theme: 'Scripture', themeSlug: 'bible' },
  { reference: 'Hebrews 13:5', book: 'Hebrews', bookSlug: 'hebrews', chapter: 13, verse: 5, text: 'Let your conversation be without covetousness; and be content with such things as ye have: for he hath said, I will never leave thee, nor forsake thee.', theme: 'Contentment', themeSlug: 'trust' },
];

const ALL_VERSES: PopularVerse[] = [...POPULAR_VERSES, ...POPULAR_VERSES_2, ...POPULAR_VERSES_3];

const OT_SLUGS = ['genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','song-of-solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];

function verseUrl(v: PopularVerse): string {
  return `/verses/${v.bookSlug}/${v.chapter}/${v.verse}`;
}

function getUniqueThemes(verses: PopularVerse[]): string[] {
  const seen = new Set<string>();
  for (const v of verses) seen.add(v.theme);
  return Array.from(seen);
}

function getThemeGroups(verses: PopularVerse[]): Record<string, PopularVerse[]> {
  const groups: Record<string, PopularVerse[]> = {};
  for (const v of verses) {
    if (!groups[v.theme]) groups[v.theme] = [];
    groups[v.theme].push(v);
  }
  return groups;
}

export const metadata: Metadata = {
  title: '100 Most Popular Bible Verses \u2014 Most Searched, Quoted & Memorized Scriptures in the King James Bible (KJV) With Full Text',
  description:
    'The 100 most popular Bible verses ranked by search volume, memorization frequency, and citation data. Full KJV text for each scripture with study links, cross-references, and chapter quizzes. From John 3:16 to Hebrews 13:5 \u2014 every verse Christians search for, memorize, and share most.',
  keywords: [
    'most popular bible verses', 'most searched bible verses', 'most read bible verses',
    'most famous bible verses', 'top bible verses', 'best bible verses',
    'most quoted bible verses', 'most memorized scripture', 'top 100 bible verses',
    'popular scriptures KJV', 'bible verses everyone should know',
  ],
  openGraph: {
    title: '100 Most Popular Bible Verses (KJV) \u2014 Full Text & Study Links',
    description: 'The 100 most searched, quoted, and memorized Bible verses with full King James Version text.',
    url: '/popular-bible-verses',
    type: 'website',
  },
  alternates: { canonical: '/popular-bible-verses' },
};

export default function PopularBibleVersesPage() {
  const themes = getUniqueThemes(ALL_VERSES);
  const themeGroups = getThemeGroups(ALL_VERSES);
  const otVerses = ALL_VERSES.filter(v => OT_SLUGS.includes(v.bookSlug));
  const ntVerses = ALL_VERSES.filter(v => !OT_SLUGS.includes(v.bookSlug));
  const uniqueBooks = new Set(ALL_VERSES.map(v => v.bookSlug));

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://biblemaximum.com/' },
      { '@type': 'ListItem', position: 2, name: 'Bible Quotes', item: 'https://biblemaximum.com/bible-quotes' },
      { '@type': 'ListItem', position: 3, name: '100 Most Popular Bible Verses' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '100 Most Popular Bible Verses',
    description: metadata.description,
    url: 'https://biblemaximum.com/popular-bible-verses',
    numberOfItems: ALL_VERSES.length,
    publisher: { '@type': 'Organization', name: 'Bible Maximum', url: 'https://biblemaximum.com' },
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '100 Most Popular Bible Verses',
    numberOfItems: ALL_VERSES.length,
    itemListElement: ALL_VERSES.slice(0, 10).map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.reference,
      description: v.text,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question', name: 'What is the most popular verse in the Bible?',
        acceptedAnswer: { '@type': 'Answer', text: 'John 3:16 is the most popular Bible verse worldwide. It reads: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life." It consistently ranks #1 on YouVersion, BibleGateway, and Google search data for Bible-related queries. This single verse encapsulates the gospel message of salvation through Jesus Christ.' },
      },
      {
        '@type': 'Question', name: 'What are the top 10 Bible verses everyone should know?',
        acceptedAnswer: { '@type': 'Answer', text: 'The top 10 most popular Bible verses are: (1) John 3:16 \u2014 Salvation, (2) Jeremiah 29:11 \u2014 Hope, (3) Philippians 4:13 \u2014 Strength, (4) John 10:10 \u2014 Abundant Life, (5) Proverbs 3:5\u20136 \u2014 Trust, (6) Matthew 28:19 \u2014 Great Commission, (7) Philippians 4:8 \u2014 Thought Life, (8) Philippians 4:6 \u2014 Prayer, (9) Romans 8:28 \u2014 Providence, and (10) Ephesians 2:8 \u2014 Grace. These verses cover the foundational themes of the Christian faith.' },
      },
      {
        '@type': 'Question', name: 'What is the most Googled Bible verse?',
        acceptedAnswer: { '@type': 'Answer', text: 'According to Google Trends and search volume data, John 3:16, Jeremiah 29:11, and Philippians 4:13 consistently rank as the most Googled Bible verses year after year. Search interest spikes around Easter (John 3:16), graduation season (Jeremiah 29:11, Philippians 4:13), and during times of national crisis.' },
      },
      {
        '@type': 'Question', name: 'What is the most memorized scripture?',
        acceptedAnswer: { '@type': 'Answer', text: 'John 3:16 is the most memorized scripture in Christianity, followed closely by Psalm 23:1 ("The LORD is my shepherd; I shall not want") and Romans 8:28 ("And we know that all things work together for good..."). These passages are often the first verses taught to children in Sunday school and Vacation Bible School programs.' },
      },
      {
        '@type': 'Question', name: 'How many verses are in the Bible?',
        acceptedAnswer: { '@type': 'Answer', text: 'The King James Version of the Bible contains 31,102 verses across 66 books \u2014 23,145 in the Old Testament and 7,957 in the New Testament. Among these, certain passages have become universally recognized through sermons, songs, memorization programs, and social media sharing.' },
      },
      {
        '@type': 'Question', name: 'What Bible translation are these verses from?',
        acceptedAnswer: { '@type': 'Answer', text: 'All 100 verses on this page are presented in the King James Version (KJV), first published in 1611. The KJV remains one of the most widely read, memorized, and quoted English Bible translations, prized for its literary beauty and its enduring influence on the English language, hymnody, and Christian devotional literature.' },
      },
    ],
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={collectionSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={faqSchema} />

      <Breadcrumb items={[
        { label: 'Bible Quotes', href: '/bible-quotes' },
        { label: '100 Most Popular Bible Verses' },
      ]} />

      <div className="min-h-screen bg-primary-light/30">
        {/* Hero */}
        <section className="relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-sm border border-grace overflow-hidden mt-6 mb-8">
              <div className="relative h-48 md:h-56 bg-gradient-to-r from-amber-800 to-amber-900">
                <Image
                  src="/images/rocinanterelampago_central_verse_in_the_Bible_--ar_21_--profile_2a944dbf-6229-46ed-bb1e-0b1ec69c620b.png"
                  alt="100 Most Popular Bible Verses"
                  fill
                  className="object-cover opacity-25"
                  priority
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    100 Most Popular Bible Verses
                  </h1>
                  <p className="text-amber-100 max-w-2xl mb-4">
                    The most searched, quoted, and memorized scriptures in the King James Bible -- ranked by search volume, citation frequency, and devotional usage worldwide.
                  </p>
                  <Link
                    href="/bible-quizzes"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md w-fit"
                  >
                    Test Your Knowledge -- Take a Quiz
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-4 divide-x divide-grace border-b border-grace">
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">100</p>
                  <p className="text-sm text-primary-dark/70">Popular Verses</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{themes.length}</p>
                  <p className="text-sm text-primary-dark/70">Themes</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">KJV</p>
                  <p className="text-sm text-primary-dark/70">Translation</p>
                </div>
                <div className="p-4 text-center">
                  <p className="text-2xl font-bold text-blue-600">{uniqueBooks.size}</p>
                  <p className="text-sm text-primary-dark/70">Books</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NLP Article Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-3">
              What Are the Most Popular Bible Verses?
            </h2>
            <div className="text-primary-dark/80 leading-relaxed space-y-3">
              <p>
                Out of more than 31,000 verses in Scripture, a small number of passages have risen to extraordinary prominence in the life of the Church and in popular culture. These are the <strong>most popular Bible verses</strong> -- the scriptures that Christians memorize first, preachers quote most often, and millions of people search for online every day. They represent the heart of God&apos;s Word: His love for the world, His plan of salvation through Jesus Christ, and His promises of comfort, strength, and eternal life.
              </p>
              <p>
                What makes a Bible verse &ldquo;popular&rdquo;? The ranking below draws on multiple data sources: Google search volume and trends, the YouVersion Bible App&apos;s most-bookmarked and most-shared passages, BibleGateway&apos;s annual top-searched-verses reports, academic citation studies, and social media sharing data analyzed by organizations like World Vision and Ahrefs. Verses like <strong>John 3:16</strong>, <strong>Psalm 23</strong>, and <strong>Romans 8:28</strong> appear at the top of virtually every list because they speak to universal human needs -- hope in suffering, assurance of God&apos;s love, and the promise of eternal life through faith in Christ.
              </p>
              <p>
                The <strong>King James Version</strong> (KJV) holds a unique place in shaping which verses are most widely quoted. Published in 1611, its majestic prose has influenced English hymnody, literature, law, and everyday speech for over four centuries. Phrases from the KJV -- &ldquo;the valley of the shadow of death,&rdquo; &ldquo;a lamp unto my feet,&rdquo; &ldquo;the truth shall make you free&rdquo; -- have entered the common vocabulary of the English-speaking world. Whether you are beginning a daily devotional practice, preparing a sermon, memorizing scripture for the first time, or seeking encouragement during a trial, these 100 passages offer a comprehensive cross-reference of the Old Testament and New Testament&apos;s most powerful words of faith, hope, love, grace, forgiveness, prayer, and the gospel message.
              </p>
            </div>
          </div>
        </section>

        {/* Theme Tags */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-lg font-bold text-scripture mb-3">Browse by Theme</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map(theme => (
              <a
                key={theme}
                href={`#theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-3 py-1.5 bg-white border border-grace rounded-lg text-sm text-primary-dark/80 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {theme}
              </a>
            ))}
          </div>
        </section>

        {/* Main Verse List */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <ol className="space-y-4">
            {ALL_VERSES.map((verse, idx) => (
              <li
                key={verse.reference}
                id={idx === 0 ? `theme-${verse.theme.toLowerCase().replace(/\s+/g, '-')}` : undefined}
                className="bg-white rounded-xl border border-grace hover:border-blue-200 hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="flex items-start gap-4 p-5 md:p-6">
                  <span className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Link href={verseUrl(verse)} className="text-lg font-display font-bold text-scripture hover:text-blue-600 transition-colors">
                        {verse.reference}
                      </Link>
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100">
                        {verse.theme}
                      </span>
                    </div>
                    <blockquote className="text-primary-dark/85 leading-relaxed italic border-l-3 border-blue-200 pl-4">
                      &ldquo;{verse.text}&rdquo;
                    </blockquote>
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                      <Link href={verseUrl(verse)} className="text-blue-600 hover:underline font-medium">Study this verse</Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link href={`/chapters/${verse.bookSlug}/${verse.chapter}`} className="text-blue-600 hover:underline">Chapter {verse.chapter}</Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link href={`/${verse.bookSlug}-chapters`} className="text-blue-600 hover:underline">{verse.book} Chapters</Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link href={`/${verse.bookSlug}-${verse.chapter}-quiz`} className="text-blue-600 hover:underline font-semibold">Chapter Quiz</Link>
                      <span className="text-primary-dark/30">|</span>
                      <Link href={`/bible-quotes/${verse.themeSlug}`} className="text-blue-600 hover:underline">Bible Quotes About {verse.theme}</Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </main>

        {/* Mid-Content CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 md:p-8 text-white">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
              Think You Know These Verses? Prove It.
            </h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              Take a chapter quiz from any book featured on this page. 15 questions per quiz with instant scoring and verse-by-verse explanations.
            </p>
            <Link href="/bible-quizzes" className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-md">
              Take a Quiz Now
            </Link>
          </div>
        </section>

        {/* Testament Breakdown */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Popular Verses by Testament</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-scripture mb-2">Old Testament <span className="text-sm font-normal text-primary-dark/60 ml-2">({otVerses.length} verses)</span></h3>
                <ul className="space-y-1">
                  {otVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-blue-600 hover:underline">{v.reference}</Link>
                      <span className="text-sm text-primary-dark/50 ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-2">New Testament <span className="text-sm font-normal text-primary-dark/60 ml-2">({ntVerses.length} verses)</span></h3>
                <ul className="space-y-1">
                  {ntVerses.map(v => (
                    <li key={v.reference}>
                      <Link href={verseUrl(v)} className="text-sm text-blue-600 hover:underline">{v.reference}</Link>
                      <span className="text-sm text-primary-dark/50 ml-1">-- {v.book}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Verses by Theme */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Verses by Theme</h2>
            <p className="text-sm text-primary-dark/70 mb-5">The 100 most popular Bible verses grouped by spiritual theme. Click any theme heading to explore more verses on that topic.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Object.entries(themeGroups).map(([theme, verses]) => (
                <div key={theme} id={`theme-${theme.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Link href={`/bible-quotes/${verses[0].themeSlug}`} className="font-bold text-scripture hover:text-blue-600 transition-colors">
                    {theme}
                  </Link>
                  <span className="text-sm text-primary-dark/50 ml-1">({verses.length})</span>
                  <ul className="mt-1 space-y-0.5">
                    {verses.map(v => (
                      <li key={v.reference}>
                        <Link href={verseUrl(v)} className="text-sm text-blue-600 hover:underline">{v.reference}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most popular verse in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">John 3:16 is the most popular Bible verse worldwide: &ldquo;For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.&rdquo; It consistently ranks #1 on YouVersion, BibleGateway, and Google search trends for Bible-related queries.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What are the top 10 Bible verses everyone should know?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The top 10 are: (1) John 3:16 -- Salvation, (2) Jeremiah 29:11 -- Hope, (3) Philippians 4:13 -- Strength, (4) John 10:10 -- Abundant Life, (5) Proverbs 3:5&ndash;6 -- Trust, (6) Matthew 28:19 -- Great Commission, (7) Philippians 4:8 -- Thought Life, (8) Philippians 4:6 -- Prayer, (9) Romans 8:28 -- Providence, (10) Ephesians 2:8 -- Grace.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most Googled Bible verse?</h3>
                <p className="text-primary-dark/80 leading-relaxed">John 3:16, Jeremiah 29:11, and Philippians 4:13 consistently rank as the most Googled Bible verses. Search interest spikes around Easter (John 3:16), graduation season (Jeremiah 29:11, Philippians 4:13), and during times of national crisis or uncertainty.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What is the most memorized scripture?</h3>
                <p className="text-primary-dark/80 leading-relaxed">John 3:16 is the most memorized scripture in Christianity, followed by Psalm 23:1 (&ldquo;The LORD is my shepherd; I shall not want&rdquo;) and Romans 8:28. These passages are often the first verses taught to children in Sunday school and Vacation Bible School programs.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">How many verses are in the Bible?</h3>
                <p className="text-primary-dark/80 leading-relaxed">The King James Version contains 31,102 verses across 66 books -- 23,145 in the Old Testament and 7,957 in the New Testament. Among these, certain passages have become universally recognized through sermons, songs, memorization programs, and social media sharing.</p>
              </div>
              <div>
                <h3 className="font-bold text-scripture mb-1">What Bible translation are these verses from?</h3>
                <p className="text-primary-dark/80 leading-relaxed">All 100 verses on this page are from the King James Version (KJV), first published in 1611. The KJV remains one of the most widely read, memorized, and quoted English Bible translations, prized for its literary beauty and influence on the English language.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-white rounded-xl border border-grace p-6 md:p-8">
            <h2 className="text-xl font-display font-bold text-scripture mb-4">Continue Exploring Scripture</h2>
            <p className="text-sm text-primary-dark/70 mb-5">Deepen your Bible study with quizzes, devotionals, reading plans, and more.</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              <Link href="/bible-quizzes" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:shadow-sm transition-all">
                <span>Bible Quizzes</span>
              </Link>
              <Link href="/bible-quotes" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Quotes Hub</span>
              </Link>
              <Link href="/famous-bible-verses" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Famous Bible Verses</span>
              </Link>
              <Link href="/cross-references" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Cross References</span>
              </Link>
              <Link href="/bible-study-guides" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Study Guides</span>
              </Link>
              <Link href="/reading-plans" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Reading Plans</span>
              </Link>
              <Link href="/devotionals" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Daily Devotionals</span>
              </Link>
              <Link href="/topics" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Bible Topics</span>
              </Link>
              <Link href="/bible-chapter-summaries" className="flex items-center gap-3 px-4 py-3 bg-primary-light/30 border border-grace rounded-lg hover:border-blue-300 hover:shadow-sm transition-all group">
                <span className="font-medium text-scripture group-hover:text-blue-600 transition-colors">Chapter Summaries</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
