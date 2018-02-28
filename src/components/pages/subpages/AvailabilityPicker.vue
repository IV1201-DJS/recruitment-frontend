<template>
  <v-layout row wrap>
    <v-flex xs12 sm5>
      <date-picker :label="$t('availability.fromDate')"
                   v-on:dateChange="fromDateChange($event)"
                   :initDate="initFromDate"
                   :min="today"
                   :max="toDate" />
    </v-flex>

    <v-spacer />

    <v-flex xs12 sm5>
      <date-picker :label="$t('availability.toDate')"
                   v-on:dateChange="toDateChange($event)"
                   :initDate="initToDate"
                   :min="fromDate" />
    </v-flex>
  </v-layout>
</template>
<script>
import moment from 'moment'
import DatePicker from './DatePicker'

export default {
  components: { DatePicker },
  props: {
    initFromDate: String,
    initToDate: String
  },
  data: () => ({
    fromDate: null,
    toDate: null,
    fromDateMenu: false,
    toDateMenu: false
  }),
  created () {
    this.fromDate = this.initFromDate
    this.toDate = this.initToDate
  },
  computed: {
    today: () => moment().format('Y-MM-DD')
  },
  methods: {
    fromDateChange (newFromDate) {
      this.fromDate = newFromDate
      this.$emit('fromDateChange', newFromDate)
    },
    toDateChange (newToDate) {
      this.toDate = newToDate
      this.$emit('toDateChange', newToDate)
    }
  }
}
</script>
