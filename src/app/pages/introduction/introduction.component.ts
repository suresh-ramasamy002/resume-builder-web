import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
declare var $: any;
import videojs from 'video.js';
@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, AfterViewInit {
  player: videojs.Player;
  @ViewChild('aboutSection') aboutSection: ElementRef;
  @ViewChild('resumeSection') resumeSection: ElementRef;
  @ViewChild('homeSection') homeSection: ElementRef;
  url: string = 'https://firebasestorage.googleapis.com/v0/b/fir-resume-builder.appspot.com/o/about-resumearc-upload.mp4?alt=media&token=a741d351-a2aa-4e46-84d1-d62bcfa55dbd';
  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this.player = videojs('video', {
      aspectRatio: '16:9',
      controls: true,
      autoplay: false,
      muted: false,
      html5: {
        hls: {
          overrideNative: true
        }
      }
    });
    this.player.src({
      src: this.url,
      type: 'video/mp4'
    });
  }
  goToAbout() {
    this.aboutSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
  goToResume() {
    this.resumeSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
  goToHome() {
    this.homeSection.nativeElement.scrollIntoView({behavior: 'smooth'});
  }
}

