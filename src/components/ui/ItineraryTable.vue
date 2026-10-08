<template>
  <p class="border-x border-gray-200 bg-gray-50 px-3 py-2 text-xs text-rally-steel md:hidden">
    Przewiń tabelę w bok, żeby zobaczyć kilometry i godziny.
  </p>
  <div class="overflow-x-auto border-x border-b border-gray-200">
    <table class="w-full min-w-[760px] border-collapse text-left">
      <caption class="sr-only">
        {{ day.label }}. Godziny oznaczają czas pierwszej załogi.
      </caption>
      <thead>
        <tr class="border-b border-gray-200 bg-gray-50 font-display text-[11px] font-bold uppercase tracking-wider text-gray-500">
          <th scope="col" class="px-3 py-3">PKC</th>
          <th scope="col" class="px-3 py-3">Lokalizacja</th>
          <th scope="col" class="px-3 py-3 text-right">OS km</th>
          <th scope="col" class="px-3 py-3 text-right">Dojazd km</th>
          <th scope="col" class="px-3 py-3 text-right">Odcinek km</th>
          <th scope="col" class="px-3 py-3 text-right">Czas</th>
          <th scope="col" class="px-3 py-3 text-right">1. załoga</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="group in day.groups" :key="group.id">
          <tr class="border-b border-gray-200 bg-gray-50">
            <th
              colspan="7"
              scope="colgroup"
              class="px-3 py-2 font-display text-xs font-bold uppercase tracking-[0.2em] text-rally-orange"
            >
              {{ group.label }}
            </th>
          </tr>
          <tr
            v-for="row in group.rows"
            :key="row.code ? `${group.id}-${row.code}` : `${group.id}-${row.name}`"
            :class="rowClass(row.kind)"
          >
            <th scope="row" :class="codeClass(row.kind)">
              {{ row.code }}
            </th>
            <td class="px-3 py-2.5">
              <a
                v-if="row.mapsUrl"
                :href="row.mapsUrl"
                target="_blank"
                rel="noopener noreferrer"
                :class="[nameClass(row.kind), 'text-inherit underline-offset-2 hover:underline']"
                :aria-label="row.mapsLabel"
              >
                {{ row.name }}
              </a>
              <p v-else :class="nameClass(row.kind)">{{ row.name }}</p>
              <p
                v-if="row.detail"
                :class="detailClass(row.kind)"
              >
                {{ row.detail }}
              </p>
            </td>
            <td :class="numberClass(row)">{{ formatKm(row.ssKm, row.summary) }}</td>
            <td :class="numberClass(row)">{{ formatKm(row.liaisonKm, row.summary) }}</td>
            <td :class="numberClass(row)">{{ formatKm(row.sectorKm, row.summary) }}</td>
            <td :class="numberClass(row)">{{ row.targetTime }}</td>
            <td :class="timeClass(row.kind)">{{ row.firstCar }}</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr class="border-t-2 border-rally-navy bg-gray-100 font-display text-sm font-bold text-rally-navy">
          <th scope="row" colspan="2" class="px-3 py-3 text-left">
            {{ day.totals.label }}
          </th>
          <td class="px-3 py-3 text-right tabular-nums">{{ formatKm(day.totals.ssKm) }}</td>
          <td class="px-3 py-3 text-right tabular-nums">{{ formatKm(day.totals.liaisonKm) }}</td>
          <td class="px-3 py-3 text-right tabular-nums">{{ formatKm(day.totals.sectorKm) }}</td>
          <td></td>
          <td class="px-3 py-3 text-right tabular-nums">{{ day.totals.ratio }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup>
const kmFormatter = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

defineProps({
  day: {
    type: Object,
    required: true,
  },
});

function formatKm(value, summary = false) {
  if (value == null) {
    return "";
  }

  const formatted = kmFormatter.format(value);

  return summary ? `(${formatted})` : formatted;
}

function rowClass(kind) {
  if (kind === "service") {
    return "border-b border-white/10 bg-rally-navy text-white";
  }

  if (kind === "refuel") {
    return "border-b border-amber-200 bg-amber-100 text-rally-navy";
  }

  if (kind === "stage") {
    return "border-b border-gray-100 bg-white text-rally-navy";
  }

  return "border-b border-gray-100 bg-white text-rally-navy";
}

function codeClass(kind) {
  const tone = kind === "service" ? "text-white" : "text-rally-navy";

  return `whitespace-nowrap px-3 py-2.5 text-left font-display text-sm font-bold ${tone}`;
}

function nameClass(kind) {
  if (kind === "stage") {
    return "font-display text-sm font-black uppercase tracking-wide";
  }

  if (kind === "service") {
    return "font-display text-sm font-bold uppercase tracking-wide";
  }

  return "text-sm leading-snug";
}

function detailClass(kind) {
  return kind === "service"
    ? "mt-0.5 text-xs text-white/70"
    : "mt-0.5 text-xs text-rally-navy/70";
}

function numberClass(row) {
  const weight = row.kind === "stage" ? "font-bold" : "font-medium";

  return `whitespace-nowrap px-3 py-2.5 text-right text-sm tabular-nums ${weight}`;
}

function timeClass(kind) {
  const weight = kind === "stage" ? "font-black" : "font-bold";

  return `whitespace-nowrap px-3 py-2.5 text-right font-display text-sm tabular-nums ${weight}`;
}
</script>
