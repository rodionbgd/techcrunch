import { reactive, ref, watch, onBeforeUnmount } from "vue";

export default function useFilterable({ loadItems, initialFilters }) {
  const page = ref(1);
  let items = ref([]);
  const filters = reactive({ ...initialFilters });

  const syncHash = () => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const { page: pageValue, ...filtersValue } = Object.fromEntries(
      urlParams.entries()
    );
    if (pageValue) {
      page.value = +pageValue;
    }

    Object.entries(filtersValue).forEach(([key, value]) => {
      filters[key] = value;
    });
  };

  const updateHash = () => {
    const urlParams = new URLSearchParams();
    if (page.value !== 1) {
      urlParams.append("page", `${page.value}`);
    }
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        urlParams.append(key, `${value}`);
      }
    });
    window.location.hash = urlParams.toString();
  };

  const load = () =>
    loadItems({
      page: page.value,
      filters,
    }).then((responseItems) => {
      items.value = responseItems;
    });

  watch(
    () => page.value,
    () => {
      updateHash();
      load();
    }
  );

  watch(
    () => filters,
    () => {
      updateHash();
      load();
    },
    { deep: true }
  );

  load();
  window.addEventListener("hashchange", syncHash);
  onBeforeUnmount(() => {
    window.removeEventListener("hashchange", syncHash);
  });
  return {
    prevPage: () => {
      page.value -= 1;
    },
    nextPage: () => {
      page.value += 1;
    },
    page,
    filters,
    items,
  };
}