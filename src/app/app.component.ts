import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px)',
        })
      ),
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'green',
          transform: 'translateX(0) scale(0.5)',
        })
      ),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
        }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300),
      ]),
      transition('* => void', [
        animate(
          300,
          style({
            opacity: 0,
            transform: 'translateX(100px)',
          })
        ),
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0px)',
        })
      ),
      transition('void => *', [
        animate(
          1000,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(-100px)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'translateX(-50px)',
              offset: 0.3,
            }),
            style({
              opacity: 1,
              transform: 'translateX(-20px)',
              offset: 0.8,
            }),
            style({
              opacity: 1,
              transform: 'translateX(-0px)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        group([
          animate(
            300,
            style({
              color: 'red',
            })
          ),
          animate(
            900,
            style({
              opacity: 0,
              transform: 'translateX(100px)',
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];
  animation1Text: HTMLElement;
  animation2Text: HTMLElement;

  ngOnInit() {
    this.animation1Text = document.getElementById('animation1');
    this.animation2Text = document.getElementById('animation2');
    this.animation1Text.innerHTML = ``;
    this.animation2Text.innerHTML = ``;
  }

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(item) {
    const index = this.list.indexOf(item);
    this.list.splice(index, 1);
  }

  animation1Started(event: Event) {
    console.log(event);
    this.animation1Text.innerHTML = `<strong>1st Animation active</strong>`;
  }

  animation1Ended(event: Event) {
    console.log(event);
    this.animation1Text.innerHTML = ``;
  }

  animation2Started(event: Event) {
    console.log(event);
    this.animation2Text.innerHTML = `<strong>2nd Animation active</strong>`;
  }

  animation2Ended(event: Event) {
    console.log(event);
    this.animation2Text.innerHTML = ``;
  }
}
