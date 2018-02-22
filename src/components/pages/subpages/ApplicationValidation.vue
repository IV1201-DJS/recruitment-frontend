<template>
  <v-layout row>
    <v-flex xs12 sm5>
      <v-flex xs12 sm6>
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: mapState([
    'competences',
    'fromDate',
    'toDate'
  ])
}
</script>
