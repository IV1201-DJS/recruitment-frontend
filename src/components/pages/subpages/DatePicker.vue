<template>
  <v-menu
    ref="dateMenu"
    lazy
    :close-on-content-click="false"
    v-model="dateMenu"
    transition="scale-transition"
    offset-y
    full-width
    :nudge-right="40"
    min-width="290px"
    :return-value.sync="date"
  >
    <v-text-field
      slot="activator"
      :label="label"
      v-model="date"
      prepend-icon="event"
      readonly
    />

    <v-date-picker v-model="date" no-title scrollable :min="min" :max="max">
      <v-spacer />

      <v-btn flat color="primary" @click="dateMenu = false">{{ $t('availability.cancel') }}</v-btn>
      <v-btn flat color="primary" @click="$refs.dateMenu.save(date);dateChange(date)" id="datePickerOKButton">{{ $t('availability.ok') }}</v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script>
export default {
  props: {
    initDate: String,
    min: String,
    max: String,
    label: {
      type: String,
      required: true
    }
  },
  created () {
    this.date = this.initDate
  },
  data: () => ({
    date: null,
    dateMenu: false
  }),
  methods: {
    dateChange (newDate) {
      if (!newDate) return

      this.$emit('dateChange', newDate)
    }
  }
}
</script>
