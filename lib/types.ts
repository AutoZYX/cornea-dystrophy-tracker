export type Category =
  | "overview"
  | "classification"
  | "gene"
  | "condition"
  | "diagnosis"
  | "treatment"
  | "care"
  | "institution"
  | "clinician"
  | "research"
  | "glossary";

export type EvidenceLevel = "A" | "B" | "C" | "D";

export type SourceType =
  | "official_health"
  | "hospital_official"
  | "peer_review"
  | "gene_database"
  | "clinical_trial"
  | "official_news"
  | "secondary";

export type SourceStatus =
  | "verified"
  | "blocked"
  | "paywalled"
  | "unverified";

export type MedicalCaveat =
  | "educational"
  | "doctor_confirm"
  | "urgent"
  | "research_only";

export interface SourceRecord {
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: SourceType;
  evidence_level: EvidenceLevel;
  source_status: SourceStatus;
  verified_at: string;
  note?: string;
}

export interface KnowledgeRecord {
  id: string;
  category: Category;
  title: string;
  title_en?: string;
  summary: string;
  key_points: string[];
  clinical_use?: string[];
  limits?: string[];
  tags: string[];
  source_ids: string[];
  evidence_level: EvidenceLevel;
  source_type: SourceType;
  source_status: SourceStatus;
  verified_at: string;
  medical_caveat: MedicalCaveat;
  related_ids?: string[];
}

export interface InstitutionRecord {
  id: string;
  name: string;
  city: string;
  country: string;
  focus: string[];
  why_it_matters: string;
  public_note: string;
  source_ids: string[];
  evidence_level: EvidenceLevel;
  verified_at: string;
}

export interface DashboardStats {
  totalRecords: number;
  sourceCount: number;
  institutionCount: number;
  researchCount: number;
  treatmentCount: number;
  categoryCounts: Record<Category, number>;
  evidenceCounts: Record<EvidenceLevel, number>;
  latestVerifiedAt: string;
}

export interface PersonalProfile {
  id: string;
  label: string;
  relation: string;
  affectedStatus: string;
  currentStatus: string;
  history: string;
  nextAction: string;
  updatedAt: string;
}

export interface FollowUpRecord {
  id: string;
  date: string;
  eye: "left" | "right" | "both" | "unknown";
  visitType: string;
  hospital: string;
  doctor: string;
  visualAcuity: string;
  astigmatism: string;
  iop: string;
  corneaStatus: string;
  medication: string;
  warningSigns: string;
  nextPlan: string;
  notes: string;
}
