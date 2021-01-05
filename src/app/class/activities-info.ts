import {SummaryDetails} from './summary-details';

export class ActivitiesInfo {
place: string;
year: string;
role: string;
summary: Array<SummaryDetails>;
isPresent: boolean;
startDate: string;
startMonth: string;
endDate: string;
endMonth: string;
margin: number;
  constructor(options: { place?: string, year?: string, role?: string, summary?: Array<SummaryDetails>, isPresent?: boolean, startDate?: string,
    startMonth?: string,
    endDate?: string,
    endMonth?: string, margin?: number} = {}) {
    this.place = options.place || null;
    this.year = options.year || null;
    this.role = options.role || null;
    this.summary = options.summary || null;
    this.isPresent = options.isPresent || false;
    this.startDate = options.startDate || null;
    this.startMonth = options.startMonth || null;
    this.endDate = options.endDate || null;
    this.endMonth = options.endMonth || null;
    this.margin = options.margin || null;
  }
}
