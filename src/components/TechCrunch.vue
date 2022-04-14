<template>
  <div>
    <label
      >Category:
      <select v-model="filters.categories">
        <option v-for="category in availableCategories" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />
    <div>
      <button :disabled="page === 1" @click="prevPage">Prev</button>
      {{ page }}
      <button @click="nextPage">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="item in items">
        <a target="_blank" :href="item.link" v-html="item.title.rendered"></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts, getCategories } from "../techcrunch";
import useFilterable from "../use/filterable";
import { computed, ref } from "vue";

export default {
  setup() {
    const categories = ref([]);
    const availableCategories = computed(() => [
      { id: null, name: "(no category)" },
      ...categories.value,
    ]);
    const loadCategories = async () => {
      categories.value = await getCategories();
    };
    const { page, filters, items, prevPage, nextPage } = useFilterable({
      loadItems: getPosts,
      initialFilters: {
        categories: null,
      },
    });
    loadCategories();
    return {
      categories,
      availableCategories,
      loadCategories,
      page,
      filters,
      items,
      prevPage,
      nextPage,
    };
  },
};
</script>
1
