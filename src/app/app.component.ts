import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  flippedCount = 0;
  randomPositions = [];
  maxScore;
  containerDiv;

  backgroundImage = {
    'background-question-image': 'assets/question.png',
    'background-diamond-image': 'assets/diamond.png',
    'background-question-position': '600px',
    'background-diamond-position': '5px',
    'background-size': 'contain',
    'background-repeat': 'no-repeat'
  };
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    this.containerDiv = this.elRef.nativeElement.querySelector(
      '.gamecontainer'
    );
    this.flippedCount = 0;
    this.maxScore = 0;
    this.generateRandomNumbers();

    for (let gridItem of this.containerDiv.children) {
      gridItem.addEventListener('click', this.flipImage.bind(this));
      let box = gridItem.getAttribute('id');
      // adds multiple background image to few boxes with both question and diamond
      // and remaining with single question background
      if (this.randomPositions.includes(box)) {
          gridItem.style.backgroundImage      = `url(${this.backgroundImage['background-diamond-image']}), url(${this.backgroundImage['background-question-image']})`;
          gridItem.style.backgroundPosition   = `${this.backgroundImage['background-question-position']}, ${this.backgroundImage['background-diamond-position']}`;
          gridItem.style.backgroundSize       = `${this.backgroundImage['background-size']}`;
          gridItem.style.backgroundRepeat     = `${this.backgroundImage['background-repeat']}`;
      } else {
          gridItem.style.backgroundImage      = `url(${this.backgroundImage['background-question-image']})`;
          gridItem.style.backgroundPosition   = `center`;
          gridItem.style.backgroundSize       = `${this.backgroundImage['background-size']}`;
          gridItem.style.backgroundRepeat     = `${this.backgroundImage['background-repeat']}`;
      }
    }
  }

  generateRandomNumbers() {
    const totalDiamonds = 8;

    // clearing the previous place diamonds
    this.randomPositions.length = 0;

    // generating random 8 numbers between 0 to 64
    for (let index = 0; index < totalDiamonds; index++) {
      const position = Math.ceil(Math.random() * 61);
      // hack to prevent entering the repeating numbers inside the array
      if (this.randomPositions.includes(`box-${position}`)) {
        console.log('prevent repeating numbers');
        continue;
      }
      this.randomPositions.push(`box-${position}`);
    }

    if (this.randomPositions.length !== 8) {
      const length = 8 - this.randomPositions.length;
      for (let index = 1; index <= length; index++) {
        this.randomPositions.push(`box-${61 + index}`);
      }
    }
  }

  flipImage(event) {

      let id = event.target.id;
      let element = document.getElementById(id);

      if (this.randomPositions.includes(id)) {
          this.flippedCount++;
          if (this.flippedCount !== 8) {
              element.style.backgroundPosition = `
                  ${this.backgroundImage['background-diamond-position']},
                  ${this.backgroundImage['background-question-position']}
              `;
          } else {
              element.style.backgroundPosition = `
                  ${this.backgroundImage['background-diamond-position']},
                  ${this.backgroundImage['background-question-position']}
              `;
              element.removeEventListener('click', this.flipImage.bind(this));
              this.calculateScore(this.maxScore);
              this.ngOnInit();
              return;
          }

      } else {
          this.maxScore--;
          element.style.background = 'none';
      }

      element.removeEventListener('click', this.flipImage.bind(this));
  }

  calculateScore(total) {

      let template = this.elRef.nativeElement.querySelector('#template');
      let score = this.elRef.nativeElement.querySelector(('#current-score');

      template.style.display = 'block';
      score.innerHTML = `Your Score is ${total}`;
  }
}
