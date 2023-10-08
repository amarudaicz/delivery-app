import { trigger, transition, style, query, animateChild, group, animate, state } from "@angular/animations";

export const enterRight= trigger('enterRight', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('.2s ease', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('.2s ease', style({ transform: 'translateX(100%)'}))
  ])
]);

export const enterLeft= trigger('enterRight', [
  transition(':enter', [
    style({ transform: 'translateX(-150%)' }),
    animate('.3s ease-out', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)' }),
    animate('.3s ease-out', style({ transform: 'translateX(-150%)'}))
  ])
]);


export const enterDownUp = trigger('slideUpDown', [
  state('void', style({
        display: 'none'
      })),
      transition(':enter', [
        style({
          transform: 'translateY(-100%)'
        }),
        animate('0.5s ease-out')
      ]),
      transition(':leave', [
        animate('0.5s ease-in', style({
          transform: 'translateY(-100%)'
        }))
      ])
])
