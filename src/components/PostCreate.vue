<template>
  <form class="post-create">
    <div class="field">
      <textarea
        v-auto-expand
        v-model="text"
        class="textarea textarea-post"
        placeholder="Write a post"
        rows="1"
      ></textarea>
      <button
        :disabled="!text"
        @click.prevent="sendPost"
        class="button is-primary m-t-sm"
      >
        Send
      </button>
    </div>
  </form>
</template>

<script>
import autoExpand from "@/directives/autoExpand";
export default {
  props: {
    threadId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      text: null
    };
  },
  computed: {
    meetup() {
      return this.$store.state.meetups.meetup;
    }
  },
  directives: {
    autoExpand
  },
  methods: {
    sendPost() {
      this.$store
        .dispatch("threads/sendPost", {
          text: this.text,
          threadId: this.threadId
        })
        .then(createdPost => {
          // Accessing the socket using custom plugin on the client to emit updates
          this.$socket.emit("meetup/postSaved", {
            ...createdPost,
            meetup: this.meetup._id
          });
          this.text = "";
        });
    }
  }
};
</script>

// Need to specify if we are using SCSS
<style scoped lang="scss">
.textarea-post {
  padding-bottom: 30px;
}
.post-create {
  margin-bottom: 15px;
}
</style>
