<template>
  <v-layout row wrap>
    <v-flex xs12 sm5>
      <v-menu
        ref="fromDateMenu"
        lazy
        :close-on-content-click="false"
        v-model="fromDateMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
        :return-value.sync="fromDate"
      >
        <v-text-field
          slot="activator"
          :label="$t('availability.fromDate')"
          v-model="fromDate"
          prepend-icon="event"
          readonly
        />

        <v-date-picker v-model="fromDate" no-title scrollable :min="today" :max="toDate">
          <v-spacer />
          <v-btn flat color="primary" @click="fromDateMenu = false"><span v-t="'availability.cancel'" /></v-btn>
          <v-btn flat color="primary" @click="$refs.fromDateMenu.save(fromDate);fromDateChange(fromDate)"><span v-t="'availability.ok'" /></v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>

    <v-spacer />

    <v-flex xs12 sm5>
      <v-menu
        ref="toDateMenu"
        lazy
        :close-on-content-click="false"
        v-model="toDateMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        min-width="290px"
        :return-value.sync="toDate"
      >
        <v-text-field
          slot="activator"
          :label="$t('availability.toDate')"
          v-model="toDate"
          prepend-icon="event"
          readonly
        />

        <v-date-picker v-model="toDate" no-title scrollable :min="fromDate">
          <v-spacer />

          <v-btn flat color="primary" @click="toDateMenu = false"><span v-t="'availability.cancel'" /></v-btn>
          <v-btn flat color="primary" @click="$refs.toDateMenu.save(toDate);toDateChange(toDate)"><span v-t="'availability.ok'" /></v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>
<script>
import moment from 'moment'

export default {
  data: () => ({
    fromDate: null,
    toDate: null,
    fromDateMenu: false,
    toDateMenu: false
  }),
  created () {
    this.fromDate = this.$store.state.fromDate
    this.toDate = this.$store.state.toDate
  },
  computed: {
    today: () => moment().format('Y-MM-DD')
  },
  methods: {
    fromDateChange (newFromDate) {
      if (!newFromDate) return

      this.$emit('fromDateChange', newFromDate)
    },
    toDateChange (newToDate) {
      if (!newToDate) return

      this.$emit('toDateChange', newToDate)
    }
  }
}
</script>
