// ─────────────────────────────────────────────
//  FACTION DEFINITIONS
// ─────────────────────────────────────────────
export const FACTIONS = {
  gryffindor: {
    id: 'gryffindor',
    name: 'Gryffindor',
    color: '#C41E3A',
    accentColor: '#FFC500',
    glowColor: 'rgba(196, 30, 58, 0.55)',
    bgGlow: 'rgba(196, 30, 58, 0.12)',
    borderColor: '#FFC500',
    clusterX: 0.66,
    clusterY: 0.35,
    warClusterX: 0.75,
    warClusterY: 0.22,
    motto: 'Brave at heart',
    symbol: '🦁',
  },
  slytherin: {
    id: 'slytherin',
    name: 'Slytherin',
    color: '#1F6B45',
    accentColor: '#C0C0C0',
    glowColor: 'rgba(31, 107, 69, 0.55)',
    bgGlow: 'rgba(31, 107, 69, 0.12)',
    borderColor: '#C0C0C0',
    clusterX: 0.34,
    clusterY: 0.35,
    warClusterX: 0.22,
    warClusterY: 0.62,
    motto: 'Cunning folk',
    symbol: '🐍',
  },
  ravenclaw: {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    color: '#1A3A8C',
    accentColor: '#C08C28',
    glowColor: 'rgba(26, 58, 140, 0.55)',
    bgGlow: 'rgba(26, 58, 140, 0.12)',
    borderColor: '#C08C28',
    clusterX: 0.66,
    clusterY: 0.70,
    warClusterX: 0.62,
    warClusterY: 0.40,
    motto: 'Wit and wisdom',
    symbol: '🦅',
  },
  hufflepuff: {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    color: '#D4A017',
    accentColor: '#2C1810',
    glowColor: 'rgba(212, 160, 23, 0.55)',
    bgGlow: 'rgba(212, 160, 23, 0.12)',
    borderColor: '#D4A017',
    clusterX: 0.34,
    clusterY: 0.70,
    warClusterX: 0.58,
    warClusterY: 0.58,
    motto: 'Just and loyal',
    symbol: '🦡',
  },
  death_eaters: {
    id: 'death_eaters',
    name: 'Death Eaters',
    color: '#2A0000',
    accentColor: '#9B0000',
    glowColor: 'rgba(155, 0, 0, 0.65)',
    bgGlow: 'rgba(45, 0, 0, 0.25)',
    borderColor: '#9B0000',
    clusterX: 0.18,
    clusterY: 0.82,
    warClusterX: 0.20,
    warClusterY: 0.72,
    motto: 'Servants of the Dark Lord',
    symbol: '☠',
  },
  order: {
    id: 'order',
    name: 'Order of the Phoenix',
    color: '#B8860B',
    accentColor: '#FF8C00',
    glowColor: 'rgba(184, 134, 11, 0.55)',
    bgGlow: 'rgba(184, 134, 11, 0.12)',
    borderColor: '#FF8C00',
    clusterX: 0.82,
    clusterY: 0.82,
    warClusterX: 0.78,
    warClusterY: 0.60,
    motto: 'Defenders of the Light',
    symbol: '🔥',
  },
  neutral: {
    id: 'neutral',
    name: 'Neutral',
    color: '#5A5A5A',
    accentColor: '#9A9A9A',
    glowColor: 'rgba(90, 90, 90, 0.4)',
    bgGlow: 'rgba(90, 90, 90, 0.08)',
    borderColor: '#9A9A9A',
    clusterX: 0.50,
    clusterY: 0.50,
    warClusterX: 0.50,
    warClusterY: 0.44,
    motto: 'Unaligned',
    symbol: '⚡',
  },
};

