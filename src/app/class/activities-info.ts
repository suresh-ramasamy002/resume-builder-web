export class ActivitiesInfo {
place: string;
year: string;
role: string;
summary: Array<string>;
isPresent: boolean;
startDate: string;
startMonth: string;
endDate: string;
endMonth: string;
  constructor(options: { place?: string, year?: string, role?: string, summary?: Array<string>, isPresent?: boolean, startDate?: string,
    startMonth?: string,
    endDate?: string,
    endMonth?: string} = {}) {
    this.place = options.place || null;
    this.year = options.year || null;
    this.role = options.role || null;
    this.summary = options.summary || null;
    this.isPresent = options.isPresent || false;
    this.startDate = options.startDate || null;
    this.startMonth = options.startMonth || null;
    this.endDate = options.endDate || null;
    this.endMonth = options.endMonth || null;
  }
}
