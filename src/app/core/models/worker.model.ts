import { TicketVisaReview } from "./employer.model";

export interface Employer {
    name: string;
    identity_number: string;
    source_number: string;
    address: string;
    company_name: string;
    reference_number: string;
    file_number: string;
    ticket_visa_review?: TicketVisaReview[];
    createdAt?: string;
}

export interface WorkerAlert {
    type?: 'الغاء بلاغ' | 'بلاغ تغيب';
    status?: 'rejected' | 'accepted';
    filed_date?: string;
    resolved_date?: string;
    source_number?: string
}
export interface MoamlaType {
    _id?: string;
    name?: string;      // ← اختيارية (فيها ?)
    status?: 'rejected' | 'accepted';
    source_number?: string

}

export interface WorkerProfessionChange {
    old_profession?: string;
    status?: 'rejected' | 'accepted';
    change_date?: string;
    source_number?: string

}

export interface Worker {
    _id: string;
    employer_id: string;
    name: string;
    identity_number: string;
    source_number: string;
    nationality: string;
    profession: string;
    address: string;
    account_number: string;
    iqama_number: string;
    iqama_expiry_date: string;
    iqama_status: string;
    iqama_issue_date: string;
    alerts?: WorkerAlert;
    profession_changes?: WorkerProfessionChange;
    updatedAt?: string;
    moamla_type?: MoamlaType[]
}

export interface WorkersByEmployerResponse {
    success: boolean;
    count: number;
    employer: Employer;
    data: Worker;
}

export interface ProfessionChangeResponse {
    success: boolean;
    identity_number: string;
    source_number: string;
    company_name?: string;
    name: string;
    createdAt: string;
    // خلي نوع العامل إما Worker كامل أو Partial<Worker>
    worker: Worker;
}
export interface alertResponse {
    success: boolean;
    identity_number: string;
    source_number: string;
    company_name?: string;
    name: string;
    createdAt: string;
    worker: Worker;
}
export interface MoamlaData {
    _id: string;
    name: string;
    identity_number: string;
    profession: string;
    nationality: string;
    iqama_number: string
    moamla: MoamlaType; // سواء كانت المعاملة كائن واحد أو مصفوفة
}

// 3. تعريف الـ Interface الرئيسي للرد
export interface MoamlaTypeResponse {
    success: boolean;
    identity_number: string;
    source_number: string;
    company_name?: string;
    name: string;
    createdAt: string;
    data: MoamlaData;
}