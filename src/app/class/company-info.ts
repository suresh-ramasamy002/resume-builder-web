export class CompanyInfo {
   workFromTo: string;
   companyName: string;
   role: string;
   details: Array<string>;
  constructor(options: {workFromTo?: string, companyName?: string, role?: string, details?: Array<string>} = {}) {
    this.workFromTo = options.workFromTo;
    this.companyName = options.companyName;
    this.role = options.role;
    this.details = options.details;
  }
}
