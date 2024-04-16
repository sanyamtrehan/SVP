import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

const easeInQuad = 'cubic-bezier(0.550, 0.055, 0.675, 0.190)';

export const zoomInUpAnimation = [
  trigger('zoomInUp', [
    state(
      'void',
      style({
        opacity: 0,
        transform: 'translate(0, 40%)',
        animationTimingFunction: easeInQuad,
      })
    ),
    transition(
      ':enter',
      animate(
        '800ms {{delay}}ms',
        keyframes([
          // style({
          //   opacity: 0.2,
          //   transform: 'translate(0, 20%)',
          //   animationTimingFunction: easeInQuad,
          //   offset: 0.4,
          // }),
          style({
            opacity: 1,
            transform: 'translate(0, 0)',
            animationTimingFunction: easeInQuad,
            offset: 1,
          }),
        ])
      )
    ),
  ]),
];
