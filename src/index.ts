import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

console.clear();
console.log('BEFORE Barba Init');
barba.init({
  transitions: [
    {
      name: 'opacity-transition',
      async leave(data) {
        console.log('leave');
        const wCurrent = document.querySelector('.w--current');
        console.log(wCurrent);
        wCurrent.classList.remove('w--current');
        await gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.3
        });
      },
      async enter(data) {
        console.log('enter');
        data.next.container.classList.add('is-transitioning');
        data.next.container.style.opacity = "0";
        await gsap.to(data.next.container, {
          opacity: 1,
          duration: 0.3
        });
        data.next.container.classList.remove('is-transitioning');
      }
    },
  ],
});
barba.hooks.after(() => {
  console.log('after');
  restartWebflow();
});
console.log('AFTER Barba Init');
