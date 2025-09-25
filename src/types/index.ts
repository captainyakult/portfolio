// Project and Experiment type definitions
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
  completedDate: string;
}

export interface Experiment {
  id: string;
  name: string;
  type: 'AI' | 'ML' | 'Robotics' | 'WebGL' | '3D' | 'Research';
  description: string;
  media: {
    type: 'image' | 'video' | 'gif';
    url: string;
    alt: string;
  }[];
  results?: string;
  status: 'active' | 'completed' | 'paused';
  startDate: string;
  technologies: string[];
}

export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
}

export interface AgentAction {
  type: 'navigate' | 'filter' | 'search' | 'download';
  label: string;
  action: () => void;
}