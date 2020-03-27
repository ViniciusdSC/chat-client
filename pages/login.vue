<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-alert 
              v-for="(err, index) in errors" 
              :key="index"
              dismissible 
              dense 
              outlined 
              type="error"
            >
              {{ err }}
            </v-alert>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    prepend-icon="person"
                    type="text"
                    v-model="form.username"
                  />

                  <v-text-field
                    label="Password"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <nuxt-link to="/register">Sign up</nuxt-link>
                <v-spacer />
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  middleware: 'guest',
  data: () => ({
    errors: [],
    form: {
      username: null,
      password: null
    }
  }),
  methods: {
    login () {
      this.$auth.login(this.form).then(res => {
        if (res.data.success) {
          this.setToken(res.data.data.token)
          this.$router.push({
            name: 'index'
          })
        } else {
          this.errors = [];
          this.errors.push(res.data.error_message)
          this.$forceUpdate();
        }
      })
    },
    ...mapMutations('auth', ['setToken'])
  }
}
</script>

<style scoped></style>
