<template>
  <article :class="containerClass">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span
            class="inline-flex items-center bg-rally-navy px-3 py-1 font-display font-bold uppercase text-[11px] tracking-wider text-white"
          >
            {{ itemTypeLabel }}
          </span>
          <span v-if="formattedUpdatedAt" class="text-xs text-gray-500">
            Aktualizacja: {{ formattedUpdatedAt }}
          </span>
        </div>

        <h3
          class="font-display font-bold uppercase text-rally-navy text-lg mb-2"
        >
          {{ item.name }}
        </h3>

        <p v-if="isFolder" class="text-rally-steel text-sm leading-relaxed">
          {{ folderDescription }}
        </p>

        <p
          v-else-if="item.type === 'Text'"
          class="text-rally-steel text-sm leading-relaxed whitespace-pre-line"
        >
          {{ item.text }}
        </p>

        <template v-else>
          <p
            v-if="item.originalFileName"
            class="text-rally-steel text-sm mb-4"
          >
            {{ item.originalFileName }}
          </p>
          <a
            v-if="item.url"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center bg-rally-navy px-5 py-3 font-display font-bold uppercase text-xs tracking-wider text-white hover:bg-rally-steel transition-colors"
          >
            Otwórz dokument
          </a>
        </template>
      </div>

      <div v-if="showFolderControls" class="flex shrink-0 items-start gap-2">
        <div
          v-if="showChildCount"
          class="inline-flex h-11 w-11 items-center justify-center bg-rally-orange font-display text-lg font-black text-rally-navy"
          :title="childCountLabel"
        >
          <span aria-hidden="true">{{ item.childCount }}</span>
          <span class="sr-only">{{ childCountLabel }}</span>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center border border-gray-300 bg-white text-rally-navy transition-colors hover:border-rally-navy"
          :aria-expanded="isOpen"
          :aria-label="toggleLabel"
          @click="isOpen = !isOpen"
        >
          <svg
            class="h-5 w-5 transition-transform duration-200"
            :class="isOpen ? 'rotate-180' : ''"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        v-if="isFolder && isOpen && item.children?.length"
        class="mt-5 space-y-4 border-l-2 border-gray-200 pl-4 md:pl-6"
      >
        <NoticeBoardTreeNode
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :depth="depth + 1"
        />
      </div>
    </Transition>
  </article>
</template>

<script setup>
import { computed, ref } from "vue";

defineOptions({
  name: "NoticeBoardTreeNode",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  timeStyle: "short",
});

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const isOpen = ref(false);

const isFolder = computed(() => props.item.type === "Folder");

const showChildCount = computed(() => Number(props.item.childCount ?? 0) > 0);

const showFolderControls = computed(
  () => isFolder.value && showChildCount.value,
);

const itemTypeLabel = computed(() => {
  if (props.item.label) {
    return props.item.label;
  }

  if (isFolder.value) {
    return "Folder";
  }

  if (props.item.type === "PDF") {
    return "Dokument PDF";
  }

  if (props.item.type === "Text") {
    return "Komunikat";
  }

  return props.item.type;
});

const childCountLabel = computed(() => {
  const childCount = Number(props.item.childCount ?? 0);

  if (childCount === 1) {
    return "1 element";
  }

  const lastTwoDigits = childCount % 100;
  const lastDigit = childCount % 10;

  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return `${childCount} elementy`;
  }

  return `${childCount} elementów`;
});

const folderDescription = computed(() => {
  if (!props.item.childCount) {
    return "Folder organizatora dostępny na tablicy ogłoszeń.";
  }

  return "Kliknij strzałkę, aby rozwinąć zawartość folderu i zobaczyć jego elementy.";
});

const formattedUpdatedAt = computed(() =>
  formatTimestamp(props.item.updatedAt),
);

const containerClass = computed(() => {
  if (props.depth === 0) {
    return "border border-gray-200 bg-white p-5 md:p-6";
  }

  return "border border-gray-200 bg-gray-50 p-4 md:p-5";
});

const toggleLabel = computed(() => {
  return isOpen.value
    ? `Zwiń folder ${props.item.name}`
    : `Rozwiń folder ${props.item.name}`;
});

function formatTimestamp(value) {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateTimeFormatter.format(date);
}

function beforeEnter(element) {
  element.style.height = "0";
  element.style.opacity = "0";
  element.style.overflow = "hidden";
}

function enter(element, done) {
  const onEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }

    element.removeEventListener("transitionend", onEnd);
    done();
  };

  element.addEventListener("transitionend", onEnd);

  requestAnimationFrame(() => {
    element.style.transition =
      "height 240ms cubic-bezier(0.33, 1, 0.68, 1), opacity 180ms ease";
    element.style.height = `${element.scrollHeight}px`;
    element.style.opacity = "1";
  });
}

function afterEnter(element) {
  element.style.height = "auto";
  element.style.opacity = "1";
  element.style.overflow = "visible";
  element.style.transition = "";
}

function beforeLeave(element) {
  element.style.height = `${element.scrollHeight}px`;
  element.style.opacity = "1";
  element.style.overflow = "hidden";
}

function leave(element, done) {
  const onEnd = (event) => {
    if (event.propertyName !== "height") {
      return;
    }

    element.removeEventListener("transitionend", onEnd);
    done();
  };

  element.addEventListener("transitionend", onEnd);

  void element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.transition =
      "height 220ms cubic-bezier(0.32, 0, 0.67, 0), opacity 140ms ease";
    element.style.height = "0";
    element.style.opacity = "0";
  });
}

function afterLeave(element) {
  element.style.height = "";
  element.style.opacity = "";
  element.style.overflow = "";
  element.style.transition = "";
}
</script>
