<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{ lang?: 'id' | 'en' }>()
const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

const testimonials = computed(() => [
  {
    text: t('testi.t1.text'),
    name: 'Badung, Bali',
    role: t('testi.t1.role'),
    avatar: 'B',
    featured: false,
  },
  {
    text: t('testi.t2.text'),
    name: 'Made Ketut',
    role: t('testi.t2.role'),
    avatar: 'M',
    featured: true,
  },
  {
    text: t('testi.t3.text'),
    name: 'Dewi Ayu',
    role: t('testi.t3.role'),
    avatar: 'D',
    featured: false,
  },
])

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.fromTo('.testi-hd',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.testi-hd', start: 'top 88%', toggleActions: 'play none none none' } }
    )
    document.querySelectorAll('.testi-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
          delay: i * 0.14,
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } }
      )
    })
  })
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="testi" class="py-[128px] bg-white">
    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)]">

      <!-- Header -->
      <div class="testi-hd text-center mb-16">
        <div class="inline-flex items-center justify-center gap-2 font-display text-[11px] font-bold tracking-[.15em] uppercase text-[#19A7CE] mb-5">
          <span class="w-[22px] h-[2px] bg-[#19A7CE] rounded inline-block" />
          {{ t('testi.eyebrow') }}
          <span class="w-[22px] h-[2px] bg-[#19A7CE] rounded inline-block" />
        </div>
        <h2 class="text-[clamp(28px,3vw,42px)] text-[#0B303B] leading-[1.12]">
          {{ t('testi.title.pt1') }}
          <em class="text-[#19A7CE] not-italic">{{ t('testi.title.em') }}</em>
        </h2>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="testi-card rounded-[22px] p-8 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_36px_rgba(11,48,59,.10)]"
          :class="t.featured
            ? 'border-transparent text-white'
            : 'border-[#DCE8EC] bg-white'"
          :style="t.featured
            ? 'background: linear-gradient(145deg,#146C94 0%,#0B303B 100%)'
            : ''"
        >
          <!-- Big quote -->
          <div
            class="font-display font-black text-[52px] leading-none mb-4"
            :class="t.featured ? 'text-white/20' : 'text-[#19A7CE]'"
          >&ldquo;</div>

          <!-- Stars -->
          <div class="flex gap-[3px] text-[13px] mb-5">⭐⭐⭐⭐⭐</div>

          <!-- Text -->
          <p
            class="text-[14.5px] leading-[1.75] italic mb-7"
            :class="t.featured ? 'text-white/82' : 'text-[#5C7880]'"
          >
            {{ t.text }}
          </p>

          <!-- Author -->
          <div
            class="flex items-center gap-3 pt-5 border-t"
            :class="t.featured ? 'border-white/15' : 'border-[#DCE8EC]'"
          >
            <div
              class="w-[42px] h-[42px] rounded-full flex items-center justify-center font-display font-extrabold text-[16px]"
              :class="t.featured ? 'bg-white/20 text-white' : 'bg-[#EAF6FB] text-[#19A7CE]'"
            >
              {{ t.avatar }}
            </div>
            <div>
              <div
                class="font-display font-bold text-[14.5px]"
                :class="t.featured ? 'text-white' : 'text-[#0B303B]'"
              >{{ t.name }}</div>
              <div
                class="text-[12px] mt-[2px]"
                :class="t.featured ? 'text-white/58' : 'text-[#5C7880]'"
              >{{ t.role }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
