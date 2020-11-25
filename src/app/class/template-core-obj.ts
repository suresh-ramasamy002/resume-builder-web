import {CompanyInfo} from './company-info';
import {EduInfo} from './edu-info';
import {Certifications} from './certifications';
import {HonorAwardsInfo} from './honor-awards-info';
import {ActivitiesInfo} from './activities-info';
import {Skills} from './skills';

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
 interestOn: Array<string>;
 additionalInfoDetails: Array<string>;
 referenceDetails: Array<string>;
 activitiesInfo: Array<ActivitiesInfo>;
 pageType: string;
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
    interestOn?: Array<string>,
    additionalInfoDetails?: Array<string>,
    referenceDetails?: Array<string>,
    activitiesInfo?: Array<ActivitiesInfo>,
    pageType?: string,
    language?: boolean,
    tech?: boolean
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
    this.honorReward = options.honorReward || true;
    this.education = options.education || true;
    this.activities = options.activities || true;
    this.certifications = options.certifications || true;
    this.additionalInfo = options.additionalInfo || true;
    this.interest = options.interest || true;
    this.skills = options.skills || true;
    this.reference = options.reference || true;
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
    this.activitiesInfo = options.activitiesInfo || null;
    this.pageType = options.pageType || null;
    this.language = options.language || true;
    this.tech = options.tech || true;
  }
}
