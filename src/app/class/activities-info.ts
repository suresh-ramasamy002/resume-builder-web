export class ActivitiesInfo {
place: string;
year: string;
role: string;
summary: Array<string>;

  constructor(options: { place?: string, year?: string, role?: string, summary?: Array<string>} = {}) {
    this.place = options.place || null;
    this.year = options.year || null;
    this.role = options.role || null;
    this.summary = options.summary || null;
  }
}
