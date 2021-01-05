export class HonorAwardsInfo {
  year: string;
  award: string;
  margin: number;
  constructor(options: {year?: string, award?: string, margin?:number} = {}) {
    this.year = options.year;
    this.award = options.award;
    this.margin = options.margin;
  }
}
