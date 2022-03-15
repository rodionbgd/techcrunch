<template>
  <div>
    <label>Search: <input v-model.lazy="filters.search" /></label>
    <hr />
    <div>
      <button :disabled="page === 1" @click="page -= 1">Prev</button>
      {{ page }}
      <button @click="page++">Next</button>
    </div>
    <hr />
    <ul>
      <li v-for="item in items" :key="item">
        <a target="_blank" :href="item.link">{{ item.name }} </a>
      </li>
    </ul>
  </div>
</template>
<script>
import getPlanets from "../swapi";
import { filterableMixin } from "../mixins/filterable";

export default {
  mixins: [filterableMixin],
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async loadItems() {
      const { results } = await getPlanets({
        page: this.page,
        ...this.filters,
      });
      this.items = results;
    },
  },
};
</script>