// ─────────────────────────────────────────────
//  CHARACTER DATA  (62 characters)
// ─────────────────────────────────────────────
export const CHARACTERS = [
  // ── GRYFFINDOR ──────────────────────────────
  {
    id: 'harry_potter',
    name: 'Harry Potter',
    faction: 'gryffindor',
    role: 'The Chosen One',
    traits: ['Brave', 'Loyal', 'Self-sacrificing', 'Humble'],
    description:
      'The Boy Who Lived. Survived Voldemort\'s killing curse as an infant and was prophesied to be the one with the power to defeat the Dark Lord.',
    friends: ['ron_weasley', 'hermione_granger', 'neville_longbottom', 'luna_lovegood', 'ginny_weasley'],
    enemies: ['voldemort', 'draco_malfoy', 'bellatrix_lestrange', 'umbridge'],
    family: ['james_potter', 'lily_potter', 'sirius_black', 'dudley_dursley'],
    allies: ['dumbledore', 'remus_lupin', 'mad_eye_moody', 'kingsley'],
    romance: ['ginny_weasley'],
    importance: 10,
  },
  {
    id: 'ron_weasley',
    name: 'Ron Weasley',
    faction: 'gryffindor',
    role: 'Best Friend / Auror',
    traits: ['Loyal', 'Humorous', 'Brave', 'Insecure'],
    description:
      'Harry\'s loyal best friend from a large pure-blood wizarding family. His loyalty and courage proved vital in the fight against Voldemort.',
    friends: ['harry_potter', 'hermione_granger', 'neville_longbottom', 'fred_weasley', 'george_weasley'],
    enemies: ['voldemort', 'draco_malfoy', 'peter_pettigrew'],
    family: ['arthur_weasley', 'molly_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: ['dumbledore'],
    romance: ['hermione_granger'],
    importance: 9,
  },
  {
    id: 'hermione_granger',
    name: 'Hermione Granger',
    faction: 'gryffindor',
    role: 'Brightest Witch / Minister for Magic',
    traits: ['Brilliant', 'Principled', 'Resourceful', 'Compassionate'],
    description:
      'The brightest witch of her age. Her magical knowledge and quick thinking saved Harry and Ron countless times throughout their adventures.',
    friends: ['harry_potter', 'ron_weasley', 'neville_longbottom', 'luna_lovegood', 'ginny_weasley'],
    enemies: ['voldemort', 'draco_malfoy', 'umbridge', 'bellatrix_lestrange'],
    family: [],
    allies: ['dumbledore', 'mcgonagall'],
    romance: ['ron_weasley'],
    importance: 9,
  },
  {
    id: 'neville_longbottom',
    name: 'Neville Longbottom',
    faction: 'gryffindor',
    role: 'Student / Herbology Professor',
    traits: ['Brave', 'Resilient', 'Kind', 'Determined'],
    description:
      'Clumsy and uncertain at Hogwarts, Neville blossomed into one of the greatest heroes of the Second Wizarding War, ultimately slaying Nagini.',
    friends: ['harry_potter', 'hermione_granger', 'ron_weasley', 'luna_lovegood', 'ginny_weasley'],
    enemies: ['voldemort', 'bellatrix_lestrange', 'draco_malfoy'],
    family: ['frank_longbottom', 'alice_longbottom'],
    allies: ['dumbledore', 'mcgonagall'],
    romance: [],
    importance: 7,
  },
  {
    id: 'ginny_weasley',
    name: 'Ginny Weasley',
    faction: 'gryffindor',
    role: 'Student / Professional Quidditch Player',
    traits: ['Fierce', 'Confident', 'Talented', 'Witty'],
    description:
      'The only Weasley daughter, Ginny proved herself a powerful witch and a fierce fighter. She became Harry\'s love and the mother of his children.',
    friends: ['harry_potter', 'hermione_granger', 'luna_lovegood', 'neville_longbottom'],
    enemies: ['voldemort', 'draco_malfoy', 'umbridge'],
    family: ['ron_weasley', 'fred_weasley', 'george_weasley', 'arthur_weasley', 'molly_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: [],
    romance: ['harry_potter'],
    importance: 7,
  },
  {
    id: 'fred_weasley',
    name: 'Fred Weasley',
    faction: 'gryffindor',
    role: 'Prankster / Entrepreneur',
    traits: ['Funny', 'Daring', 'Creative', 'Loyal'],
    description:
      'The more outgoing twin, Fred co-founded Weasleys\' Wizard Wheezes. He died during the Battle of Hogwarts, a tremendous loss to all who knew him.',
    friends: ['ron_weasley', 'george_weasley', 'lee_jordan', 'harry_potter'],
    enemies: ['umbridge', 'voldemort'],
    family: ['george_weasley', 'ron_weasley', 'ginny_weasley', 'arthur_weasley', 'molly_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: [],
    romance: [],
    importance: 6,
  },
  {
    id: 'george_weasley',
    name: 'George Weasley',
    faction: 'gryffindor',
    role: 'Prankster / Entrepreneur',
    traits: ['Funny', 'Caring', 'Creative', 'Resilient'],
    description:
      'Fred\'s inseparable twin. After Fred\'s death, George continued Weasleys\' Wizard Wheezes in memory of his brother, eventually naming his son Fred.',
    friends: ['ron_weasley', 'fred_weasley', 'lee_jordan', 'harry_potter'],
    enemies: ['umbridge', 'voldemort'],
    family: ['fred_weasley', 'ron_weasley', 'ginny_weasley', 'arthur_weasley', 'molly_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: [],
    romance: [],
    importance: 6,
  },
  {
    id: 'seamus_finnigan',
    name: 'Seamus Finnigan',
    faction: 'gryffindor',
    role: 'Student',
    traits: ['Enthusiastic', 'Accident-prone', 'Loyal', 'Brave'],
    description:
      'Half-blood Irish Gryffindor with a remarkable talent for inadvertently causing explosions. A loyal member of Dumbledore\'s Army.',
    friends: ['harry_potter', 'ron_weasley', 'dean_thomas', 'neville_longbottom'],
    enemies: ['umbridge'],
    family: [],
    allies: [],
    romance: [],
    importance: 4,
  },
  {
    id: 'dean_thomas',
    name: 'Dean Thomas',
    faction: 'gryffindor',
    role: 'Student',
    traits: ['Artistic', 'Loyal', 'Brave', 'Good-natured'],
    description:
      'Muggle-born Gryffindor and passionate West Ham fan. Went on the run during Voldemort\'s reign before fighting in the Battle of Hogwarts.',
    friends: ['seamus_finnigan', 'ron_weasley', 'harry_potter'],
    enemies: ['voldemort'],
    family: [],
    allies: [],
    romance: ['ginny_weasley'],
    importance: 4,
  },
  {
    id: 'lee_jordan',
    name: 'Lee Jordan',
    faction: 'gryffindor',
    role: 'Quidditch Commentator / Resistance Radio Host',
    traits: ['Funny', 'Passionate', 'Courageous', 'Loyal'],
    description:
      'Fred and George\'s best friend, famous for his colorful Quidditch commentary. Hosted the underground resistance radio show "Potterwatch".',
    friends: ['fred_weasley', 'george_weasley', 'harry_potter'],
    enemies: ['umbridge', 'voldemort'],
    family: [],
    allies: [],
    romance: [],
    importance: 4,
  },
  {
    id: 'colin_creevey',
    name: 'Colin Creevey',
    faction: 'gryffindor',
    role: 'Student / DA Member',
    traits: ['Enthusiastic', 'Brave', 'Devoted', 'Innocent'],
    description:
      'Harry\'s biggest fan and an enthusiastic photographer. Despite being underage, Colin snuck back to fight in the Battle of Hogwarts and died heroically.',
    friends: ['harry_potter', 'neville_longbottom'],
    enemies: ['voldemort'],
    family: [],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'oliver_wood',
    name: 'Oliver Wood',
    faction: 'gryffindor',
    role: 'Quidditch Captain / Professional Player',
    traits: ['Obsessive', 'Strategic', 'Passionate', 'Leader'],
    description:
      'Gryffindor Quidditch captain who first put Harry on a broom. His obsession with winning the Quidditch Cup was matched only by his genuine bravery.',
    friends: ['harry_potter', 'fred_weasley', 'george_weasley'],
    enemies: [],
    family: [],
    allies: [],
    romance: [],
    importance: 4,
  },
  {
    id: 'mcgonagall',
    name: 'Minerva McGonagall',
    faction: 'gryffindor',
    role: 'Transfiguration Professor / Headmistress',
    traits: ['Strict', 'Fair', 'Courageous', 'Compassionate'],
    description:
      'Deputy Headmistress and Head of Gryffindor house. Stern but profoundly fair, McGonagall was one of the greatest witches and teachers of her era.',
    friends: ['dumbledore', 'harry_potter', 'hermione_granger'],
    enemies: ['voldemort', 'umbridge', 'lucius_malfoy'],
    family: [],
    allies: ['harry_potter', 'hermione_granger', 'kingsley', 'remus_lupin'],
    romance: [],
    importance: 7,
  },
  {
    id: 'hagrid',
    name: 'Rubeus Hagrid',
    faction: 'gryffindor',
    role: 'Keeper of Keys / Care of Magical Creatures Professor',
    traits: ['Gentle', 'Loyal', 'Loving', 'Brave'],
    description:
      'Half-giant groundskeeper of Hogwarts and one of Harry\'s first and most devoted friends. His love for dangerous creatures was legendary.',
    friends: ['harry_potter', 'ron_weasley', 'hermione_granger', 'dumbledore'],
    enemies: ['voldemort', 'lucius_malfoy', 'umbridge'],
    family: [],
    allies: ['dumbledore', 'mcgonagall'],
    romance: [],
    importance: 7,
  },
  {
    id: 'percy_weasley',
    name: 'Percy Weasley',
    faction: 'gryffindor',
    role: 'Ministry Official / Prefect',
    traits: ['Ambitious', 'Pompous', 'Loyal at heart', 'Redeemed'],
    description:
      'The Weasley with Ministry ambitions who temporarily sided with Fudge against his family. He returned to fight alongside them at the Battle of Hogwarts.',
    friends: ['ron_weasley'],
    enemies: ['voldemort'],
    family: ['ron_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'arthur_weasley', 'molly_weasley', 'bill_weasley', 'charlie_weasley'],
    allies: [],
    romance: [],
    importance: 5,
  },

  // ── SLYTHERIN ───────────────────────────────
  {
    id: 'voldemort',
    name: 'Lord Voldemort',
    faction: 'slytherin',
    role: 'Dark Lord',
    traits: ['Ruthless', 'Brilliant', 'Power-hungry', 'Merciless'],
    description:
      'Tom Marvolo Riddle, once a brilliant Hogwarts student, became the most feared Dark wizard of all time. Split his soul into seven Horcruxes in his quest for immortality.',
    friends: [],
    enemies: ['harry_potter', 'dumbledore', 'hermione_granger', 'ron_weasley', 'neville_longbottom'],
    family: [],
    allies: ['bellatrix_lestrange', 'lucius_malfoy', 'peter_pettigrew', 'fenrir_greyback', 'barty_crouch_jr', 'nagini'],
    romance: [],
    importance: 10,
  },
  {
    id: 'draco_malfoy',
    name: 'Draco Malfoy',
    faction: 'slytherin',
    role: 'Student / Death Eater (reluctant)',
    traits: ['Arrogant', 'Cunning', 'Cowardly', 'Conflicted'],
    description:
      'Harry\'s school rival, raised in privilege and pure-blood supremacy. Forced into service as a Death Eater, Draco ultimately chose not to identify Harry when captured.',
    friends: ['crabbe', 'goyle', 'pansy_parkinson', 'blaise_zabini'],
    enemies: ['harry_potter', 'ron_weasley', 'hermione_granger', 'neville_longbottom'],
    family: ['lucius_malfoy', 'narcissa_malfoy'],
    allies: ['voldemort'],
    romance: [],
    importance: 8,
  },
  {
    id: 'crabbe',
    name: 'Vincent Crabbe',
    faction: 'slytherin',
    role: 'Student / Death Eater',
    traits: ['Brutal', 'Stupid', 'Cruel', 'Follower'],
    description:
      'Draco\'s thuggish sidekick. Died in the Room of Requirement after losing control of Fiendfyre — a curse he conjured himself.',
    friends: ['draco_malfoy', 'goyle'],
    enemies: ['harry_potter', 'ron_weasley', 'hermione_granger'],
    family: [],
    allies: ['draco_malfoy'],
    romance: [],
    importance: 3,
  },
  {
    id: 'goyle',
    name: 'Gregory Goyle',
    faction: 'slytherin',
    role: 'Student / Death Eater',
    traits: ['Brutish', 'Slow', 'Menacing', 'Loyal to Draco'],
    description:
      'Draco\'s other constant companion, more brawn than brain. Present in the Room of Requirement during the Battle of Hogwarts.',
    friends: ['draco_malfoy', 'crabbe'],
    enemies: ['harry_potter', 'ron_weasley', 'hermione_granger'],
    family: [],
    allies: ['draco_malfoy'],
    romance: [],
    importance: 3,
  },
  {
    id: 'pansy_parkinson',
    name: 'Pansy Parkinson',
    faction: 'slytherin',
    role: 'Student / Prefect',
    traits: ['Snobbish', 'Cruel', 'Gossipy', 'Cowardly'],
    description:
      'Slytherin prefect and Draco\'s on-and-off girlfriend. Infamously suggested handing Harry over to Voldemort during the Battle of Hogwarts.',
    friends: ['draco_malfoy', 'blaise_zabini', 'millicent_bulstrode'],
    enemies: ['harry_potter', 'hermione_granger'],
    family: [],
    allies: [],
    romance: ['draco_malfoy'],
    importance: 4,
  },
  {
    id: 'blaise_zabini',
    name: 'Blaise Zabini',
    faction: 'slytherin',
    role: 'Student',
    traits: ['Arrogant', 'Handsome', 'Selective', 'Distant'],
    description:
      'A Slytherin who considered himself far above most other students, even many in his own house. Notably admitted into the Slug Club for his looks.',
    friends: ['draco_malfoy', 'pansy_parkinson'],
    enemies: ['harry_potter'],
    family: [],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'millicent_bulstrode',
    name: 'Millicent Bulstrode',
    faction: 'slytherin',
    role: 'Student',
    traits: ['Aggressive', 'Large', 'Unfriendly'],
    description:
      'A Slytherin student known for her physical strength and hostility toward Gryffindors. Her cat\'s hair caused Hermione\'s Polyjuice mishap.',
    friends: ['pansy_parkinson'],
    enemies: ['hermione_granger'],
    family: [],
    allies: [],
    romance: [],
    importance: 2,
  },
  {
    id: 'snape',
    name: 'Severus Snape',
    faction: 'slytherin',
    role: 'Potions Master / Double Agent',
    traits: ['Complex', 'Loyal (secretly)', 'Brilliant', 'Bitter'],
    description:
      'The Half-Blood Prince. Slytherin Head of House who appeared to serve Voldemort but had been Dumbledore\'s most crucial spy — driven by lifelong love for Lily Potter.',
    friends: ['lily_potter'],
    enemies: ['james_potter', 'sirius_black', 'remus_lupin'],
    family: [],
    allies: ['dumbledore', 'narcissa_malfoy'],
    romance: ['lily_potter'],
    importance: 9,
  },

  // ── RAVENCLAW ───────────────────────────────
  {
    id: 'luna_lovegood',
    name: 'Luna Lovegood',
    faction: 'ravenclaw',
    role: 'Student / Naturalist',
    traits: ['Eccentric', 'Perceptive', 'Fearless', 'Kind'],
    description:
      'Dreamy, wonderfully odd, and quietly fierce. Luna saw through pretense and lies that others could not and was one of the most courageous members of the DA.',
    friends: ['harry_potter', 'hermione_granger', 'ginny_weasley', 'neville_longbottom'],
    enemies: ['voldemort', 'umbridge'],
    family: ['xenophilius_lovegood'],
    allies: [],
    romance: [],
    importance: 7,
  },
  {
    id: 'cho_chang',
    name: 'Cho Chang',
    faction: 'ravenclaw',
    role: 'Student / Seeker',
    traits: ['Talented', 'Emotional', 'Brave', 'Kind'],
    description:
      'Ravenclaw Seeker and one of Hogwarts\' most popular students. Her grief over Cedric\'s death complicated her brief romance with Harry.',
    friends: ['luna_lovegood', 'cedric_diggory'],
    enemies: ['voldemort', 'umbridge'],
    family: [],
    allies: [],
    romance: ['harry_potter', 'cedric_diggory'],
    importance: 5,
  },
  {
    id: 'padma_patil',
    name: 'Padma Patil',
    faction: 'ravenclaw',
    role: 'Student / DA Member',
    traits: ['Bright', 'Confident', 'Kind'],
    description:
      'One of the Patil twins, sorted into Ravenclaw. Attended the Yule Ball with Ron (who largely ignored her) and later joined the DA.',
    friends: ['cho_chang', 'luna_lovegood'],
    enemies: [],
    family: ['parvati_patil'],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'parvati_patil',
    name: 'Parvati Patil',
    faction: 'gryffindor',
    role: 'Student / DA Member',
    traits: ['Sociable', 'Brave', 'Fashion-conscious'],
    description:
      'Padma\'s twin sister, sorted into Gryffindor. Attended the Yule Ball with Harry and was a loyal member of Dumbledore\'s Army.',
    friends: ['lavender_brown', 'hermione_granger'],
    enemies: [],
    family: ['padma_patil'],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'lavender_brown',
    name: 'Lavender Brown',
    faction: 'gryffindor',
    role: 'Student',
    traits: ['Romantic', 'Excitable', 'Loyal', 'Brave'],
    description:
      'An enthusiastic Divination student and Ron\'s brief girlfriend. She fought bravely in the Battle of Hogwarts and was badly injured by Fenrir Greyback.',
    friends: ['parvati_patil', 'hermione_granger'],
    enemies: ['voldemort', 'fenrir_greyback'],
    family: [],
    allies: [],
    romance: ['ron_weasley'],
    importance: 4,
  },
  {
    id: 'xenophilius_lovegood',
    name: 'Xenophilius Lovegood',
    faction: 'neutral',
    role: 'Journalist / Editor of The Quibbler',
    traits: ['Eccentric', 'Trusting', 'Devoted father', 'Misguided'],
    description:
      'Luna\'s father and publisher of The Quibbler. Betrayed Harry to Death Eaters under coercion to secure Luna\'s release — a desperate act of a loving father.',
    friends: ['luna_lovegood'],
    enemies: ['voldemort'],
    family: ['luna_lovegood'],
    allies: [],
    romance: [],
    importance: 4,
  },

  // ── HUFFLEPUFF ──────────────────────────────
  {
    id: 'cedric_diggory',
    name: 'Cedric Diggory',
    faction: 'hufflepuff',
    role: 'Triwizard Champion',
    traits: ['Noble', 'Fair', 'Talented', 'Humble'],
    description:
      'The perfect Hufflepuff — exceptionally skilled yet modest, fair, and kind. His murder by Voldemort marked the return of the Dark Lord.',
    friends: ['harry_potter', 'cho_chang'],
    enemies: ['voldemort', 'peter_pettigrew'],
    family: ['amos_diggory'],
    allies: [],
    romance: ['cho_chang'],
    importance: 6,
  },
  {
    id: 'hannah_abbott',
    name: 'Hannah Abbott',
    faction: 'hufflepuff',
    role: 'Student / Landlady of the Leaky Cauldron',
    traits: ['Kind', 'Hardworking', 'Nervous', 'Brave'],
    description:
      'A Hufflepuff known for anxiety but great courage. She married Neville Longbottom and became the landlady of the Leaky Cauldron.',
    friends: ['neville_longbottom', 'cedric_diggory'],
    enemies: [],
    family: [],
    allies: [],
    romance: ['neville_longbottom'],
    importance: 4,
  },
  {
    id: 'justin_finchfletchley',
    name: 'Justin Finch-Fletchley',
    faction: 'hufflepuff',
    role: 'Student / DA Member',
    traits: ['Friendly', 'Educated', 'Loyal', 'Trusting'],
    description:
      'Muggle-born Hufflepuff who turned down Eton to attend Hogwarts. Briefly suspected Harry of being the Heir of Slytherin during the Chamber of Secrets crisis.',
    friends: ['cedric_diggory', 'ernie_macmillan'],
    enemies: ['voldemort'],
    family: [],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'ernie_macmillan',
    name: 'Ernie Macmillan',
    faction: 'hufflepuff',
    role: 'Student / Prefect',
    traits: ['Pompous', 'Loyal', 'Brave', 'Honest'],
    description:
      'Pompous Hufflepuff prefect who apologised genuinely for doubting Harry and became a staunch member of Dumbledore\'s Army.',
    friends: ['justin_finchfletchley', 'hannah_abbott', 'cedric_diggory'],
    enemies: [],
    family: [],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'sprout',
    name: 'Pomona Sprout',
    faction: 'hufflepuff',
    role: 'Herbology Professor / Head of Hufflepuff',
    traits: ['Warm', 'Practical', 'Patient', 'Brave'],
    description:
      'Head of Hufflepuff house and beloved Herbology professor. Her Mandrakes were crucial in curing the Petrified students during the Chamber of Secrets crisis.',
    friends: ['mcgonagall', 'dumbledore'],
    enemies: ['voldemort'],
    family: [],
    allies: ['dumbledore'],
    romance: [],
    importance: 4,
  },

  // ── DEATH EATERS ────────────────────────────
  {
    id: 'bellatrix_lestrange',
    name: 'Bellatrix Lestrange',
    faction: 'death_eaters',
    role: 'Voldemort\'s Most Loyal',
    traits: ['Fanatical', 'Sadistic', 'Powerful', 'Unstable'],
    description:
      'The most devoted Death Eater, obsessively loyal to Voldemort. Tortured the Longbottoms into insanity, killed Sirius Black, and was ultimately slain by Molly Weasley.',
    friends: [],
    enemies: ['harry_potter', 'sirius_black', 'hermione_granger', 'neville_longbottom', 'molly_weasley'],
    family: ['narcissa_malfoy', 'andromeda_tonks'],
    allies: ['voldemort', 'lucius_malfoy'],
    romance: [],
    importance: 8,
  },
  {
    id: 'lucius_malfoy',
    name: 'Lucius Malfoy',
    faction: 'death_eaters',
    role: 'Death Eater / Ministry Official',
    traits: ['Scheming', 'Proud', 'Cowardly under pressure', 'Cunning'],
    description:
      'Patriarch of the Malfoy family and a senior Death Eater who used his Ministry influence to serve Voldemort while maintaining deniability.',
    friends: [],
    enemies: ['harry_potter', 'dumbledore', 'arthur_weasley'],
    family: ['draco_malfoy', 'narcissa_malfoy'],
    allies: ['voldemort', 'bellatrix_lestrange'],
    romance: [],
    importance: 7,
  },
  {
    id: 'narcissa_malfoy',
    name: 'Narcissa Malfoy',
    faction: 'death_eaters',
    role: 'Noblewoman / Death Eater (reluctant)',
    traits: ['Cold', 'Devoted mother', 'Calculating', 'Courageous'],
    description:
      'Wife of Lucius, mother of Draco. Her love for her son led her to lie to Voldemort\'s face, telling him Harry was dead — the act that allowed Harry to survive.',
    friends: [],
    enemies: ['harry_potter'],
    family: ['lucius_malfoy', 'draco_malfoy', 'bellatrix_lestrange'],
    allies: ['snape', 'voldemort'],
    romance: [],
    importance: 6,
  },
  {
    id: 'peter_pettigrew',
    name: 'Peter Pettigrew',
    faction: 'death_eaters',
    role: 'Traitor / Death Eater',
    traits: ['Cowardly', 'Treacherous', 'Self-serving', 'Pathetic'],
    description:
      'The rat. Betrayed James and Lily Potter to Voldemort. Spent twelve years hiding as Ron\'s pet before escaping. His life debt to Harry ultimately strangled him.',
    friends: [],
    enemies: ['harry_potter', 'sirius_black', 'remus_lupin'],
    family: [],
    allies: ['voldemort'],
    romance: [],
    importance: 6,
  },
  {
    id: 'fenrir_greyback',
    name: 'Fenrir Greyback',
    faction: 'death_eaters',
    role: 'Werewolf / Death Eater',
    traits: ['Savage', 'Cruel', 'Predatory', 'Brutal'],
    description:
      'The most savage werewolf of the age, who bit Remus Lupin as a child. Fought for Voldemort motivated by a desire to infect and prey upon children.',
    friends: [],
    enemies: ['harry_potter', 'remus_lupin', 'bill_weasley', 'lavender_brown'],
    family: [],
    allies: ['voldemort', 'bellatrix_lestrange'],
    romance: [],
    importance: 5,
  },
  {
    id: 'barty_crouch_jr',
    name: 'Barty Crouch Jr.',
    faction: 'death_eaters',
    role: 'Death Eater / Impersonator',
    traits: ['Fanatical', 'Brilliant', 'Deranged', 'Devoted'],
    description:
      'Son of a Ministry official, one of the most devoted Death Eaters. Spent a year impersonating Mad-Eye Moody, manipulating the Triwizard Tournament to resurrect Voldemort.',
    friends: [],
    enemies: ['harry_potter', 'dumbledore', 'mad_eye_moody'],
    family: [],
    allies: ['voldemort'],
    romance: [],
    importance: 6,
  },
  {
    id: 'umbridge',
    name: 'Dolores Umbridge',
    faction: 'death_eaters',
    role: 'Senior Undersecretary / Dark Inquisitor',
    traits: ['Sadistic', 'Bureaucratic', 'Racist', 'Power-hungry'],
    description:
      'Possibly the most universally loathed character in the series. Ministry official and Hogwarts High Inquisitor who tortured students with Blood Quills and sent Muggle-borns to Azkaban.',
    friends: [],
    enemies: ['harry_potter', 'dumbledore', 'hermione_granger', 'mcgonagall', 'hagrid'],
    family: [],
    allies: ['fudge'],
    romance: [],
    importance: 7,
  },
  {
    id: 'nagini',
    name: 'Nagini',
    faction: 'death_eaters',
    role: 'Voldemort\'s Familiar / Horcrux',
    traits: ['Deadly', 'Devoted', 'Ancient', 'Tragic'],
    description:
      'Voldemort\'s giant snake and final Horcrux. A Maledictus who permanently transformed into a snake. Slain by Neville Longbottom at the Battle of Hogwarts.',
    friends: [],
    enemies: ['harry_potter', 'neville_longbottom'],
    family: [],
    allies: ['voldemort'],
    romance: [],
    importance: 6,
  },

  // ── ORDER OF THE PHOENIX ─────────────────────
  {
    id: 'dumbledore',
    name: 'Albus Dumbledore',
    faction: 'order',
    role: 'Headmaster / Order Leader',
    traits: ['Wise', 'Manipulative', 'Brilliant', 'Selfless'],
    description:
      'Greatest wizard of the age and Harry\'s mentor. Founded the Order of the Phoenix. His elaborate plans spanning decades ultimately guided Harry to defeating Voldemort.',
    friends: ['harry_potter', 'mcgonagall', 'hagrid'],
    enemies: ['voldemort', 'grindelwald'],
    family: [],
    allies: ['snape', 'sirius_black', 'remus_lupin', 'mcgonagall', 'hagrid'],
    romance: [],
    importance: 10,
  },
  {
    id: 'sirius_black',
    name: 'Sirius Black',
    faction: 'order',
    role: 'Prisoner / Godfather / Animagus',
    traits: ['Reckless', 'Loyal', 'Brave', 'Wounded'],
    description:
      'Harry\'s godfather and James Potter\'s best friend. Falsely imprisoned in Azkaban for twelve years. Died in the Department of Mysteries, falling through the Veil.',
    friends: ['james_potter', 'harry_potter', 'remus_lupin'],
    enemies: ['voldemort', 'peter_pettigrew', 'bellatrix_lestrange'],
    family: ['bellatrix_lestrange', 'narcissa_malfoy', 'andromeda_tonks'],
    allies: ['dumbledore', 'remus_lupin', 'mad_eye_moody'],
    romance: [],
    importance: 8,
  },
  {
    id: 'remus_lupin',
    name: 'Remus Lupin',
    faction: 'order',
    role: 'DADA Professor / Werewolf',
    traits: ['Wise', 'Kind', 'Self-doubting', 'Courageous'],
    description:
      'The best Defence Against the Dark Arts teacher Hogwarts ever had. A werewolf who struggled with self-acceptance, he died fighting at the Battle of Hogwarts alongside Tonks.',
    friends: ['sirius_black', 'james_potter', 'harry_potter'],
    enemies: ['voldemort', 'peter_pettigrew', 'fenrir_greyback'],
    family: ['tonks'],
    allies: ['dumbledore', 'mad_eye_moody'],
    romance: ['tonks'],
    importance: 8,
  },
  {
    id: 'tonks',
    name: 'Nymphadora Tonks',
    faction: 'order',
    role: 'Auror / Order Member',
    traits: ['Clumsy', 'Vibrant', 'Brave', 'Loving'],
    description:
      'Metamorphmagus Auror and Order member, known for her ever-changing hair. Married Remus Lupin and died with him at the Battle of Hogwarts, leaving infant son Teddy.',
    friends: ['mad_eye_moody', 'sirius_black', 'harry_potter'],
    enemies: ['voldemort', 'bellatrix_lestrange', 'fenrir_greyback'],
    family: ['andromeda_tonks', 'remus_lupin', 'sirius_black'],
    allies: ['dumbledore'],
    romance: ['remus_lupin'],
    importance: 7,
  },
  {
    id: 'mad_eye_moody',
    name: 'Alastor "Mad-Eye" Moody',
    faction: 'order',
    role: 'Auror / Order Member',
    traits: ['Paranoid', 'Brilliant', 'Veteran', 'Fearless'],
    description:
      'The most famous Auror of his generation, covered in scars from Dark wizard captures. His famous cry was "CONSTANT VIGILANCE!" He died at the start of the Battle of the Seven Potters.',
    friends: ['dumbledore', 'sirius_black', 'kingsley'],
    enemies: ['voldemort', 'barty_crouch_jr'],
    family: [],
    allies: ['dumbledore', 'kingsley', 'remus_lupin'],
    romance: [],
    importance: 6,
  },
  {
    id: 'kingsley',
    name: 'Kingsley Shacklebolt',
    faction: 'order',
    role: 'Auror / Minister for Magic',
    traits: ['Cool', 'Reliable', 'Powerful', 'Wise'],
    description:
      'Cool-headed senior Auror and Order member. Became Minister for Magic after the war, leading the revolution to transform the wizarding world.',
    friends: ['dumbledore', 'mcgonagall', 'mad_eye_moody'],
    enemies: ['voldemort'],
    family: [],
    allies: ['dumbledore', 'harry_potter'],
    romance: [],
    importance: 6,
  },
  {
    id: 'arthur_weasley',
    name: 'Arthur Weasley',
    faction: 'order',
    role: 'Ministry Official / Order Member',
    traits: ['Cheerful', 'Curious', 'Loving', 'Brave'],
    description:
      'Delightfully fascinated by Muggle culture (especially plug sockets). A kind, principled man whose family loyalty and courage were unshakable.',
    friends: ['dumbledore', 'harry_potter'],
    enemies: ['voldemort', 'lucius_malfoy'],
    family: ['molly_weasley', 'ron_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: ['dumbledore', 'kingsley'],
    romance: [],
    importance: 6,
  },
  {
    id: 'molly_weasley',
    name: 'Molly Weasley',
    faction: 'order',
    role: 'Matriarch / Order Member',
    traits: ['Fierce', 'Loving', 'Protective', 'Powerful'],
    description:
      '"Not my daughter, you bitch!" Molly is the heart of the Weasley family — warm, fierce, and motherly. She slew Bellatrix Lestrange in single combat at the Battle of Hogwarts.',
    friends: ['dumbledore', 'harry_potter'],
    enemies: ['bellatrix_lestrange', 'voldemort'],
    family: ['arthur_weasley', 'ron_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'bill_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: ['dumbledore'],
    romance: [],
    importance: 7,
  },
  {
    id: 'bill_weasley',
    name: 'Bill Weasley',
    faction: 'order',
    role: 'Curse-Breaker / Order Member',
    traits: ['Cool', 'Brave', 'Loyal', 'Scarred'],
    description:
      'Eldest Weasley son and Gringotts Curse-Breaker. Attacked by Fenrir Greyback, leaving permanent scars. Married Fleur Delacour and provided shelter at Shell Cottage.',
    friends: ['harry_potter', 'fleur_delacour'],
    enemies: ['voldemort', 'fenrir_greyback'],
    family: ['arthur_weasley', 'molly_weasley', 'ron_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'charlie_weasley', 'percy_weasley'],
    allies: ['dumbledore'],
    romance: ['fleur_delacour'],
    importance: 5,
  },
  {
    id: 'charlie_weasley',
    name: 'Charlie Weasley',
    faction: 'order',
    role: 'Dragon Tamer / Order Member',
    traits: ['Adventurous', 'Passionate', 'Brave', 'Free-spirited'],
    description:
      'Second eldest Weasley, who chose a life with dragons in Romania over a professional Quidditch career. Brought dragons to the First Task of the Triwizard Tournament.',
    friends: ['harry_potter'],
    enemies: ['voldemort'],
    family: ['arthur_weasley', 'molly_weasley', 'ron_weasley', 'ginny_weasley', 'fred_weasley', 'george_weasley', 'bill_weasley', 'percy_weasley'],
    allies: ['dumbledore'],
    romance: [],
    importance: 4,
  },
  {
    id: 'fleur_delacour',
    name: 'Fleur Delacour',
    faction: 'order',
    role: 'Triwizard Champion / Order Member',
    traits: ['Proud', 'Brave', 'Loyal', 'Loving'],
    description:
      'Beauxbatons\' Triwizard Champion, part-Veela. Initially thought vain, she proved her depth of character by insisting she still loved Bill after his disfigurement.',
    friends: ['bill_weasley', 'harry_potter'],
    enemies: ['voldemort'],
    family: ['bill_weasley'],
    allies: [],
    romance: ['bill_weasley'],
    importance: 5,
  },
  {
    id: 'andromeda_tonks',
    name: 'Andromeda Tonks',
    faction: 'neutral',
    role: 'Witch / Resistance supporter',
    traits: ['Brave', 'Loving', 'Principled', 'Grieving'],
    description:
      'Sirius\'s favourite cousin who was blasted off the Black family tree for marrying a Muggle-born. Lost her husband, daughter, and son-in-law to the war, raising grandson Teddy.',
    friends: [],
    enemies: ['voldemort', 'bellatrix_lestrange'],
    family: ['tonks', 'sirius_black', 'bellatrix_lestrange', 'narcissa_malfoy'],
    allies: ['dumbledore'],
    romance: [],
    importance: 4,
  },

  // ── NEUTRAL / OTHER ─────────────────────────
  {
    id: 'dobby',
    name: 'Dobby',
    faction: 'neutral',
    role: 'House-Elf / Harry\'s friend',
    traits: ['Devoted', 'Brave', 'Loving', 'Free-spirited'],
    description:
      '"Dobby is free." The most beloved house-elf in literature. Died saving Harry, Ron, Hermione, Luna and others from Malfoy Manor — buried on a clifftop with the epitaph "Here lies Dobby, a free elf."',
    friends: ['harry_potter', 'hermione_granger', 'ron_weasley'],
    enemies: ['lucius_malfoy', 'voldemort'],
    family: [],
    allies: ['harry_potter'],
    romance: [],
    importance: 6,
  },
  {
    id: 'grindelwald',
    name: 'Gellert Grindelwald',
    faction: 'neutral',
    role: 'Dark Wizard',
    traits: ['Charismatic', 'Brilliant', 'Revolutionary', 'Merciless'],
    description:
      'The Dark Lord before Voldemort. Once Dumbledore\'s closest friend and obsession. Defeated by Dumbledore in 1945. Imprisoned in Nurmengard, he refused to give Voldemort information and was killed.',
    friends: [],
    enemies: ['dumbledore'],
    family: [],
    allies: [],
    romance: ['dumbledore'],
    importance: 7,
  },
  {
    id: 'fudge',
    name: 'Cornelius Fudge',
    faction: 'neutral',
    role: 'Minister for Magic',
    traits: ['Incompetent', 'Cowardly', 'Political', 'Self-serving'],
    description:
      'The well-meaning but deeply flawed Minister for Magic who refused to believe Voldemort\'s return out of fear it would end his political career.',
    friends: [],
    enemies: ['harry_potter', 'dumbledore'],
    family: [],
    allies: ['umbridge'],
    romance: [],
    importance: 5,
  },
  {
    id: 'rita_skeeter',
    name: 'Rita Skeeter',
    faction: 'neutral',
    role: 'Journalist',
    traits: ['Devious', 'Manipulative', 'Talented', 'Unscrupulous'],
    description:
      'Reporter for the Daily Prophet who used illegal Animagus form (beetle) to eavesdrop on private conversations. Her biased reporting caused Harry enormous trouble.',
    friends: [],
    enemies: ['harry_potter', 'hermione_granger', 'dumbledore'],
    family: [],
    allies: ['fudge'],
    romance: [],
    importance: 4,
  },
  {
    id: 'viktor_krum',
    name: 'Viktor Krum',
    faction: 'neutral',
    role: 'Quidditch Star / Triwizard Champion',
    traits: ['Reserved', 'Loyal', 'Skilled', 'Misunderstood'],
    description:
      'Durmstrang\'s brooding Quidditch star and Triwizard Champion. His friendship with Harry was genuine, and his devotion to Hermione sincere despite their diverging paths.',
    friends: ['harry_potter', 'hermione_granger', 'cedric_diggory'],
    enemies: ['voldemort'],
    family: [],
    allies: [],
    romance: ['hermione_granger'],
    importance: 5,
  },
  {
    id: 'james_potter',
    name: 'James Potter',
    faction: 'gryffindor',
    role: 'Marauder / Auror',
    traits: ['Brave', 'Arrogant (reformed)', 'Loyal', 'Sacrificial'],
    description:
      'Harry\'s father and a legendarily brave wizard. Once arrogant, he matured into a caring man who died trying to protect his wife and infant son from Voldemort.',
    friends: ['sirius_black', 'remus_lupin', 'peter_pettigrew'],
    enemies: ['voldemort', 'snape'],
    family: ['lily_potter', 'harry_potter'],
    allies: ['dumbledore'],
    romance: ['lily_potter'],
    importance: 6,
  },
  {
    id: 'lily_potter',
    name: 'Lily Potter',
    faction: 'gryffindor',
    role: 'Marauder-era Witch / Sacrificial hero',
    traits: ['Kind', 'Brilliant', 'Brave', 'Loving'],
    description:
      'Harry\'s mother and a gifted witch. Her self-sacrificial death to protect Harry left a magical protection so powerful it repelled Voldemort\'s killing curse.',
    friends: ['james_potter', 'snape'],
    enemies: ['voldemort'],
    family: ['james_potter', 'harry_potter'],
    allies: ['dumbledore'],
    romance: ['james_potter'],
    importance: 7,
  },
  {
    id: 'frank_longbottom',
    name: 'Frank Longbottom',
    faction: 'order',
    role: 'Auror / Order Member',
    traits: ['Brave', 'Principled', 'Tortured', 'Tragic'],
    description:
      'Neville\'s father and a distinguished Auror. Tortured to permanent insanity by Bellatrix Lestrange and the Lestranges. Resides in St. Mungo\'s, no longer recognising his own son.',
    friends: [],
    enemies: ['bellatrix_lestrange', 'voldemort'],
    family: ['alice_longbottom', 'neville_longbottom'],
    allies: ['dumbledore'],
    romance: [],
    importance: 4,
  },
  {
    id: 'alice_longbottom',
    name: 'Alice Longbottom',
    faction: 'order',
    role: 'Auror / Order Member',
    traits: ['Brave', 'Loving', 'Tragic'],
    description:
      'Neville\'s mother and a celebrated Auror. Tortured into insanity alongside her husband by Bellatrix. Despite not recognising Neville, she always gave him a Drooble\'s gum wrapper.',
    friends: [],
    enemies: ['bellatrix_lestrange', 'voldemort'],
    family: ['frank_longbottom', 'neville_longbottom'],
    allies: ['dumbledore'],
    romance: [],
    importance: 4,
  },
  {
    id: 'amos_diggory',
    name: 'Amos Diggory',
    faction: 'neutral',
    role: 'Ministry Official',
    traits: ['Proud', 'Grieving', 'Hardworking'],
    description:
      'Cedric\'s proud father and a Ministry of Magic official. Devastated by Cedric\'s death, he later became a tragic figure manipulated by time-turners in a desperate attempt to resurrect his son.',
    friends: [],
    enemies: ['voldemort'],
    family: ['cedric_diggory'],
    allies: [],
    romance: [],
    importance: 3,
  },
  {
    id: 'dudley_dursley',
    name: 'Dudley Dursley',
    faction: 'neutral',
    role: 'Muggle / Harry\'s Cousin',
    traits: ['Spoiled (reformed)', 'Bullying', 'Ultimately kind-hearted'],
    description:
      'Harry\'s bullying cousin who was raised to torment Harry. After being attacked by Dementors, he came to recognise Harry\'s value and parted from him warmly before the war.',
    friends: [],
    enemies: ['voldemort'],
    family: ['harry_potter'],
    allies: [],
    romance: [],
    importance: 3,
  },
];

// ─────────────────────────────────────────────
//  TIMELINE DATA  (Book years 1–7)
// ─────────────────────────────────────────────

/** Helper: canonical edge key (same as deriveEdges) */
const ek = (a, b) => [a, b].sort().join('||');

/**
 * Relationships that have specific book-year ranges.
 * Any edge NOT listed here defaults to { start: 1, end: 7 }.
 */
export const EDGE_TIMELINE = {
  // ── Romances with specific start ─────────────
  // Friendship that becomes romance — visible all 7 years, colour changes mid-series
  [ek('harry_potter',       'ginny_weasley')]:         { start: 1, end: 7, typeByPhase: [{ from: 1, to: 5, type: 'friendship' }, { from: 6, to: 7, type: 'romance' }] },
  [ek('ron_weasley',        'hermione_granger')]:       { start: 1, end: 7, typeByPhase: [{ from: 1, to: 5, type: 'friendship' }, { from: 6, to: 7, type: 'romance' }] },
  [ek('remus_lupin',        'tonks')]:                 { start: 6, end: 7 },
  [ek('bill_weasley',       'fleur_delacour')]:        { start: 6, end: 7 },
  [ek('cedric_diggory',     'cho_chang')]:             { start: 4, end: 4 },
  [ek('hermione_granger',   'viktor_krum')]:           { start: 4, end: 4 },
  [ek('cho_chang',          'harry_potter')]:          { start: 5, end: 5 },  // brief romance Y5
  [ek('james_potter',       'lily_potter')]:           { start: 1, end: 1 },  // backstory framing

  // ── Relationships gated on first appearance ──
  [ek('harry_potter',       'sirius_black')]:          { start: 3, end: 5 },  // meets Y3, dies Y5
  [ek('harry_potter',       'remus_lupin')]:           { start: 3, end: 7 },  // DADA teacher Y3
  [ek('harry_potter',       'luna_lovegood')]:         { start: 5, end: 7 },
  [ek('harry_potter',       'cedric_diggory')]:        { start: 4, end: 4 },
  [ek('harry_potter',       'viktor_krum')]:           { start: 4, end: 7 },
  [ek('harry_potter',       'mad_eye_moody')]:         { start: 4, end: 7 },
  [ek('harry_potter',       'tonks')]:                 { start: 5, end: 7 },
  [ek('harry_potter',       'fleur_delacour')]:        { start: 4, end: 7 },
  [ek('harry_potter',       'dobby')]:                 { start: 2, end: 7 },
  [ek('harry_potter',       'kingsley')]:              { start: 5, end: 7 },

  // ── Dumbledore bonds (ends at his death, Y6) ─
  [ek('dumbledore',         'harry_potter')]:          { start: 1, end: 6 },
  [ek('dumbledore',         'snape')]:                 { start: 1, end: 6 },
  [ek('dumbledore',         'grindelwald')]:           { start: 1, end: 7 },  // referenced throughout

  // ── Sirius bonds (ends at his death, Y5) ─────
  [ek('sirius_black',       'remus_lupin')]:           { start: 1, end: 5 },
  [ek('sirius_black',       'james_potter')]:          { start: 1, end: 1 },  // pre-series backstory
  [ek('sirius_black',       'bellatrix_lestrange')]:   { start: 1, end: 5 },

  // ── Cedric only active in Y4 ─────────────────
  [ek('cedric_diggory',     'viktor_krum')]:           { start: 4, end: 4 },
  [ek('amos_diggory',       'cedric_diggory')]:        { start: 4, end: 4 },

  // ── Lupin / Order bonds ───────────────────────
  [ek('remus_lupin',        'sirius_black')]:          { start: 3, end: 5 },
  [ek('remus_lupin',        'james_potter')]:          { start: 1, end: 1 },
  [ek('mad_eye_moody',      'dumbledore')]:            { start: 4, end: 6 },

  // ── Snape's double-life ───────────────────────
  [ek('lily_potter',        'snape')]:                 { start: 1, end: 1 },  // backstory
  // Hostile for 6 books; revealed as protector in Deathly Hallows
  [ek('harry_potter',       'snape')]:                 { start: 1, end: 7, typeByPhase: [{ from: 1, to: 6, type: 'rivalry' }, { from: 7, to: 7, type: 'revealed-alliance' }] },
  // Draco's relationship with Harry: rivalry that softens when Draco refuses to identify Harry
  [ek('draco_malfoy',       'harry_potter')]:          { start: 1, end: 7, typeByPhase: [{ from: 1, to: 6, type: 'rivalry' }, { from: 7, to: 7, type: 'neutral' }] },

  // ── Voldemort / Death Eater specific ─────────
  [ek('nagini',             'voldemort')]:             { start: 4, end: 7 },  // Nagini prominent from Y4
  [ek('barty_crouch_jr',    'voldemort')]:             { start: 4, end: 4 },
  [ek('barty_crouch_jr',    'harry_potter')]:          { start: 4, end: 4 },

  // ── Tonks / later Order ───────────────────────
  [ek('andromeda_tonks',    'tonks')]:                 { start: 5, end: 7 },
  [ek('andromeda_tonks',    'sirius_black')]:          { start: 3, end: 5 },

  // ── Lavender romance ─────────────────────────
  [ek('lavender_brown',     'ron_weasley')]:           { start: 6, end: 6 },  // brief Y6

  // ── Neville / Frank / Alice (St Mungo's reveal Y5) ─
  [ek('neville_longbottom', 'frank_longbottom')]:      { start: 5, end: 7 },
  [ek('neville_longbottom', 'alice_longbottom')]:      { start: 5, end: 7 },
  [ek('neville_longbottom', 'hannah_abbott')]:         { start: 6, end: 7 },  // romance develops
};

/**
 * Characters with specific activity windows.
 * Characters NOT listed here are active all 7 years.
 */
export const CHARACTER_ACTIVITY = {
  // ── Temporal activity windows ─────────────────────────────
  // Characters not listed here are active all 7 years.
  remus_lupin:          { activeFrom: 3, activeTo: 7, emphasisPeak: 3 },
  sirius_black:         { activeFrom: 3, activeTo: 5, emphasisPeak: 5 },
  cedric_diggory:       { activeFrom: 4, activeTo: 4, emphasisPeak: 4 },
  fleur_delacour:       { activeFrom: 4, activeTo: 7, emphasisPeak: 6 },
  viktor_krum:          { activeFrom: 4, activeTo: 7, emphasisPeak: 4 },
  mad_eye_moody:        { activeFrom: 4, activeTo: 7, emphasisPeak: 4 },
  barty_crouch_jr:      { activeFrom: 4, activeTo: 4, emphasisPeak: 4 },
  cho_chang:            { activeFrom: 4, activeTo: 7, emphasisPeak: 5 },
  amos_diggory:         { activeFrom: 4, activeTo: 7, emphasisPeak: 4 },
  luna_lovegood:        { activeFrom: 5, activeTo: 7, emphasisPeak: 7 },
  tonks:                { activeFrom: 5, activeTo: 7, emphasisPeak: 6 },
  xenophilius_lovegood: { activeFrom: 5, activeTo: 7, emphasisPeak: 7 },
  andromeda_tonks:      { activeFrom: 7, activeTo: 7, emphasisPeak: 7 },
  dobby:                { activeFrom: 2, activeTo: 7, emphasisPeak: 7 },
  dumbledore:           { activeFrom: 1, activeTo: 6, emphasisPeak: 5 },
  james_potter:         { activeFrom: 1, activeTo: 1, emphasisPeak: 1 },
  lily_potter:          { activeFrom: 1, activeTo: 1, emphasisPeak: 1 },
  frank_longbottom:     { activeFrom: 5, activeTo: 5, emphasisPeak: 5 },
  alice_longbottom:     { activeFrom: 5, activeTo: 5, emphasisPeak: 5 },

  // ── Always-active characters with narrative peak moments ──
  harry_potter:         { emphasisPeak: 7 },
  hermione_granger:     { emphasisPeak: 7 },
  ron_weasley:          { emphasisPeak: 7 },
  voldemort:            { emphasisPeak: 7 },
  snape:                { emphasisPeak: 7 },  // revelation year
  neville_longbottom:   { emphasisPeak: 7 },  // kills Nagini at Battle of Hogwarts
  draco_malfoy:         { emphasisPeak: 6 },  // forced into service
  bellatrix_lestrange:  { emphasisPeak: 5 },  // kills Sirius
  molly_weasley:        { emphasisPeak: 7 },  // kills Bellatrix
  ginny_weasley:        { emphasisPeak: 6 },  // romance begins
  arthur_weasley:       { emphasisPeak: 5 },  // attacked by Nagini
  mcgonagall:           { emphasisPeak: 7 },  // defends Hogwarts
  hagrid:               { emphasisPeak: 1 },  // introduces Harry
};

// ─────────────────────────────────────────────
//  BOOK LABELS
// ─────────────────────────────────────────────
export const BOOKS = [
  { year: 1, title: "The Philosopher's Stone",    short: 'PS' },
  { year: 2, title: "The Chamber of Secrets",     short: 'CoS' },
  { year: 3, title: "The Prisoner of Azkaban",    short: 'PoA' },
  { year: 4, title: "The Goblet of Fire",         short: 'GoF' },
  { year: 5, title: "The Order of the Phoenix",   short: 'OotP' },
  { year: 6, title: "The Half-Blood Prince",      short: 'HBP' },
  { year: 7, title: "The Deathly Hallows",        short: 'DH' },
];

// ─────────────────────────────────────────────
//  DERIVE EDGE LIST FROM CHARACTER RELATIONSHIPS
// ─────────────────────────────────────────────
const RELATIONSHIP_PRIORITY = {
  family:  { type: 'family',     color: '#D4AF37', strength: 3 },
  romance: { type: 'romance',    color: '#E879A0', strength: 3 },
  friends: { type: 'friendship', color: '#4CAF50', strength: 2 },
  allies:  { type: 'alliance',   color: '#2196F3', strength: 2 },
  enemies: { type: 'rivalry',    color: '#F44336', strength: 2 },
};

export function deriveEdges(characters) {
  const seen = new Map(); // key → edge object

  for (const char of characters) {
    for (const [relType, meta] of Object.entries(RELATIONSHIP_PRIORITY)) {
      for (const targetId of char[relType] || []) {
        const key = [char.id, targetId].sort().join('||');
        if (!seen.has(key)) {
          // Look up timeline data; default to full series
          const timing = EDGE_TIMELINE[key] ?? { start: 1, end: 7 };
          seen.set(key, {
            id:          key,
            source:      char.id,
            target:      targetId,
            type:        meta.type,
            color:       meta.color,
            strength:    meta.strength,
            start:       timing.start,
            end:         timing.end,
            typeByPhase: timing.typeByPhase ?? null,
          });
        } else {
          const existing = seen.get(key);
          if (meta.strength > existing.strength) {
            existing.type     = meta.type;
            existing.color    = meta.color;
            existing.strength = meta.strength;
          }
        }
      }
    }
  }

  const charIds = new Set(characters.map((c) => c.id));
  return Array.from(seen.values()).filter(
    (e) => charIds.has(e.source) && charIds.has(e.target)
  );
}

export const CHARACTERS_MAP = Object.fromEntries(
  CHARACTERS.map((c) => [c.id, c])
);
