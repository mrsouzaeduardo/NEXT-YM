export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  url: string;
  tags: string[];
  color: 'emerald' | 'amber' | 'indigo' | 'zinc' | 'sky';
  features: string[];
  techStack: string[];
  mockStats: { label: string; value: string }[];
  accentColor: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectType: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: string;
}
