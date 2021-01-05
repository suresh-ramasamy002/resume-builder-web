import {SummaryDetails} from './summary-details';

export class ProjectInfo {
  projectTitle: string;
  projectDesc: Array<SummaryDetails>;
  margin: number;
  constructor(projectTitle: string, projectDesc: Array<SummaryDetails>, margin: number) {
    this.projectTitle = projectTitle;
    this.projectDesc = projectDesc;
    this.margin = margin;
  }
}
