import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-paginated-view',
  templateUrl: 'paginated-view.component.html',
  styleUrls: ['paginated-view.component.scss']
})
export class PaginatedViewComponent implements AfterViewInit {
  @Input() pageSize: 'A3' | 'A4' = 'A4';
  @ViewChild('paginatedView') paginatedView: ElementRef<HTMLDivElement>;
  @ViewChild('contentWrapper') contentWrapper: ElementRef<HTMLDivElement>;
  @ContentChildren('pageContent', { read: ElementRef }) elements: QueryList<ElementRef>;
  public pages = [];
  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updatePages();
      this.elements.changes.subscribe(el => {
        this.updatePages();
      });
    }, 100);
  }

  updatePages(): void {
    this.paginatedView.nativeElement.innerHTML = '';
    let page = this.getNewPage();
    console.log(this.elements);
    if(this.elements) {
      this.paginatedView.nativeElement.appendChild(page);
    }

    let lastEl: HTMLElement;
    // add content childrens to the page one by one
    this.elements.forEach(elRef => {
      const el = elRef.nativeElement;
      console.log(el.clientHeight);
      console.log(page.clientHeight);
      // if the content child height is larger than the size of the page
      // then do not add it to the page
      if (el.clientHeight > page.clientHeight) {
        return;
      }
      // add the child to the page

      // after adding the child if the page scroll hight becomes larger than the page height
      // then get a new page and append the child to the  new page
      if (page.scrollHeight > page.clientHeight) {
        page = this.getNewPage();
        this.paginatedView.nativeElement.appendChild(el);
       // page.appendChild();
      }
      lastEl = el;
      console.log(lastEl);
    });

    // bring the element in to view port
    lastEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  getNewPage(): HTMLDivElement {
      const page = document.createElement('div');
      page.classList.add('page');
      page.classList.add('page-' + Number(this.pages.length + 1));
      page.classList.add(this.pageSize);
      return page;
    }
}
