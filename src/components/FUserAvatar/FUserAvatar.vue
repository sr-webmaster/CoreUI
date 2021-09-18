<template>
  <v-avatar
    :size="size"
    :color="color"
  >
    <img
      v-if="hasImage"
      :src="image"
      :alt="user.name"
    >
    <span
      v-else-if="hasName"
      :class="color + '-text--text'"
      :style="initialLetterStyle"
    >
      {{ initials }}
    </span>
    <v-icon
      v-else
      :color="color + '-text'"
      :size="size"
    >
      account_circle
    </v-icon>
  </v-avatar>
</template>

<script>
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'FUserAvatar',
  props: {
    size: {
      type: Number,
      default: 48
    },
    color: {
      type: String,
      default: 'accent'
    },
    user: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    hasName () {
      return !isEmpty(this.initials)
    },
    initials () {
      const firstName = get(this, 'user.first_name[0]', '')
      const lastName = get(this, 'user.last_name[0]', '')
      return (firstName + lastName).toUpperCase()
    },
    initialLetterStyle () {
      return 'font-size:' + (this.size / 2) + 'px'
    },
    image () {
      return get(this, 'user.avatar', '')
    },
    hasImage () {
      return !isEmpty(this.image)
    }
  }
}
</script>
