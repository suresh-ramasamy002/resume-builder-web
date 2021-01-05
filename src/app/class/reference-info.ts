export class ReferenceInfo {
  name: string;
  jobTitle: string;
  company: string;
  margin: number;

  constructor(name: string, jobTitle: string, company: string, margin: number) {
    this.name = name;
    this.jobTitle = jobTitle;
    this.company = company;
    this.margin = margin;
  }
}
