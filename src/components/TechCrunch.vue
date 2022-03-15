<template>
  <div>
    <label
      >Category:
      <select v-model="filters.categories">
        <option
          v-for="category in availableCategories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />
    <div>
      <button :disabled="page === 1" @click="page -= 1">Prev</button>
      {{ page }}
      <button @click="page++">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="item in items" :key="item">
        <a target="_blank" :href="item.link" v-html="item.title.rendered"></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts, getCategories } from "../techcrunch";
import { filterableMixin } from "../mixins/filterable";

export default {
  mixins: [filterableMixin],
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    availableCategories() {
      return [{ id: null, name: "(no category)" }, ...this.categories];
    },
  },
  methods: {
    async loadCategories() {
      this.categories = await getCategories();
    },

    async loadItems() {
      this.items = await getPosts({
        page: this.page,
        filters: this.filters,
      });
    },
  },

  created() {
    this.loadCategories();
  },
};
</script>
1
