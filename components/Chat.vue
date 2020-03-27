<template>
  <div class="chat">
    <div class="chat-header">
      <v-app-bar
        color="deep-purple"
        dark
        flat
      >
        <v-toolbar-title>Marketing Services Center</v-toolbar-title>
        <v-spacer />
      </v-app-bar>
    </div>
    <div ref="messages" class="chat-messages">
      <div 
        v-for="(message, index) in messages" 
        :key="index" :class="[message.target, 'chat-messages-message']"     
      >
        <span v-html="message.text"></span>
      </div>
    </div>
    <div class="chat-input">
      <v-row>
        <v-col :cols="11">
          <v-text-field
            placeholder="Type something"
            v-model="user_message"
            @keydown="({ keyCode }) => {
              if (keyCode === 13) sendMessage()
            }"
          />
        </v-col>
        <v-col class="d-flex justify-center" :cols="1">
          <v-btn @click="sendMessage" fab dark small color="primary">
            <v-icon dark>
              mdi-send
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState, mapMutations } from 'vuex'

export default {
  data: () => ({
    chat: null,
    messages: [],
    user_message: null
  }),
  mounted () {
    this.chat = io(process.env.SOCKET_URL, {
      query: { token: this.token }
    })
    this.chat.on('message', (message) => {
      this.messages.push({
        target: 'bot',
        text: message
      })
      console.log(this.$refs.messages.scrollTop, 'bot')
      setTimeout(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
      console.log(this.$refs.messages.scrollTop, 'bot')
    })
    this.chat.on('logout', () => {
      this.logout()
      this.$router.push({
        name: 'index'
      })
    })
  },
  computed: {
    ...mapState('auth', ['token']),
    ...mapMutations('auth', ['logout'])
  },
  methods: {
    sendMessage () {
      const message = this.user_message
      if (!message) return
      this.messages.push({
        target: 'user',
        text: message
      })
      this.user_message = null
      console.log(this.$refs.messages.scrollTop, 'user')
      setTimeout(() => {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      })
      this.chat.emit('message', message)
    }
  }
}
</script>

<style lang="scss" scoped>
  .row {
    margin-right: 0px;
    margin-left: 0px;
    padding-right: 10px;
    padding-left: 10px;
  }
  .user {
    display: flex;
    justify-content: right;
    span {
      background: #473C8B;
    }
  }
  .bot {
    display: flex;
    justify-content: left;
    span {
      background: #8B1A1A;
    }
  }
  .chat {
    background-color: #1C1C1C;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 64px auto 48px;
    &-messages {
      overflow-y: scroll;
      margin-top: 10px;
      &-message {
        overflow: hidden;
        span {
          padding: 5px 15px;
          max-width: 40%;
        }
        margin: 15px;
      }
    }
    &-input {
      background-color: #363636;
    }
  }
  .v-btn {
    margin-top: 3px;
  }
  .col-11 {
    padding: 0px;
  }
  .col-1 {
    padding: 0px;
  }
  .v-input__slot {
    margin: 0px !important;
    margin-bottom: 0px !important;
  }
  .v-text-field {
    padding: 0px;
    margin: 0px;
  }
</style>
