<!-- verified -->
<template>
  <div>
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section">
        <div class="m-b-lg">
          <h1 class="title is-inline">
            Featured Meetups
            <span v-if="ipLocation && !displayAllMeetups"
              >in {{ ipLocation }}</span
            >
          </h1>
          <AppDropdown />
          <router-link
            v-if="user"
            :to="{ name: 'PageMeetupCreate' }"
            class="button is-primary is-pulled-right m-r-sm"
          >
            Create Meetups
          </router-link>
          <button
            @click="fetchAllMeetups"
            class="button is-primary is-pulled-right m-r-sm"
          >
            All
          </button>
        </div>
        <div class="row columns is-multiline">
          <MeetupItem
            v-for="meetup in meetups"
            :key="meetup._id"
            :meetup="meetup"
          ></MeetupItem>
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem
              v-for="category in categories"
              :key="category._id"
              :category="category"
            ></CategoryItem>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="container">
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import CategoryItem from "@/components/CategoryItem";
import MeetupItem from "@/components/MeetupItem";
import { mapActions, mapState, mapGetters } from "vuex";
import pageLoader from "@/mixins/pageLoader";
import { processLocation } from "@/helpers";
export default {
  components: {
    CategoryItem,
    MeetupItem
  },
  data() {
    return {
      displayAllMeetups: false
    };
  },
  // use of mixin to handle loader during load
  mixins: [pageLoader],
  computed: {
    // Accessing the getter from the store
    ...mapGetters({
      user: "auth/authUser",
      ipLocation: "meta/location"
    }),
    // Accessing the state directly from the store without getters
    ...mapState({
      meetups: state => state.meetups.meetups,
      categories: state => state.categories.categories
    })
  },
  async created() {
    const filter = {};
    if (this.ipLocation) {
      filter["location"] = processLocation(this.ipLocation);
    }

    try {
      await this.fetchMeetups({ filter });
      await this.fetchCategories();
      this.pageLoader_resolveData();
    } catch (err) {
      console.log(err);
      this.pageLoader_resolveData();
    }
  },
  methods: {
    // Map the actions from the store
    ...mapActions("meetups", ["fetchMeetups"]),
    ...mapActions("categories", ["fetchCategories"]),
    fetchAllMeetups() {
      this.displayAllMeetups = true;
      this.fetchMeetups();
    }
  }
};
</script>

<style scoped></style>
