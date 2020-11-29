export class Feedback {
  stars: number;
  feedback: string;
  selectedTemplate: string;
  price: string;
  name: string;
  constructor(stars: number, feedback: string, selectedTemplate: string, price: string, name: string) {
    this.stars = stars;
    this.feedback = feedback;
    this.selectedTemplate = selectedTemplate;
    this.price = price;
    this.name = name;
  }
}
