import { MAIN } from '../../../.storybook/categories'
import FUserAvatar from './FUserAvatar.vue'
import { withKnobs, number, select, text } from '@storybook/addon-knobs'

export default {
  title: `${MAIN}|FUserAvatar`,
  id: 'FUserAvatar',
  decorators: [withKnobs]
}

const FIXTURES = {
  COLORS: {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent'
  }
}

/**
 * https://storybook.js.org/docs/guides/guide-vue/#step-4-write-your-stories
 */
export const Empty = () => ({
  components: {
    FUserAvatar
  },
  data: () => ({
    user: null
  }),
  template: `
    <f-user-avatar user="user"></f-user-avatar>
  `
})

export const NoUser = () => ({
  components: {
    FUserAvatar
  },
  props: {
    size: {
      default: number('Size', 48)
    },
    color: {
      default: select('Color', FIXTURES.COLORS, 'primary')
    }
  },
  data: () => ({
    user: null
  }),
  template: `
    <f-user-avatar :size="size" :user="user" :color="color"></f-user-avatar>
  `
})

export const Initials = () => ({
  components: {
    FUserAvatar
  },
  props: {
    size: {
      default: number('Size', 48)
    },
    color: {
      default: select('Color', FIXTURES.COLORS, 'primary')
    }
  },
  data: () => ({
    user: {
      first_name: 'Tim',
      last_name: 'Baio'
    }
  }),
  template: `
    <f-user-avatar :size="size" :user="user" :color="color"></f-user-avatar>
  `
})

export const Image = () => ({
  components: {
    FUserAvatar
  },
  props: {
    size: {
      default: number('Size', 48)
    },
    color: {
      default: select('Color', FIXTURES.COLORS, 'primary')
    }
  },
  data: () => ({
    user: {
      first_name: 'Tim',
      last_name: 'Baio',
      avatar: text('Image', 'https://placeimg.com/800/600/people'),
      name: 'Tim Baio'
    }
  }),
  template: `
    <f-user-avatar :size="size" :user="user" :color="color"></f-user-avatar>
  `
})
