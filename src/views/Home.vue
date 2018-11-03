<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-card>
          <v-img
            src="https://cdn.sanity.io/images/cvvjxa4t/production_new/ca880e246f9c03cfd200b70ff5119b1c5751d035-4000x2245.jpg?rect=1,0,3998,2245&w=2000&h=1123&q=80"
            aspect-ratio="3"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Nominer din kandidat</h3>
              <div class="text">
                <p>Rødt vokser både i medlemstall og på meningsmålingene. Ved lokalvalget neste høst skal vi også vokse i antall folkevalgte for Notodden.</p>
                <p>Nå trenger vi din hjelp til å fylle listen med de beste folka.</p>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-flex class="pa-3">
              <v-form ref="form" v-model="valid" lazy-validation @keyup.native.enter="submit">
                <v-text-field autofocus :rules="[rules.required]" v-model="form.name" label="Ditt navn" hint="F.eks. Jonas Maccyber Enge" prepend-icon="person"></v-text-field>
                <v-text-field v-model="form.mobile" :rules="[rules.required, rules.phone]" maxlength="8" label="Ditt mobilnummer" hint="F.eks. 41514965" prepend-icon="smartphone"></v-text-field>
                <br />
                <p class="text">Hvem vil du <strong>nominere?</strong></p>
                <v-radio-group v-model="radios">
                  <v-radio label="Meg selv" value="meg"></v-radio>
                  <v-radio label="Andre" value="andre"></v-radio>
                </v-radio-group>
                <span v-if="radios === 'andre'">
                  <v-text-field v-model="form.nomineeName" :rules="[rules.required]" label="Nominertes navn" hint="F.eks. Geir Gåsodden" prepend-icon="person"></v-text-field>
                  <v-text-field v-model="form.nomineeMobile" :rules="[rules.required, rules.phone]" maxlength="8" label="Nominertes mobilnummer" hint="F.eks. 95552759" prepend-icon="smartphone"></v-text-field>
                </span>
                <br /><br />
                <v-btn outline color="primary" @click="submit" left>Meld på</v-btn>
              </v-form>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-flex>
     <v-snackbar v-model="snackbar" color="primary" :bottom="true">
        {{message}}
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    form: {
      name: '',
      mobile: '',
      nomineeName: '',
      nomineeMobile: ''
    },
    radios: 'meg',
    valid: true,
    message: false,
    snackbar: false,
    rules: {
      required: value => !!value || 'Påkrevd.',
      counter: value => value.length <= 20 || 'Maks 20 karakterer',
      phone: value => /^\d{8}$/.test(value) || 'Ugyldig norsk nummer'
    }
  }),
  methods: {
    async submit () {
      if (this.$refs.form.validate()) {
        const form = this.nomineeName === 'meg' ? Object.assign({}, this.form, { nomineeName: this.name, nomineeMobile: this.mobile }) : this.form
        try {
          await this.$http.post('https://tilnefna.service.alheimsins.net/api/nominate', form)
          this.message = 'Nominert person'
          this.snackbar = true
          this.$refs.form.reset()
        } catch (error) {
          this.snackbar = true
          this.message = error.message
        }
      }
    }
  }
}
</script>

<style scoped>
.headline {
  font-family: 'Rubik', sans-serif !important;
  font-weight: 700;
  font-size: 39.6px !important;
  line-height: 1.5 !important;
}
.text {
  font-family: 'Rubik', sans-serif !important;
  font-size: 18px;
}
</style>
