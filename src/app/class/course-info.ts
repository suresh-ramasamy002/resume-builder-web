import {SummaryDetails} from './summary-details';

export class CourseInfo {
  courseFromTo: string;
  courseTitle: string;
  details: Array<SummaryDetails>;
  isPresent: boolean;
  startDate: string;
  startMonth: string;
  endDate: string;
  endMonth: string;
  margin: number;
  constructor(workFromTo: string, courseTitle: string, details: Array<SummaryDetails>, isPresent: boolean, startDate: string, startMonth: string, endDate: string, endMonth: string,  margin: number) {
    this.courseFromTo = workFromTo;
    this.courseTitle = courseTitle;
    this.details = details;
    this.isPresent = isPresent;
    this.startDate = startDate;
    this.startMonth = startMonth;
    this.endDate = endDate;
    this.endMonth = endMonth;
    this.margin = margin;
  }
}
