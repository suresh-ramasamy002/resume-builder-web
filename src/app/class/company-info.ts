export class CompanyInfo {
   workFromTo: string;
   companyName: string;
   role: string;
   details: Array<string>;
   isPresent: boolean;
   startDate: string;
   startMonth: string;
   endDate: string;
   endMonth: string;
  constructor(options: {workFromTo?: string, companyName?: string, role?: string, details?: Array<string>, isPresent?: boolean, startDate?: string,
    startMonth?: string,
    endDate?: string,
    endMonth?: string} = {}) {
    this.workFromTo = options.workFromTo || null;
    this.companyName = options.companyName || null;
    this.role = options.role || null;
    this.details = options.details || [];
    this.isPresent = options.isPresent || false;
    this.startDate = options.startDate || null;
    this.startMonth = options.startMonth || null;
    this.endDate = options.endDate || null;
    this.endMonth = options.endMonth || null;
  }
}
