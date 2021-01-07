import {Injectable, OnInit} from '@angular/core';
import {CoreDataService} from './core-data.service';

@Injectable()
export class ConstantDataService {
  public sidemenuSections = [];
  public populateSideMenu = [];

  public cubicSectionLeft = [];
  public cubicSectionRight = [];
  public populateCubicLeft = [];
  public populateCubicRight = [];

  public cascadeSectionLeft = [];
  public cascadeSectionRight = [];
  public populateCascadeLeft = [];
  public populateCascadeRight = [];

  public enfoldSectionLeft = [];
  public enfoldSectionRight = [];
  public populateEnfoldLeft = [];
  public populateEnfoldRight = [];

  public vibesSectionLeft = [];
  public vibesSectionRight = [];
  public populateVibesLeft = [];
  public populateVibesRight = [];

  public crispSectionLeft = [];
  public crispSectionRight = [];
  public populateCrispLeft = [];
  public populateCrispRight = [];

  public museSectionLeft = [];
  public museSectionRight = [];
  public populateMuseLeft = [];
  public populateMuseRight = [];

  public simpleSectionLeft = [];
  public simpleSectionRight = [];
  public populateSimpleLeft = [];
  public populateSimpleRight = [];

  public iconicSection = [];
  public populateIconic = [];

  public nanicaSection = [];
  public populateNanica = [];

  public influxSection = [];
  public populateInflux = [];

