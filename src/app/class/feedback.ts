export class Feedback {
  stars: number;
  feedback: string;
  selectedTemplate: string;
  price: string;
  constructor(stars: number, feedback: string, selectedTemplate: string, price: string) {
    this.stars = stars;
    this.feedback = feedback;
    this.selectedTemplate = selectedTemplate;
    this.price = price;
  }
}
