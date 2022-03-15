<template>
  <div>
    <label
      >Category:
      <select v-model="selectedCategory">
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
import { getPosts, getCategories } from "../api.js";

export default {
  data() {
    return {
      items: [],
      categories: [],
      selectedCategory: null,
      page: 1,
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

    async loadPosts() {
      this.items = await getPosts({
        page: this.page,
        filters: { categories: this.selectedCategory },
      });
    },

    syncHash() {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));
      const entries = Object.fromEntries(urlParams.entries());
      if (entries.page) {
        this.page = entries.page;
      }
      if (entries.category) {
        this.selectedCategory = entries.category;
      }
    },

    updateHash() {
      const urlParams = new URLSearchParams();
      if (this.page !== 1) {
        urlParams.append("page", this.page);
      }
      if (this.selectedCategory !== "") {
        urlParams.append("category", this.selectedCategory);
      }

      window.location.hash = urlParams.toString();
    },
  },

  created() {
    window.addEventListener("hashchange", this.syncHash);
    this.syncHash();
    this.loadCategories();
    this.loadPosts();
  },

  beforeUnmount() {
    window.removeEventListener("hashchange", this.syncHash);
  },

  watch: {
    page() {
      this.loadPosts();
      this.updateHash();
    },
    selectedCategory() {
      this.page = 1;
      this.loadPosts();
      this.updateHash();
    },
  },
};
</script>
1
