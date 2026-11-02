// Central business information. Update here and it changes everywhere on the site.
export const site = {
  name: 'JPC Services Inc.',
  shortName: 'JPC Services',
  tagline: 'Yes We Do.',
  url: 'https://jpcservicesinc.com',
  description:
    "Greater Vancouver's trusted team for water damage restoration, leak detection, renovations and strata maintenance. A+ BBB rated. Free quotes.",
  phone: '778-888-8688',
  phoneHref: 'tel:+17788888688',
  email: 'jeffpartners@gmail.com',
  address: {
    street: '12191 Hammersmith Way, Unit 2110',
    city: 'Richmond',
    region: 'BC',
    postalCode: 'V7A 5H2',
    country: 'CA',
  },
  geo: { lat: 49.1254136, lng: -123.1010453 },
  hours: [
    { days: 'Monday – Friday', time: '9:00 AM – 5:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  // TODO(confirm with JPC): founding year and stats — the old site was inconsistent.
  foundedYear: 2006,
  stats: {
    projects: '550+',
    team: '10+',
    bbb: 'A+',
    googleReviews: 137,
  },
  serviceArea: [
    'Vancouver', 'Richmond', 'Burnaby', 'North Vancouver', 'West Vancouver',
    'Surrey', 'Coquitlam', 'New Westminster', 'Delta',
  ],
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=JPC+Services+Inc.+12191+Hammersmith+Wy+Unit+2110+Richmond+BC',
  mapsEmbed:
    'https://maps.google.com/maps?q=12191%20Hammersmith%20Wy%20Unit%202110%2C%20Richmond%2C%20BC%20V7A%205H2&t=m&z=13&output=embed&iwloc=near',
  // Where the quote form posts to. contact.php runs on the current Plesk (Hustly) hosting.
  formAction: '/contact.php',
};

export const yearsInBusiness = new Date().getFullYear() - site.foundedYear;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'JustPro', href: '/justpro/' },
  { label: 'Careers', href: '/careers/' },
];
