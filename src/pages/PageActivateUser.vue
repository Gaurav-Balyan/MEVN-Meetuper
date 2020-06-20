<template>
  <div class="container">
    <div class="section">
      <h1 class="title">User is getting activated...</h1>
      <AppSpinner />
    </div>
  </div>
</template>

<script>
import { USER_ACTIVATED } from "@/helpers/redirectMessages";
export default {
  created() {
    this.activateUser();
  },
  methods: {
    activateUser() {
      const { hash } = this.$route.params;
      // Directly dispatching the action in the store without mapping actions
      this.$store
        .dispatch("auth/activateUser", hash)
        .then(() =>
          this.$router.push({
            path: "/login",
            query: { messageType: USER_ACTIVATED.type }
          })
        )
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 50px;
  text-align: center;
}
</style>
