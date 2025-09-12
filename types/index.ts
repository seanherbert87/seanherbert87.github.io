// Portfolio content types
export interface Project {
  id?: number;
  name: string;
  description: string;
  link?: string;
  githubLink?: string;
  technologies: string[];
  featured?: boolean;
  image?: {
    url: string;
    alternativeText?: string;
  };
}

export interface Experience {
  id?: number;
  company: string;
  position: string;
  description: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  website?: string;
  location?: string;
}

export interface Skill {
  id?: number;
  name: string;
  description: string;
  category?: 'frontend' | 'backend' | 'devops' | 'tools';
  proficiency?: number; // 1-10 scale
}

export interface About {
  id?: number;
  content: string;
  title?: string;
  subtitle?: string;
  status?: 'available' | 'busy' | 'unavailable';
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Component prop types
export interface SocialLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SummaryItemProps {
  name: string;
  description: string;
}


// Theme and UI types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export interface FormFieldConfig {
  name: keyof ContactFormData;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  placeholder?: string;
  validation: ValidationRule;
  options?: { value: string; label: string }[];
}
