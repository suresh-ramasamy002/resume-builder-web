import {SummaryDetails} from './summary-details';

export class CompanyInfo {
   workFromTo: string;
   companyName: string;
   role: string;
   details: Array<SummaryDetails>;
   isPresent: boolean;
   startDate: string;
   startMonth: string;
   endDate: string;
   endMonth: string;
   margin: number;
  constructor(options: {workFromTo?: string, companyName?: string, role?: string, details?: Array<SummaryDetails>, isPresent?: boolean, startDate?: string,
    startMonth?: string,
    endDate?: string,
    endMonth?: string,  margin?: number} = {}) {
    this.workFromTo = options.workFromTo || null;
    this.companyName = options.companyName || null;
    this.role = options.role || null;
    this.details = options.details || null;
    this.isPresent = options.isPresent || false;
    this.startDate = options.startDate || null;
    this.startMonth = options.startMonth || null;
    this.endDate = options.endDate || null;
    this.endMonth = options.endMonth || null;
    this.margin = options.margin || null;
  }
}
