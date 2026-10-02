<script setup>
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { buildHeadForRoute } from "../../seo/updateSeo.js";

const route = useRoute();

useHead(() => buildHeadForRoute(route));
</script>