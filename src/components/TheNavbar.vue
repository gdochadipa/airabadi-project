<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTranslations } from '../composables/useTranslations'

const props = defineProps<{
  lang?: 'en' | 'id'
}>()

const t = useTranslations(props.lang || 'id')

const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

const links = computed(() => [
  { label: t('nav.home'),      href: '#home'    },
  { label: t('nav.about'),     href: '#about'   },
  { label: t('nav.process'),   href: '#process' },
  { label: t('nav.testi'),     href: '#testi'   },
  { label: t('nav.contact'),   href: '#contact' },
])
</script>

<template>
  <nav
    :class="[
      'fixed inset-x-0 top-0 z-50 h-[68px]',
      'bg-white/90 backdrop-blur-xl border-b border-[#DCE8EC]',
      'transition-shadow duration-300',
      scrolled ? 'shadow-[0_2px_14px_rgba(11,48,59,.06)]' : '',
    ]"
  >
    <div
      class="max-w-[1440px] h-full mx-auto px-[clamp(24px,8vw,160px)] flex items-center justify-between"
    >
      <!-- Logo -->
      <a href="#home" class="flex items-center gap-2 font-display font-extrabold text-[20px] text-[#0B303B]">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="15" fill="rgba(25,167,206,.12)" />
          <path
            d="M15 5C15 5 8 12.5 8 17.5C8 21.09 11.13 24 15 24C18.87 24 22 21.09 22 17.5C22 12.5 15 5 15 5Z"
            fill="#19A7CE"
          />
          <path
            d="M15 10C15 10 10 15 10 18C10 20.21 12.24 22 15 22C17.76 22 20 20.21 20 18C20 15 15 10 15 10Z"
            fill="#146C94"
          />
        </svg>
        Air<span class="text-[#19A7CE]">Abadi</span>
      </a>

      <!-- Desktop links -->
      <ul class="hidden md:flex items-center gap-9">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="nav-link text-[13.5px] font-medium text-[#5C7880] hover:text-[#19A7CE] transition-colors duration-200"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <div class="hidden md:flex items-center gap-4">
        <!-- Language Switcher -->
        <a
          :href="props.lang === 'en' ? '/' : '/en/'"
          class="flex items-center gap-1 text-[13px] font-medium border border-[#DCE8EC] rounded-full px-3 py-1 hover:border-[#19A7CE] transition-colors duration-200"
          aria-label="Toggle language"
        >
          <span :class="props.lang === 'id' ? 'font-bold text-[#0B303B]' : 'text-[#5C7880] opacity-60'">ID</span>
          <span class="text-[#5C7880] opacity-40 text-[10px] mx-1">/</span>
          <span :class="props.lang === 'en' ? 'font-bold text-[#0B303B]' : 'text-[#5C7880] opacity-60'">EN</span>
        </a>

        <!-- CTA -->
        <a
          href="https://wa.me/6281234567890"
          class="inline-flex items-center gap-2 bg-[#19A7CE] text-white text-[13px] font-bold px-[22px] py-[9px] rounded-full shadow-[0_4px_16px_rgba(25,167,206,.28)] hover:bg-[#146C94] hover:translate-y-[-1px] transition-all duration-200"
        >
          {{ t('nav.cta') }}
        </a>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer"
        @click="mobileOpen = !mobileOpen"
        aria-label="Toggle menu"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="block w-6 h-[2px] bg-[#0B303B] rounded transition-all duration-300"
        />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="md:hidden absolute top-[68px] inset-x-0 bg-white border-b border-[#DCE8EC] shadow-md px-6 py-4"
      >
        <ul class="flex flex-col gap-4">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="text-[14px] font-medium text-[#5C7880] hover:text-[#19A7CE] transition-colors duration-200"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </a>
          </li>
          
          <li class="pt-2 border-t border-[#DCE8EC] mt-2 flex items-center justify-between">
            <a
              :href="props.lang === 'en' ? '/' : '/en/'"
              class="inline-flex items-center text-[13px] font-medium border border-[#DCE8EC] rounded-full px-3 py-1"
            >
              <span :class="props.lang === 'id' ? 'font-bold text-[#0B303B]' : 'text-[#5C7880] opacity-60'">ID</span>
              <span class="text-[#5C7880] opacity-40 text-[10px] mx-2">/</span>
              <span :class="props.lang === 'en' ? 'font-bold text-[#0B303B]' : 'text-[#5C7880] opacity-60'">EN</span>
            </a>
            
            <a
              href="https://wa.me/6281234567890"
              class="inline-flex items-center bg-[#19A7CE] text-white text-[13px] font-bold px-5 py-2 rounded-full"
              @click="mobileOpen = false"
            >
              {{ t('nav.cta') }}
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active { transition: all .25s ease; }
.slide-down-enter-from,
.slide-down-leave-to     { opacity: 0; transform: translateY(-8px); }
</style>
