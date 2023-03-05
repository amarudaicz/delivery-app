import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('500ms ease-in-out', style({ opacity: 0 })),
  ]),
]);

export const addItemCart = trigger('addItemCart', [
  transition(
    ':leave',
    animate(
      '1s ease-out',
      keyframes([
        style({
          transform: 'scale(0)',
          position: 'absolute',
          top: '-5px',
          right: '20px',
          visibility:'visible',
          opacity:1
        }),
        style({
          transform: 'scale(0.8)',
          position: 'absolute',
          top: '-5px',
          right: '20px',
          visibility:'visible',
          opacity:1

        }),
        style({
          transform: 'scale(0)',
          position: 'absolute',
          top: '150px',
          right: '20px',
          visibility:'visible',
          opacity:0


        })
      ])
    )
  ),
]);
