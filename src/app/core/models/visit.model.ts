export interface Visit {
    _id?: string;
    visaNo: string;
    passportNo: string;
    code: string;
    applicationNo: string;
    name: string;
    birthDate: string;
    validFrom: string;
    validUntil: string;
    image_url: string;
    image?: string;
    typeOfVisa: string;
    durationOfStay: string;
    nationality: string;
    placeOfIssue: string;
    entryType: string;
    source_number: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface VisitResponse {
    success: boolean;
    data: Visit;
}