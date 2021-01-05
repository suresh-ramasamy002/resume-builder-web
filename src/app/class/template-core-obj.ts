import {CompanyInfo} from './company-info';
import {EduInfo} from './edu-info';
import {Certifications} from './certifications';
import {HonorAwardsInfo} from './honor-awards-info';
import {ActivitiesInfo} from './activities-info';
import {Skills} from './skills';
import {ProjectInfo} from './project-info';
import {CourseInfo} from './course-info';
import {Fonts} from './fonts';
import {Spacing} from './spacing';
import {SummaryDetails} from './summary-details';
import {ReferenceInfo} from './reference-info';

export class TemplateCoreObj {
  image: any;
  isImageNeeded: boolean;
 title: string;
 titleSize: number;
 role: string;
 roleSize: number;
 normalSize: number;
 dob: string;
 gender: string;
 phone: string;
 email: string;
 address: string;
 templateTheme: string;
 fontSize: number;
 fontFamily: string;
 objective: boolean;
 workExp: boolean;
 honorReward: boolean;
 education: boolean;
 activities: boolean;
 certifications: boolean;
 additionalInfo: boolean;
 interest: boolean;
 skills: boolean;
 language: boolean;
 tech: boolean;
 reference: boolean;
 objectiveMsg: string;
 companyInfo: Array<CompanyInfo>;
 educationInfo: Array<EduInfo>;
 certificates: Array<Certifications>;
 honorAwardInfo: Array<HonorAwardsInfo>;
 knownLanguage: Array<Skills>;
 computerSkills: Array<Skills>;
 technicalSkills: Array<Skills>;
 interestOn: Array<SummaryDetails>;
 additionalInfoDetails: Array<SummaryDetails>;
 referenceDetails: Array<ReferenceInfo>;
 pageType: string;
 linkedIn: string;
 gitHub: string;
 project: boolean;
 coActivities: boolean;
 extraActivities: boolean;
 course: boolean;
 projectInfo: Array<ProjectInfo>;
 coActivitiesInfo: Array<SummaryDetails>;
 extraActivitiesInfo: Array<SummaryDetails>;
 courseInfo: Array<CourseInfo>;
 fonts: Fonts;
 spacing: Spacing;
 showSkillsRate: boolean;
 showTechRate: boolean;
 showLanguageRate: boolean;
 spacingPersonalInfo: number;
 spacingObjective: number;
 spacingWorkExp: number;
 spacingCourse: number;
 spacingProject: number;
 spacingEducation: number;
 spacingSkills: number;
 spacingSoftware: number;
 spacingLanguage: number;
 spacingInterest: number;
 spacingCertificate: number;
 spacingAwards: number;
 spacingCoActivities: number;
 spacingExtraActivities: number;
 spacingAddInfoActivities: number;
 spacingReference: number;
 starType: string;
  constructor(options: { image?: any, isImageNeeded?: boolean, title?: string, titleSize?: number, role?: string, roleSize?: number, normalSize?: number, dob?: string, gender?: string, templateTheme?: string,  fontSize?: number, fontFamily?: string, objective?: boolean,
    workExp?: boolean,
    honorReward?: boolean,
    education?: boolean,
    activities?: boolean,
    certifications?: boolean,
    additionalInfo?: boolean,
    interest?: boolean,
    skills?: boolean,
    reference?: boolean,
    phone?: string,
    email?: string,
    address?: string,
    objectiveMsg?: string,
    companyInfo?: Array<CompanyInfo>,
    educationInfo?: Array<EduInfo>,
    certificates?: Array<Certifications>,
    honorAwardInfo?: Array<HonorAwardsInfo>,
    knownLanguage?: Array<Skills>,
    computerSkills?: Array<Skills>,
    technicalSkills?: Array<Skills>,
    interestOn?: Array<SummaryDetails>,
    additionalInfoDetails?: Array<SummaryDetails>,
    referenceDetails?: Array<ReferenceInfo>,
    pageType?: string,
    language?: boolean,
    tech?: boolean,
    linkedIn?: string,
    gitHub?: string,
    project?: boolean,
    coActivities?: boolean,
    extraActivities?: boolean,
    course?: boolean,
    projectInfo?: Array<ProjectInfo>,
    coActivitiesInfo?: Array<SummaryDetails>,
    extraActivitiesInfo?: Array<SummaryDetails>,
    courseInfo?: Array<CourseInfo>,
    fonts?: Fonts,
    spacing?: Spacing,
    showSkillsRate?: boolean,
    showTechRate?: boolean,
    showLanguageRate?: boolean
    spacingPersonalInfo?: number;
    spacingObjective?: number;
    spacingWorkExp?: number;
    spacingCourse?: number;
    spacingProject?: number;
    spacingEducation?: number;
    spacingSkills?: number;
    spacingSoftware?: number;
    spacingLanguage?: number;
    spacingInterest?: number;
    spacingCertificate?: number;
    spacingAwards?: number;
    spacingCoActivities?: number;
    spacingExtraActivities?: number;
    spacingAddInfoActivities?: number;
    spacingReference?: number;
    starType?: string;
  } = {}) {
    this.image = options.image;
    this.isImageNeeded = options.image || true;
    this.title = options.title;
    this.titleSize = options.titleSize;
    this.role = options.role;
    this.roleSize = options.roleSize;
    this.normalSize = options.normalSize;
    this.dob = options.dob;
    this.gender = options.gender;
    this.templateTheme = options.templateTheme;
    this.fontSize = options.fontSize;
    this.fontFamily = options.fontFamily;
    this.objective = options.objective || true;
    this.workExp = options.workExp || true;
    this.honorReward = options.honorReward || false;
    this.education = options.education || true;
    this.activities = options.activities || false;
    this.certifications = options.certifications || false;
    this.additionalInfo = options.additionalInfo || false;
    this.interest = options.interest || false;
    this.skills = options.skills || true;
    this.reference = options.reference || false;
    this.phone = options.phone || null;
    this.email = options.email || null;
    this.address = options.address ||  null;
    this.objectiveMsg = options.objectiveMsg || null;
    this.companyInfo = options.companyInfo || null;
    this.educationInfo = options.educationInfo || null;
    this.certificates = options.certificates || null;
    this.honorAwardInfo = options.honorAwardInfo || null;
    this.knownLanguage = options.knownLanguage || null;
    this.computerSkills = options.computerSkills || null;
    this.technicalSkills = options.technicalSkills || null;
    this.interestOn = options.interestOn || null;
    this.additionalInfoDetails = options.additionalInfoDetails || null;
    this.referenceDetails = options.referenceDetails || null;
    this.pageType = options.pageType || null;
    this.language = options.language || false;
    this.tech = options.tech || false;
    this.linkedIn = options.linkedIn || null;
    this.gitHub = options.gitHub || null;
    this.project = options.project  || false;
    this.coActivities = options.coActivities || false;
    this.extraActivities = options.extraActivities || false;
    this.course = options.course || false;
    this.courseInfo = options.courseInfo || null;
    this.projectInfo = options.projectInfo || null;
    this.coActivitiesInfo = options.coActivitiesInfo || null;
    this.extraActivitiesInfo = options.extraActivitiesInfo || null;
    this.fonts = options.fonts;
    this.spacing = options.spacing;
    this.showLanguageRate = options.showLanguageRate || false;
    this.showSkillsRate = options.showSkillsRate || false;
    this.showTechRate = options.showTechRate || false;
    this.spacingPersonalInfo = options.spacingPersonalInfo || 0;
    this.spacingObjective = options.spacingObjective || 0;
    this.spacingWorkExp = options.spacingObjective || 0;
    this.spacingCourse = options.spacingCourse || 0;
    this.spacingProject = options.spacingProject || 0;
    this.spacingEducation = options.spacingEducation || 0;
    this.spacingSkills = options.spacingSkills || 0;
    this.spacingSoftware = options.spacingSoftware || 0;
    this.spacingLanguage = options.spacingLanguage || 0;
    this.spacingInterest = options.spacingInterest || 0;
    this.spacingCertificate = options.spacingCertificate || 0;
    this.spacingAwards = options.spacingAwards || 0;
    this.spacingCoActivities = options.spacingCoActivities || 0;
    this.spacingExtraActivities = options.spacingExtraActivities || 0;
    this.spacingAddInfoActivities = options.spacingAddInfoActivities || 0;
    this.spacingReference = options.spacingReference || 0;
    this.starType = options.starType || null;
  }
}
