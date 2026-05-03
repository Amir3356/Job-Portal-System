export const sampleStats = [
  { label: 'Open roles', value: '128', change: '+12 this week' },
  { label: 'Active employers', value: '42', change: '+4 this week' },
  { label: 'Applications', value: '3.1k', change: '+18%' },
  { label: 'Hires', value: '74', change: '+9 this month' },
]

export const sampleJobs = [
  {
    id: 1,
    title: 'Senior Laravel Developer',
    company: 'Atlas Digital',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90k - $120k',
    status: 'featured',
    tags: ['Laravel', 'Sanctum', 'MySQL'],
    description: 'Build secure hiring workflows, automation, and role-aware dashboards.',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Northstar HR',
    location: 'Berlin',
    type: 'Contract',
    salary: '$65/hr',
    status: 'new',
    tags: ['Figma', 'Design Systems', 'Mobile'],
    description: 'Shape the UX for employer tools, analytics, and candidate journeys.',
  },
  {
    id: 3,
    title: 'Talent Acquisition Lead',
    company: 'Orbit Ventures',
    location: 'Hybrid',
    type: 'Full-time',
    salary: '$75k - $95k',
    status: 'hot',
    tags: ['Recruiting', 'Operations', 'CRM'],
    description: 'Own employer onboarding, applicant pipelines, and partner success.',
  },
]

export const sampleApplications = [
  { id: 11, role: 'Senior Laravel Developer', company: 'Atlas Digital', status: 'In review', updatedAt: 'Today' },
  { id: 12, role: 'Frontend Engineer', company: 'Blue Peak Labs', status: 'Shortlisted', updatedAt: 'Yesterday' },
  { id: 13, role: 'Recruiting Manager', company: 'Orbit Ventures', status: 'Submitted', updatedAt: '2 days ago' },
]

export const roleHighlights = {
  admin: [
    'Approve or suspend users',
    'Track hiring volume and platform usage',
    'Audit jobs and applications',
  ],
  employer: [
    'Post and manage roles',
    'Review candidates quickly',
    'Maintain company profile',
  ],
  job_seeker: [
    'Create a rich profile',
    'Apply with CV uploads',
    'Track application status',
  ],
}