export interface NationalityRequest {
    _id?: string;
    name: string;                 // اسم صاحب الطلب
    application_number: string;   // رقم المعاملة
    issue_date: string;           // تاريخ الإصدار (هجري)
    serial_number: string;        // الرقم التسلسلي للمعاملة
    status: 'تم الرفض' | 'تمت الموافقة';
    job: string;                  // المهنة
    image_URL: string;            // اسم/مسار الصورة الخام من الداتابيز
    image?: string;                // الرابط الكامل اللي الـ post('init') بيبنيه
    identity_number: string;
    source_number: string;

    createdAt?: string;
    updatedAt?: string;
}