<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    label="Username"
                    :rules="rules.username"
                    prepend-icon="person"
                    type="text"
                    v-model="form.username"
                  />
                  <v-text-field 
                    label="Email"
                    :rules="rules.email"
                    prepend-icon="mail" 
                    type="text" 
                    v-model="form.email" 
                  />
                  <v-text-field
                    label="Password"
                    :rules="rules.password"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <nuxt-link to="/login">Go to login</nuxt-link>
                <v-spacer />
                <v-btn color="primary" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'guest',
  data: () => ({
    valid: true,
    form: {
      username: null,
      email: null,
      password: null,
    },
    rules: {
      username: [
        v => !!v || 'Username is required'
      ],
      email: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be more than 8 characters'
      ]
    }
  }),
  methods: {
    register () {
      if (this.$refs.form.validate()) {
        this.$auth.signIn(this.form).then(res => console.log(res))
      }
    }
  }
}
</script>

<style scoped>
</style>
