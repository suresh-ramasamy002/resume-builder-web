export class Certifications {
  year: string;
  certificateName: string;
  fromDate: string;
  toDate: string;
  constructor(options: { year?: string, certificateName?: string, fromDate?: string,
    toDate?: string} = {}) {
    this.year = options.year;
    this.certificateName = options.certificateName;
    this.fromDate = options.fromDate;
    this.toDate = options.toDate;
  }
}
