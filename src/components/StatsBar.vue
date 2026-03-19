<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

const stats = computed(() => [
  { value: 5,  suffix: '+', label: t('stats.years') },
  { value: 95, suffix: '%', label: t('stats.reviews') },
  { value: 2,  suffix: '',  label: t('stats.trucks') },
  { value: 2,  suffix: '',  label: t('stats.active_trucks') },
])

let triggers: ScrollTrigger[] = []

onMounted(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const target = parseFloat(el.dataset.count || '0')
      const suffix = el.dataset.suffix || ''

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
              el.textContent = Math.round(obj.val) + suffix
            },
          })
        },
      })
      triggers.push(st)
    })

    // fade up all stat items
    document.querySelectorAll('.stat-item').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        }
      )
    })
  })
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
  triggers = []
})
</script>

<template>
  <section class="bg-white border-t border-b border-[#DCE8EC]">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)] grid grid-cols-4">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="stat-item py-[52px] text-center relative"
        :class="i > 0 ? 'before:absolute before:left-0 before:top-[28%] before:h-[44%] before:w-px before:bg-[#DCE8EC]' : ''"
      >
        <div
          class="font-display font-black text-[#0B303B] leading-none mb-3"
          style="font-size: clamp(40px, 3.8vw, 52px)"
          :data-count="stat.value"
          :data-suffix="stat.suffix"
        >
          {{ stat.value }}{{ stat.suffix }}
        </div>
        <div class="text-[13px] text-[#5C7880] font-medium">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>
