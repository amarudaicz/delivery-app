import { trigger,transition,style,query,animateChild,group,animate } from "@angular/animations";
const yOfsset = window.scrollY
console.log();


export const routeAnimations =
  trigger('routeAnimations', [
    // transition('home => detail', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       overflow:'visible',
    //       left: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [
    //     style({ left: '100%', top:globalThis.window.scrollY}),
    //   ], { optional: true }),
    //   query(':leave', animateChild(), { optional: true }),
    //   group([
    //     query(':leave', [
    //       animate('30000ms ease-out', style({ left: '-100%', }))
    //     ], { optional: true }),
    //     query(':enter', [
    //       animate('30000ms ease-out', style({ left: '0%' }))
    //     ], { optional: true }),
    //   ]),
    // ]),
    // transition('* => *', [
    //   query(':enter, :leave', [
    //     style({
    //       opacity:1
    //     })
    //   ]), 
    //   query(':enter', [
    //     style({ opacity: '0' })
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('0ms ease-out', style({ opacity: '0'}))
    //     ]),
    //     query(':enter', [
    //       animate('250ms ease-out', style({ opacity: '1' }))
    //     ]),
    //     query('@*', animateChild())
    //   ]),
    // ])
  ]);