  constructor(private coreDataService: CoreDataService) {
    setTimeout(() => {
      this.refreshData();
    }, 100);
  }
  refreshData() {
      if (this.coreDataService.selectedTemplate == 'template-one') {
        this.cubicSectionLeft = [
          {name: 'summary', bool: this.coreDataService.templateData.objective, label: 'Summary'},
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.cubicSectionRight = [
          {name: 'personal info', bool: true, label: 'Personal Info'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
        ];
        this.populateCubicLeft = [];
        this.populateCubicRight = [];
        this.cubicSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateCubicLeft.push(section);
          }
        });
        this.cubicSectionRight.forEach(section => {
          if (section.bool) {
            this.populateCubicRight.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-two') {
        this.cascadeSectionLeft = [
          {name: 'personal info', bool: true, label: 'Personal Info'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
        ];
        this.cascadeSectionRight = [
          {name: 'summary', bool: this.coreDataService.templateData.objective, label: 'Summary'},
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.populateCascadeLeft = [];
        this.populateCascadeRight = [];
        this.cascadeSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateCascadeLeft.push(section);
          }
        });
        this.cascadeSectionRight.forEach(section => {
          if (section.bool) {
            this.populateCascadeRight.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-three') {
           this.vibesSectionLeft = [
             {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
             {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
             {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
             {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
             {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
             {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
             {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
             {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
             {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
             {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
           ];
           this.vibesSectionRight = [
             {name: 'personal info', bool: true, label: 'Personal Info'},
             {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
             {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
             {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
             {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
           ];
           this.populateVibesLeft = [];
           this.populateVibesRight = [];
           this.vibesSectionLeft.forEach(section => {
            if (section.bool) {
             this.populateVibesLeft.push(section);
            }
          });
           this.vibesSectionRight.forEach(section => {
            if (section.bool) {
            this.populateVibesRight.push(section);
            }
          });
      } else if (this.coreDataService.selectedTemplate == 'template-four') {
           this.museSectionLeft = [
             {name: 'personal info', bool: true, label: 'Personal Info'},
             {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
             {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
             {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
             {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
           ];
           this.museSectionRight = [
             {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
             {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
             {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
             {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
             {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
             {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
             {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
             {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
             {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
             {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
           ];
           this.populateMuseLeft = [];
           this.populateMuseRight = [];
           this.museSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateMuseLeft.push(section);
          }
        });
           this.museSectionRight.forEach(section => {
             if (section.bool) {
            this.populateMuseRight.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-five') {
        this.iconicSection = [
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.populateIconic = [];
        this.iconicSection.forEach(section => {
          if (section.bool) {
            this.populateIconic.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-six') {
          this.influxSection = [
            {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
            {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
            {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
            {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
            {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
            {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
            {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
            {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
            {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
            {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
            {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
            {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
            {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
            {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
          ];
          this.populateInflux = [];
          this.influxSection.forEach(section => {
          if (section.bool) {
            this.populateInflux.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-seven') {
        this.enfoldSectionRight = [
          {name: 'personal info', bool: true, label: 'Personal Info'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
        ];
        this.enfoldSectionLeft = [
          {name: 'summary', bool: this.coreDataService.templateData.objective, label: 'Summary'},
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.populateEnfoldLeft = [];
        this.populateEnfoldRight = [];
        this.enfoldSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateEnfoldLeft.push(section);
          }
        });
        this.enfoldSectionRight.forEach(section => {
          if (section.bool) {
            this.populateEnfoldRight.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-eight') {
        this.crispSectionRight = [
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.crispSectionLeft = [
          {name: 'personal info', bool: true, label: 'Personal Info'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
        ];
        this.populateCrispLeft = [];
        this.populateCrispRight = [];
        this.crispSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateCrispLeft.push(section);
          }
        });
        this.crispSectionRight.forEach(section => {
          if (section.bool) {
            this.populateCrispRight.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-nine') {
        this.nanicaSection = [
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.populateNanica = [];
        this.nanicaSection.forEach(section => {
          if (section.bool) {
            this.populateNanica.push(section);
          }
        });
      } else if (this.coreDataService.selectedTemplate == 'template-ten') {
        this.simpleSectionRight = [
          {name: 'work experience', bool: this.coreDataService.templateData.workExp, label: 'Work Experience'},
          {name: 'education', bool: this.coreDataService.templateData.education, label: 'Education'},
          {name: 'project', bool: this.coreDataService.templateData.project, label: 'Projects'},
          {name: 'certificate', bool: this.coreDataService.templateData.certifications, label: 'Certificates'},
          {name: 'course', bool: this.coreDataService.templateData.course, label: 'Courses'},
          {name: 'awards', bool: this.coreDataService.templateData.honorReward, label: 'Awards'},
          {name: 'co-activities', bool: this.coreDataService.templateData.coActivities, label: 'Co-curricular Activities'},
          {name: 'extra-activities', bool: this.coreDataService.templateData.extraActivities, label: 'Extra-curricular Activities'},
          {name: 'additional-info', bool: this.coreDataService.templateData.additionalInfo, label: 'Additional Info'},
          {name: 'reference', bool: this.coreDataService.templateData.reference, label: 'References'}
        ];
        this.simpleSectionLeft = [
          {name: 'personal info', bool: true, label: 'Personal Info'},
          {name: 'skills', bool: this.coreDataService.templateData.skills, label: 'Skills'},
          {name: 'software', bool: this.coreDataService.templateData.tech, label: 'Software'},
          {name: 'languages', bool: this.coreDataService.templateData.language, label: 'Languages'},
          {name: 'interest', bool: this.coreDataService.templateData.interest, label: 'Interests'},
        ];
        this.populateSimpleLeft = [];
        this.populateSimpleRight = [];
        this.simpleSectionLeft.forEach(section => {
          if (section.bool) {
            this.populateSimpleLeft.push(section);
          }
        });
        this.simpleSectionRight.forEach(section => {
          if (section.bool) {
            this.populateSimpleRight.push(section);
          }
        });
      }
   this.sidemenuSections = [
     {name: 'Personal Info', bool: true},
     {name: 'Summary', bool: this.coreDataService.templateData.objective},
     {name: 'Work Experience', bool: this.coreDataService.templateData.workExp},
     {name: 'Education', bool: this.coreDataService.templateData.education},
     {name: 'Skills', bool: this.coreDataService.templateData.skills},
     {name: 'Projects', bool: this.coreDataService.templateData.project},
     {name: 'Software', bool: this.coreDataService.templateData.tech},
     {name: 'Languages', bool: this.coreDataService.templateData.language},
     {name: 'Certifications', bool: this.coreDataService.templateData.certifications},
     {name: 'Courses', bool: this.coreDataService.templateData.course},
     {name: 'Honors', bool: this.coreDataService.templateData.honorReward},
     {name: 'Interests', bool: this.coreDataService.templateData.interest},
     {name: 'Co-curricular Activities', bool: this.coreDataService.templateData.coActivities},
     {name: 'Extra-curricular Activities', bool: this.coreDataService.templateData.extraActivities},
     {name: 'Additional Info', bool: this.coreDataService.templateData.additionalInfo},
     {name: 'Reference', bool: this.coreDataService.templateData.reference},
   ];
     this.populateSideMenu = [];
     this.sidemenuSections.forEach(section => {
       if (section.bool) {
         this.populateSideMenu.push(section);
       }
     });
  }
}
