export class HonorAwardsInfo {
  year: string;
  award: string;
  constructor(options: {year?: string, award?: string} = {}) {
    this.year = options.year;
    this.award = options.award;
  }
}
