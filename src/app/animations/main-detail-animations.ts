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
    animate('300ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms ease-in-out', style({ opacity: 0 })),
  ]),
]);

export const addItemCart = trigger('addItemCart', [
  transition(
    ':leave',
    animate(
      '1s ease-out',
      keyframes([
        style({
          width: '45px',
          height: '43px',
          position: 'absolute',
          top: '-5px',
          right:'-10px',
          visibility:'visible',
        }),
        style({
          width: '45px',
          height: '43px',
          position: 'absolute',
          right:'-10px',
          top:'-60px',
          visibility:'visible',
        }),
          style({
            width: '45px',
          height: '43px',
          position: 'absolute',
          right:'-10px',
          top:'-60px',
          visibility:'visible',
          opacity:0
        })
        
      ])
    )
  ),
]);
