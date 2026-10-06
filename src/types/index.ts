export interface Plan {
  id: string;
  name: string;
  slug: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  originalPrice: number;
  popular?: boolean;
  maxStudents: string;
  maxTutors: string;
  features: string[];
}

export interface IPay88PaymentRequest {
  merchantCode: string;
  merchantKey: string;
  paymentId: string;
  refNo: string;
  amount: string;
  currency: string;
  prodDesc: string;
  userName: string;
  userEmail: string;
  userContact: string;
  remark?: string;
  lang: string;
  signature: string;
  responseUrl: string;
  backendUrl: string;
}

export interface IPay88PaymentResponse {
  merchantCode: string;
  paymentId: string;
  refNo: string;
  amount: string;
  currency: string;
  remark: string;
  transId: string;
  authCode: string;
  status: '1' | '0'; // 1 = Success, 0 = Failed
  errDesc?: string;
  signature: string;
  timestamp: string;
}

export interface WhatsAppMessage {
  id: string;
  recipientName: string;
  phone: string;
  templateType: 'fee_reminder' | 'payment_receipt' | 'attendance_alert' | 'exam_report' | 'marketing_promo';
  content: string;
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: string;
  amount?: number;
}

export interface Student {
  id: string;
  name: string;
  icNumber: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  subjects: string[];
  monthlyFee: number;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  lastPaymentDate?: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  targetAudience: string;
  hook: string;
  bodyText: string;
  callToAction: string;
  channel: 'facebook' | 'tiktok' | 'whatsapp' | 'instagram';
}
