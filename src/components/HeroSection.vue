<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslations } from '../composables/useTranslations'
import { ui } from '../i18n/ui'

const props = defineProps<{
  lang?: keyof typeof ui
}>()

const t = useTranslations(props.lang || 'id')

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  if (!heroRef.value) return

  ctx = gsap.context(() => {
    // --- Animated Background ---
    gsap.to('.bands-track', {
      xPercent: -50,
      ease: 'none',
      duration: 35,
      repeat: -1
    })

    gsap.to('.bands-track', {
      yPercent: -3,
      ease: 'sine.inOut',
      duration: 6,
      repeat: -1,
      yoyo: true
    })

    // copy: fade from left
    gsap.fromTo(
      '.hero-copy',
      { opacity: 0, x: -44 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
    )
    
    // visual: fade from right
    gsap.fromTo(
      '.hero-vis',
      { opacity: 0, x: 44 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.25 }
    )
    
    // chips float in
    gsap.fromTo(
      '.chip-tl',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.6 }
    )
    gsap.fromTo(
      '.chip-br',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.5)', delay: 0.75 }
    )
  }, heroRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="home"
    ref="heroRef"
    class="relative pt-[136px] pb-[128px] bg-[#F8FAFC] overflow-hidden"
  >
    <!-- Refined Animated Stripes Background -->
    <div
      class="absolute top-0 right-0 w-full lg:w-[60%] h-full pointer-events-none overflow-hidden mix-blend-multiply"
      style="mask-image: linear-gradient(to right, transparent, black 15%, black 100%); -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 100%);"
    >
      <div class="absolute w-[200%] h-[200%] -top-[50%] left-[-10%] flex" style="transform: rotate(-24deg);">
        <div class="bands-track flex w-[200%] h-full">
          <!-- Band Set 1 -->
          <div class="band-set flex w-1/2 h-full">
            <div class="h-full bg-[#EAF6FB] opacity-60" style="width: 12%; margin-right: 4%;"></div>
            <div class="h-full bg-[#19A7CE] opacity-[0.05]" style="width: 4%; margin-right: 6%;"></div>
            <div class="h-full bg-[#EAF6FB] opacity-40" style="width: 20%; margin-right: 5%;"></div>
            <div class="h-full bg-[#146C94] opacity-[0.03]" style="width: 10%; margin-right: 8%;"></div>
            <div class="h-full bg-[#19A7CE] opacity-[0.04]" style="width: 6%; margin-right: 5%;"></div>
            <div class="h-full bg-[#EAF6FB] opacity-70" style="width: 16%; margin-right: 4%;"></div>
          </div>
          <!-- Band Set 2 -->
          <div class="band-set flex w-1/2 h-full">
            <div class="h-full bg-[#EAF6FB] opacity-60" style="width: 12%; margin-right: 4%;"></div>
            <div class="h-full bg-[#19A7CE] opacity-[0.05]" style="width: 4%; margin-right: 6%;"></div>
            <div class="h-full bg-[#EAF6FB] opacity-40" style="width: 20%; margin-right: 5%;"></div>
            <div class="h-full bg-[#146C94] opacity-[0.03]" style="width: 10%; margin-right: 8%;"></div>
            <div class="h-full bg-[#19A7CE] opacity-[0.04]" style="width: 6%; margin-right: 5%;"></div>
            <div class="h-full bg-[#EAF6FB] opacity-70" style="width: 16%; margin-right: 4%;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-[clamp(24px,8vw,160px)] relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        <!-- ── Copy ──────────────────────────────────────── -->
        <div class="hero-copy flex flex-col justify-center">
          <!-- Live badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#19A7CE] text-sm font-medium mb-6 w-fit">
            <span class="relative flex h-2.5 w-2.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#19A7CE] opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#19A7CE]"></span>
            </span>
            {{ t('hero.badge') }}
          </div>

          <!-- Original Heading -->
          <h1 class="text-[clamp(40px,4.2vw,62px)] text-[#0B303B] mb-6 leading-[1.1]">
            {{ t('hero.title.pt1') }}<br />
            <em class="text-[#19A7CE] not-italic">{{ t('hero.title.em') }}</em> {{ t('hero.title.pt2') }}<br />
            {{ t('hero.title.pt3') }}
          </h1>

          <!-- Paragraph -->
          <p class="text-lg text-gray-600 mb-8 max-w-lg">
            {{ t('hero.desc') }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 items-center">
            <a
              href="https://wa.me/6281234567890"
              class="inline-flex justify-center items-center px-6 py-3 bg-[#19A7CE] text-white font-medium rounded-lg hover:bg-[#146C94] transition-colors"
            >
              {{ t('hero.cta.primary') }}
            </a>
            <a
              href="#about"
              class="inline-flex justify-center items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {{ t('hero.cta.secondary') }}
            </a>
          </div>
        </div>

        <!-- ── Visual ─────────────────────────────────────── -->
        <div class="hero-vis relative flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
          
          <!-- Frosted Glass Middle Layer -->
          <div class="relative w-full max-w-[500px] aspect-[4/5] bg-white/30 backdrop-blur-xl border border-white/40 rounded-[32px] p-4 shadow-2xl flex items-center justify-center">
            
            <!-- Foreground Image -->
            <img 
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80" 
              alt="Water Delivery" 
              class="rounded-[24px] object-cover w-full h-full shadow-lg" 
            />

            <!-- Chip TL -->
            <div
              class="chip-tl absolute top-8 -left-8 md:-left-12 z-30 bg-white rounded-xl p-4 flex items-center gap-4 shadow-lg border border-gray-100"
            >
              <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl">
                💧
              </div>
              <div>
                <div class="font-bold text-sm text-[#0B303B]">{{ t('hero.chip.tl.title') }}</div>
                <div class="text-xs text-gray-500">{{ t('hero.chip.tl.desc') }}</div>
              </div>
            </div>

            <!-- Chip BR -->
            <div
              class="chip-br absolute bottom-8 -right-8 md:-right-12 z-30 bg-white rounded-xl p-4 flex items-center gap-4 shadow-lg border border-gray-100"
            >
              <div class="w-10 h-10 rounded-full bg-[#19A7CE] flex items-center justify-center text-white">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <div class="font-bold text-lg text-[#0B303B] leading-none">95%</div>
                <div class="text-xs text-gray-500 mt-1">{{ t('hero.chip.br.desc') }}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
