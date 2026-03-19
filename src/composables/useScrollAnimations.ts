import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  let triggers: ScrollTrigger[] = []

  function animateEl(
    el: Element,
    fromVars: gsap.TweenVars,
    delay = 0
  ) {
    const t = gsap.fromTo(
      el,
      { opacity: 0, ...fromVars },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    )
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
  }

  function initAnimations(container: Element | Document = document) {
    const root = container === document ? document : container as Element

    // fade-up: stagger siblings
    const fuGroups = new Map<Element, Element[]>()
    root.querySelectorAll('.anim-fade-up').forEach((el) => {
      const parent = el.parentElement!
      if (!fuGroups.has(parent)) fuGroups.set(parent, [])
      fuGroups.get(parent)!.push(el)
    })
    fuGroups.forEach((els) => {
      els.forEach((el, i) => animateEl(el, { y: 44 }, i * 0.12))
    })

    // fade-left
    root.querySelectorAll('.anim-fade-left').forEach((el) =>
      animateEl(el, { x: -44 })
    )

    // fade-right
    root.querySelectorAll('.anim-fade-right').forEach((el) =>
      animateEl(el, { x: 44 })
    )
  }

  function initCounters(container: Element | Document = document) {
    const root = container === document ? document : container as Element
    root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter() {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = obj.val.toFixed(decimals) + suffix
            },
          })
        },
      })
      triggers.push(st)
    })
  }

  onMounted(() => {
    // small tick to ensure DOM is painted
    requestAnimationFrame(() => {
      initAnimations()
      initCounters()
    })
  })

  onUnmounted(() => {
    triggers.forEach((t) => t.kill())
    triggers = []
  })

  return { initAnimations, initCounters }
}
