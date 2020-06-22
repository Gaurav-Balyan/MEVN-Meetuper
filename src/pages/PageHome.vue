<template>
  <div>
    <AppHero />
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section no-bottom-pdg">
        <div class="m-b-lg">
          <h1 class="title is-inline">
            Featured Meetups
          </h1>
          <AppDropdown />
          <router-link
            v-if="user"
            :to="{ name: 'PageMeetupCreate' }"
            class="button is-primary is-pulled-right m-r-sm"
          >
            Create Meetups
          </router-link>
          <router-link
            :to="{ name: 'PageMeetupFind' }"
            class="button is-primary is-pulled-right m-r-sm"
          >
            All
          </router-link>
        </div>
        <div class="row columns is-multiline">
          <MeetupItem
            v-for="meetup in meetups"
            :key="meetup._id"
            :meetup="meetup"
          ></MeetupItem>
        </div>
        <div class="paginate-align">
          <paginate
            v-model="pagination.pageNum"
            :page-count="pagination.pageCount"
            :click-handler="fetchPaginatedMeetups"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'paginationContainer'"
          >
          </paginate>
        </div>
      </section>
      <section class="section no-top-pdg no-bottom-pdg">
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
      categories: state => state.categories.categories,
      pagination: state => state.meetups.pagination
    })
  },
  async created() {
    const { pageSize, pageNum } = this.$route.query;
    if (pageSize && pageNum) {
      this.initializePagesFromQuery({ pageSize, pageNum });
    }
    try {
      await this.handleFetchMeetups({});
      await this.fetchCategories();
      this.pageLoader_resolveData();
    } catch (err) {
      console.log(err);
      this.pageLoader_resolveData();
    }
  },
  methods: {
    // Map the actions from the store
    ...mapActions("meetups", ["fetchMeetups", "initializePagesFromQuery"]),
    ...mapActions("categories", ["fetchCategories"]),
    handleFetchMeetups({ reset }) {
      const filter = {};
      filter["pageSize"] = this.pagination.pageSize;
      filter["pageNum"] = this.pagination.pageNum;
      return this.fetchMeetups({ filter, reset }).then(() =>
        this.setQueryPaginationParams()
      );
    },
    fetchPaginatedMeetups(page) {
      this.setPage(page);
      this.handleFetchMeetups({ reset: false });
    },
    setPage(page) {
      // Calling the mutation directly bypassing action
      this.$store.commit("meetups/setPage", page);
    },
    setQueryPaginationParams() {
      const { pageSize, pageNum } = this.pagination;
      this.$router.push({ query: { pageNum, pageSize } });
    }
  }
};
</script>

<style lang="scss">
.paginate-align {
  display: flex;
  justify-content: center;
}

.no-top-pdg {
  padding-top: 0px;
}

.no-bottom-pdg {
  padding-bottom: 0px;
}

.paginationContainer {
  display: inline-block;
  padding-left: 0;
  margin: 20px 0;
  border-radius: 4px;

  > li {
    display: inline;
    font-size: 18px;

    > a {
      position: relative;
      float: left;
      padding: 6px 12px;
      margin-left: -1px;
      line-height: 1.42857143;
      color: #00d1b2;
      text-decoration: none;
      background-color: #fff;
      border: 1px solid #ddd;
    }

    &.active {
      > a {
        z-index: 2;
        color: #fff;
        cursor: default;
        background-color: #00d1b2;
        border-color: #00d1b2;
      }
    }

    &.disabled {
      > a {
        color: #777;
        cursor: not-allowed;
        background-color: #fff;
        border-color: #ddd;
      }
    }
  }
}
</style>
