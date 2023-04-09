import { trigger, transition, style, animate, keyframes } from "@angular/animations";

export const headerIn = trigger('headerIn', [
    transition(
      ':enter',
      animate(
        '0.5s ease-out',
        keyframes([
          style({
            transform:'translateY(-75px)'
          }),
          style({
            transform:'translateY(0px)'

      
          })
          
        ])
      )
    ),
  ]);
  