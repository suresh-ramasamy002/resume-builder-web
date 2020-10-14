export class EduInfo {
  yearFromTo: string;
  schoolName: string;
  department: string;
  gpa: string;
  constructor(options: {yearFromTo?: string, schoolName?: string, department?: string, gpa?: string} = {}) {
    this.yearFromTo = options.yearFromTo;
    this.schoolName = options.schoolName;
    this.department = options.department;
    this.gpa = options.gpa;
  }
}
