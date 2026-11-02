import type { ImageMetadata } from 'astro';
import sungiven1 from '../assets/images/projects/sungiven-1.jpg';
import sungiven2 from '../assets/images/projects/sungiven-2.jpg';

// Add a project: copy an entry below, add its photos to src/assets/images/projects/.
export type Project = {
  slug: string;
  title: string;
  client?: string;
  location: string;
  category: string;
  summary: string;
  body: string[];
  cover: ImageMetadata;
  gallery: ImageMetadata[];
};

export const projects: Project[] = [
  {
    slug: 'sungiven-foods-supermarket',
    title: 'Sungiven Foods Supermarket',
    client: 'Sungiven Foods Canada Inc.',
    location: '1595 Marine Dr, North Vancouver, BC',
    category: 'Commercial Renovation',
    summary:
      'Renovation of an existing retail space into a full-service Sungiven Foods supermarket.',
    body: [
      'JPC Services Inc. partnered with Sungiven Foods Canada Inc. to renovate the existing shop space at 1595 Marine Drive in North Vancouver to meet the requirements of a modern supermarket.',
      'As general contractor, JPC managed the project from planning through completion, coordinating trades and delivering a retail space ready to serve the community.',
    ],
    cover: sungiven1,
    gallery: [sungiven1, sungiven2],
  },
];
