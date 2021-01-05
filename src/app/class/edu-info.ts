export class EduInfo {
  yearFromTo: string;
  schoolName: string;
  department: string;
  gpa: string;
  gpaStatus: string;
  gpaFormat: string;
  course: string;
  dept: string;
  startDate: string;
  startMonth: string;
  endDate: string;
  endMonth: string;
  isPresent: boolean;
  margin: number;
  constructor(options: {yearFromTo?: string, schoolName?: string, department?: string, gpa?: string, course?: string, dept?: string
    startDate?: string,
    startMonth?: string,
    endDate?: string,
    endMonth?: string,
    isPresent?: boolean,
    gpaStatus?: string,
    gpaFormat?: string, margin?: number} = {}) {
    this.yearFromTo = options.yearFromTo;
    this.schoolName = options.schoolName;
    this.department = options.department;
    this.gpa = options.gpa;
    this.course = options.course || null;
    this.dept = options.dept || null;
    this.startDate = options.startDate || null;
    this.startMonth = options.startMonth || null;
    this.endDate = options.endDate || null;
    this.endMonth = options.endMonth || null;
    this.isPresent = options.isPresent || false;
    this.gpaStatus = options.gpaStatus || null;
    this.gpaFormat = options.gpaFormat || null;
    this.margin = options.margin || null;
  }
}
