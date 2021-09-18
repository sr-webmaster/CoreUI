<template>
  <v-container
    grid-list-sm
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        v-for="(item, key) in items"
        :key="key"
        class="pa-2"
      >
        <v-card
          color="grey lighten-2"
          class="pa-2 text-xs-center"
          center
        >
          <h6 class="font-weight-bold">
            {{ item.header }}
          </h6>
          <v-divider light />
          <h1>
            {{ item.value }}
          </h1>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SimpleCardList',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
