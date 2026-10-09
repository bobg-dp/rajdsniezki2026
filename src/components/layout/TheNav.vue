<template>
  <nav class="bg-rally-navy" style="height: 52px">
    <div class="mx-auto flex h-full max-w-7xl items-center px-8">
      <ul class="flex h-full items-center">
        <li class="group relative flex h-full items-center">
          <button :class="triggerClass">
            Informacje
            <ChevronIcon />
          </button>
          <div :class="dropdownClass" class="min-w-48">
            <RouterLink to="/o-rajdzie" :class="itemClass">O rajdzie</RouterLink>
            <RouterLink to="/aktualnosci" :class="itemClass">Aktualności</RouterLink>
            <RouterLink to="/filmy" :class="itemClass">Filmy</RouterLink>
          </div>
        </li>

        <li
          v-for="tier in tiers"
          :key="tier.key"
          class="group relative flex h-full items-center"
        >
          <RouterLink :to="`/${tier.slug}`" :class="triggerClass">
            {{ tier.navLabel }}
            <ChevronIcon />
          </RouterLink>
          <div :class="dropdownClass" class="min-w-72">
            <RouterLink :to="`/${tier.slug}/tablica`" :class="itemClass">
              Elektroniczna Tablica Ogłoszeń
            </RouterLink>
            <RouterLink :to="`/${tier.slug}/dokumenty`" :class="itemClass">
              Dokumenty
            </RouterLink>
            <RouterLink :to="`/harmonogram?poziom=${tier.key}`" :class="itemClass">
              Harmonogram
            </RouterLink>
            <RouterLink :to="`/mapy?poziom=${tier.key}`" :class="itemClass">
              Odcinki specjalne
            </RouterLink>
            <RouterLink :to="`/filmy?poziom=${tier.key}`" :class="itemClass">
              Filmy
            </RouterLink>
            <RouterLink to="/lokalizacje" :class="itemClass">Lokalizacje</RouterLink>
            <RouterLink to="/lista-startowa" :class="itemClass">
              Lista startowa / Zapisy
            </RouterLink>
          </div>
        </li>

        <li class="group relative flex h-full items-center">
          <button :class="triggerClass">
            Kibice
            <ChevronIcon />
          </button>
          <div :class="dropdownClass" class="min-w-48">
            <RouterLink to="/kibice/mieszkancy" :class="itemClass">Mieszkańcy</RouterLink>
            <RouterLink to="/kibice/bezpiecznie" :class="itemClass">
              Kibicuj bezpiecznie
            </RouterLink>
            <RouterLink to="/lokalizacje" :class="itemClass">Lokalizacje</RouterLink>
          </div>
        </li>

        <li class="flex h-full items-center">
          <RouterLink to="/partnerzy" :class="linkClass">Partnerzy</RouterLink>
        </li>
        <li class="flex h-full items-center">
          <RouterLink to="/media" :class="linkClass">Media</RouterLink>
        </li>
        <li class="flex h-full items-center">
          <RouterLink to="/kontakt" :class="linkClass">Kontakt</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { tiers } from "../../data/eventConfig.js";

const linkClass =
  "font-display font-semibold uppercase tracking-wider text-sm text-white px-4 h-full flex items-center hover:text-rally-orange transition-colors duration-200";

const triggerClass = `${linkClass} gap-1`;

const dropdownClass =
  "absolute top-full left-0 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50";

const itemClass =
  "block px-5 py-3 font-display font-semibold uppercase text-sm text-rally-navy border-b border-gray-100 hover:bg-rally-orange hover:text-rally-navy transition-colors duration-150";

const ChevronIcon = defineComponent({
  render() {
    return h(
      "svg",
      {
        class:
          "w-3 h-3 transition-transform duration-200 group-hover:rotate-180",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2.5",
          d: "M19 9l-7 7-7-7",
        }),
      ],
    );
  },
});
</script>
