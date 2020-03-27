<template>
  <v-container>
    <chat />
  </v-container>
</template>

<script>
import Chat from "@/components/Chat"

export default {
  middleware: 'auth',
  components: {
    Chat
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
}
</style>
