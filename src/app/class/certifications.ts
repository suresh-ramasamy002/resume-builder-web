export class Certifications {
  year: string;
  certificateName: string;

  constructor(options: { year?: string, certificateName?: string} = {}) {
    this.year = options.year;
    this.certificateName = options.certificateName;
  }
}
