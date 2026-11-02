import type { ImageMetadata } from 'astro';
import residential from '../assets/images/services/residential-renovation.jpg';
import commercial from '../assets/images/services/commercial-renovation.jpg';
import general from '../assets/images/services/general-contracting.png';
import crack from '../assets/images/services/concrete-crack-injection.jpg';
import leak from '../assets/images/services/water-leak-detection.jpg';
import flood from '../assets/images/services/flood-damage-control.jpg';
import landscaping from '../assets/images/services/landscaping.jpg';
import hvac from '../assets/images/services/plumbing-hvac.jpg';
import strata from '../assets/images/services/strata-maintenance.jpg';
import roofing from '../assets/images/services/roofing.jpg';
import soundproofing from '../assets/images/services/soundproofing.webp';
import waterproofing from '../assets/images/services/waterproofing.webp';

export type Service = {
  slug: string;
  title: string;
  summary: string;
  intro: string;
  includes: string[];
  image: ImageMetadata;
  featured?: boolean;
  category: 'water' | 'renovation' | 'property';
};

export const services: Service[] = [
  {
    slug: 'water-leak-detection-repair',
    title: 'Water Leak Detection & Repair',
    category: 'water',
    featured: true,
    summary:
      'Non-invasive leak detection and targeted repairs for homes and commercial buildings — we find the real source before it escalates.',
    intro:
      'Most leaks show up far from where they start. We use non-invasive diagnostic tools to trace water back to its true source, then repair it properly — so you fix the problem once, without unnecessary demolition.',
    includes: [
      'Leak tracing with thermal imaging, moisture meters and acoustic detection',
      'Roof, window, deck, balcony and plumbing leak investigation',
      'Targeted repairs at the source, not just the visible damage',
      'Residential homes, townhouses, strata and commercial properties',
    ],
    image: leak,
  },
  {
    slug: 'flood-damage-control',
    title: 'Flood & Water Damage Restoration',
    category: 'water',
    featured: true,
    summary:
      'Fast flood response: water extraction, drying and structural repairs to make your property safe again and prevent future damage.',
    intro:
      'When water gets in, speed matters. Our JustPro restoration team extracts water, dries the structure and rebuilds the damaged areas — restoring safety and preventing mold and long-term damage.',
    includes: [
      'Emergency water extraction',
      'Structural drying and moisture monitoring',
      'Mold and contamination treatment',
      'Rebuild: drywall, insulation, flooring and finishes',
    ],
    image: flood,
  },
  {
    slug: 'waterproofing',
    title: 'Waterproofing',
    category: 'water',
    featured: true,
    summary:
      'Durable waterproofing for basements, foundations, balconies and roofs — protecting your property from moisture and leaks.',
    intro:
      'Good waterproofing stops problems before they start. We design and install durable systems that keep water out of the places it does the most damage.',
    includes: [
      'Basement and foundation waterproofing',
      'Balcony, deck and flat-roof membranes',
      'Exterior wall and envelope sealing',
      'High-grade waterproof (not just water-resistant) materials',
    ],
    image: waterproofing,
  },
  {
    slug: 'concrete-crack-injection',
    title: 'Concrete Crack Injection',
    category: 'water',
    summary:
      'Structural crack repair with high-strength epoxy or polyurethane injection to seal foundations, walls and slabs.',
    intro:
      'Cracks in foundations, walls and slabs are a common path for water. We seal them from the inside using high-strength epoxy or polyurethane injection — a lasting fix without excavation in most cases.',
    includes: [
      'Epoxy injection for structural crack repair',
      'Polyurethane injection for active leaks',
      'Foundation walls, slabs and parkade structures',
      'Prevention of water intrusion and long-term damage',
    ],
    image: crack,
  },
  {
    slug: 'residential-renovation',
    title: 'Residential Renovation',
    category: 'renovation',
    featured: true,
    summary:
      'Kitchen and bathroom remodels, basements, additions and custom builds — finished on time, on budget and to a high standard.',
    intro:
      'From a single bathroom to a whole-home renovation, we combine skilled craftsmanship with careful project management to bring your plans to life.',
    includes: [
      'Kitchen and bathroom remodels',
      'Basement finishing and suites',
      'Home additions and upgrades',
      'Custom home builds',
    ],
    image: residential,
  },
  {
    slug: 'commercial-renovation',
    title: 'Commercial Renovation',
    category: 'renovation',
    featured: true,
    summary:
      'Construction and renovation for offices, retail stores, restaurants and industrial facilities.',
    intro:
      'We build and renovate commercial spaces with minimal disruption to your business — from tenant improvements to full store build-outs like our Sungiven Foods supermarket project.',
    includes: [
      'Retail and supermarket build-outs',
      'Restaurant renovations',
      'Office tenant improvements',
      'Industrial facility upgrades',
    ],
    image: commercial,
  },
  {
    slug: 'general-contracting',
    title: 'General Contracting',
    category: 'renovation',
    summary:
      'End-to-end project management: planning, permits and subcontractors, delivered to the highest standard.',
    intro:
      'One point of contact for your whole project. We handle planning, permits, scheduling and trades so you get a smooth build and a result you can rely on.',
    includes: [
      'Project planning and budgeting',
      'Permit applications',
      'Trade and subcontractor coordination',
      'Site supervision and quality control',
    ],
    image: general,
  },
  {
    slug: 'strata-maintenance',
    title: 'Strata Maintenance',
    category: 'property',
    featured: true,
    summary:
      'Inspections, repairs and common-area upkeep for multi-unit residential and commercial properties.',
    intro:
      'Strata councils and property managers rely on us for responsive repairs and preventative maintenance that protects the building — and the budget.',
    includes: [
      'Routine building inspections',
      'Leak investigation and repairs',
      'Common-area maintenance',
      'Envelope, roof and drainage upkeep',
    ],
    image: strata,
  },
  {
    slug: 'roofing',
    title: 'Roofing',
    category: 'property',
    summary:
      'New roofs, repairs and replacements for long-lasting protection, energy efficiency and property value.',
    intro:
      'A leaking roof doesn’t always need replacing. We find the actual cause, repair what needs repairing, and replace only when it truly makes sense.',
    includes: [
      'Roof leak repairs',
      'Roof replacements and new installations',
      'Flat-roof systems',
      'Gutters and downspouts',
    ],
    image: roofing,
  },
  {
    slug: 'plumbing-hvac',
    title: 'Plumbing & HVAC',
    category: 'property',
    summary:
      'Pipe repairs, fixtures, drainage, heating, cooling and ventilation — comfort, safety and efficiency year-round.',
    intro:
      'From a dripping valve to a blocked drain line or a new heating system, our team keeps water flowing where it should and your building comfortable.',
    includes: [
      'Pipe and fixture repairs and installation',
      'Drain and rain-water leader clearing',
      'Heating, cooling and ventilation systems',
      'Hot water systems',
    ],
    image: hvac,
  },
  {
    slug: 'soundproofing',
    title: 'Soundproofing',
    category: 'property',
    summary:
      'Soundproofing for walls, ceilings and floors — more comfort, privacy and less noise at home or work.',
    intro:
      'Whether it’s a basement suite, a shared wall or a busy office, we reduce noise transfer with proven assemblies for walls, ceilings and floors.',
    includes: [
      'Wall and ceiling sound insulation',
      'Floor underlay and impact-noise reduction',
      'Basement suite and multi-family upgrades',
      'Home theatres and offices',
    ],
    image: soundproofing,
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    category: 'property',
    summary:
      'Design, installation and maintenance of outdoor spaces for homes and commercial properties.',
    intro:
      'We create and maintain outdoor spaces that look great and work well — including the drainage and hardscaping that protect your building.',
    includes: [
      'Landscape design and installation',
      'Pathways, patios and hardscaping',
      'Grading and drainage',
      'Ongoing maintenance',
    ],
    image: landscaping,
  },
];

export const categories = {
  water: 'Water Damage & Leaks',
  renovation: 'Renovation & Construction',
  property: 'Property & Building Services',
} as const;
