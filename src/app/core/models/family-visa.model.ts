export type FamilyVisaPurpose = 'familyVisit' | 'familyRecruitment';

export interface FamilyVisa {
    _id: string;
    worker_id: string;
    visitor_name: string;
    relation: string;
    nationality: string;
    purpose: FamilyVisaPurpose;
    duration_days: number;
    validity_days?: number;
    arrival_from?: string;
    status?: string;
    releaseDate: string;
    createdAt?: string;
    updatedAt?: string;
    age?: number
}

export interface FamilyVisaWorkerInfo {
    name: string;
    identity_number: string;
    source_number: string;
    employer_name: string;
    employer_identity_number: string;
    employer_source_number: string;
    employer: string;
}

export interface FamilyVisasResponse {
    success: boolean;
    worker: FamilyVisaWorkerInfo;
    data: FamilyVisa;
}
