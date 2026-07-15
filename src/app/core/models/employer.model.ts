export interface MarriagePermit {
    status?: 'accepted' | 'cancled';
    issue_date?: string;
    sending_date?: string;
    wife_nationality?: string;
    type?: string;
    arrival_port?: string;
    ProfessionCategory?: string;
    file_number?: string;
}

export interface TicketVisaReview {
    nationality?: string;
    profession?: string;
    arrival_port?: string;
    count?: number;
}

export interface Employer {
    _id?: string;
    name: string;
    identity_number: string;
    source_number: string;
    address: string;
    file_number: string;
    company_name: string;
    reference_number: string;
    marriage_permit?: MarriagePermit;
    ticket_visa_review?: TicketVisaReview[];
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
}