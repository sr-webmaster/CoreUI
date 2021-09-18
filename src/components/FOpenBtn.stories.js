import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { CORE } from '../../.storybook/categories'
import FOpenBtn from './FOpenBtn.vue'

storiesOf(`${CORE}|Button Open`, module)
  .add('defaults', () => {
    return {
      components: { FOpenBtn },
      data: () => ({
        openText: 'Hide filters',
        closeText: 'Show filters'
      }),
      methods: {
        toggle (isOpening) {
          action('isOpening')(isOpening)
        }
      },
      template: `
          <v-container>
            <f-open-btn 
              :open-text="openText"
              :close-text="closeText"
              @change="toggle"
            >
              <div>open content</div>
            </f-open-btn>
          </v-container>
      `
    }
  }).add('flat', () => {
    return {
      components: { FOpenBtn },
      data: () => ({
        openText: 'Hide filters',
        closeText: 'Show filters'
      }),
      methods: {
        toggle (isOpening) {
          action('isOpening')(isOpening)
        }
      },
      template: `
          <v-container>
            <f-open-btn
              flat 
              :open-text="openText"
              :close-text="closeText"
              @change="toggle"
            >
              <div>open content</div>
            </f-open-btn>
          </v-container>
      `
    }
  }).add('color', () => {
    return {
      components: { FOpenBtn },
      data: () => ({
        openText: 'Hide filters',
        closeText: 'Show filters',
        color: 'primary'
      }),
      methods: {
        toggle (isOpening) {
          action('isOpening')(isOpening)
        }
      },
      template: `
          <v-container>
            <f-open-btn
              :color="color"
              :open-text="openText"
              :close-text="closeText"
              @change="toggle"
            >
              <div>open content</div>
            </f-open-btn>
          </v-container>
      `
    }
  }).add('dark', () => {
    return {
      components: { FOpenBtn },
      data: () => ({
        openText: 'Hide filters',
        closeText: 'Show filters'
      }),
      methods: {
        toggle (isOpening) {
          action('isOpening')(isOpening)
        }
      },
      template: `
          <v-container>
            <f-open-btn
              dark
              :open-text="openText"
              :close-text="closeText"
              @change="toggle"
            >
              <div>open content</div>
            </f-open-btn>
          </v-container>
      `
    }
  }).add('isOpening', () => {
    return {
      components: { FOpenBtn },
      data: () => ({
        openText: 'Hide filters',
        closeText: 'Show filters',
        isOpening: true
      }),
      methods: {
        toggle (isOpening) {
          action('isOpening')(isOpening)
        }
      },
      template: `
          <v-container>
            <f-open-btn
              :is-open="isOpening"
              :open-text="openText"
              :close-text="closeText"
              @change="toggle"
            >
              <div>open content</div>
            </f-open-btn>
          </v-container>
      `
    }
  })
