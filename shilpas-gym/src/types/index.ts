export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface DisciplineItem {
  id: string;
  number: string;
  name: string;
  focus: string;
  description: string;
  metrics: { label: string; value: string }[];
  assetId: string;
}

export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  credentials: string[];
  focus: string;
  assetId: string;
}

export interface FacilitySpec {
  code: string;
  title: string;
  detail: string;
  category: string;
}
