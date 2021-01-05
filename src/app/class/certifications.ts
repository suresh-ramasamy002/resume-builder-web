export class Certifications {
  year: string;
  certificateName: string;
  description: string;
  margin: number;
  fromDate: string;
  toDate: string;
  constructor(options: { year?: string, certificateName?: string, fromDate?: string,
    toDate?: string, margin?: number, description?: string} = {}) {
    this.year = options.year;
    this.certificateName = options.certificateName;
    this.fromDate = options.fromDate;
    this.toDate = options.toDate;
    this.margin = options.margin;
    this.description = options.description;
  }
}
