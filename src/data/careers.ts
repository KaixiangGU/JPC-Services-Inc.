// TODO(confirm with JPC): which roles are actually open, and their details.
export type Job = { title: string; type: string; summary: string };

export const jobs: Job[] = [
  {
    title: 'Apprentice',
    type: 'Full-time',
    summary: 'Learn the trade on real renovation and repair projects alongside experienced journeymen.',
  },
  {
    title: 'Journeyman',
    type: 'Full-time',
    summary: 'Lead hands-on renovation, leak repair and restoration work on residential and commercial sites.',
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    summary: 'Plan, schedule and run projects end-to-end — clients, trades, budgets and quality.',
  },
  {
    title: 'Estimator',
    type: 'Full-time',
    summary: 'Assess sites and prepare accurate, competitive quotes for renovation and repair work.',
  },
  {
    title: 'General Manager',
    type: 'Full-time',
    summary: 'Oversee daily operations and help grow the business across our service lines.',
  },
  {
    title: 'Marketing',
    type: 'Full / part-time',
    summary: 'Share our work online — social media, website, and our Xiaohongshu and JustPro channels.',
  },
];
