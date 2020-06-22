<template>
  <div class="meetup-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <MeetupCreateWizard @meetupConfirmed="createMeetup" />
      </div>
    </section>
  </div>
</template>

<script>
import MeetupCreateWizard from "@/components/MeetupCreate/MeetupCreateWizard";
export default {
  components: {
    MeetupCreateWizard
  },
  computed: {
    categories() {
      // Accessing the state in the store directly
      return this.$store.state.categories.categories;
    }
  },
  created() {
    if (this.categories.length === 0) {
      // Directly dispatching the action in the store without mapping actions
      this.$store.dispatch("categories/fetchCategories");
    }
  },
  methods: {
    createMeetup(meetupToCreate) {
      // Directly dispatching the action in the store without mapping actions
      this.$store
        .dispatch("meetups/createMeetup", { meetupToCreate })
        .then(createdMeetup => {
          this.$router.push(`/meetups/${createdMeetup._id}`);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped lang="scss">
.meetup-create-page {
  min-height: 100vh;
}
</style>
