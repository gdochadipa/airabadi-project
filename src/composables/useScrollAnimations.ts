import { onMounted, onUnmounted, type Ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(rootRef: Ref<HTMLElement | null>) {
  let ctx: gsap.Context | null = null
  let triggers: ScrollTrigger[] = []

  function animateEl(el: Element, fromVars: gsap.TweenVars, delay = 0) {
    const t = gsap.fromTo(el, { opacity: 0, ...fromVars }, {
      opacity: 1, x: 0, y: 0, duration: 0.85, ease: 'power3.out', delay,
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    })
    if (t.scrollTrigger) triggers.push(t.scrollTrigger)
  }

  function initFadeUp(root: Element) {
    const groups = new Map<Element, Element[]>()
    root.querySelectorAll('.anim-fade-up').forEach(el => {
      const parent = el.parentElement!
      if (!groups.has(parent)) groups.set(parent, [])
      groups.get(parent)!.push(el)
    })
    groups.forEach(els => els.forEach((el, i) => animateEl(el, { y: 44 }, i * 0.12)))
  }

  function initFadeLeft(root: Element) {
    root.querySelectorAll('.anim-fade-left').forEach(el => animateEl(el, { x: -44 }))
  }

  function initFadeRight(root: Element) {
    root.querySelectorAll('.anim-fade-right').forEach(el => animateEl(el, { x: 44 }))
  }

  function initCounters(root: Element) {
    root.querySelectorAll<HTMLElement>('[data-count]').forEach(el => {
      const target = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0
      const st = ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter() {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target, duration: 1.8, ease: 'power2.out',
            onUpdate() { el.textContent = obj.val.toFixed(decimals) + suffix }
          })
        }
      })
      triggers.push(st)
    })
  }

  onMounted(() => {
    requestAnimationFrame(() => {
      const root = rootRef.value
      if (!root) return
      ctx = gsap.context(() => {
        initFadeUp(root)
        initFadeLeft(root)
        initFadeRight(root)
        initCounters(root)
      }, root)
    })
  })

  onUnmounted(() => {
    ctx?.revert()
    triggers.forEach(t => t.kill())
    triggers = []
  })
}
