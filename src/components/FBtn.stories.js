import { storiesOf } from '@storybook/vue'
import { withKnobs, select } from '@storybook/addon-knobs'
import FBtn from './FBtn.vue'
import { CORE } from '../../.storybook/categories'

storiesOf(`${CORE}|Button`, module)
  .addDecorator(withKnobs)
  .add('defaults', () => {
    return {
      components: { FBtn },
      template: `
          <v-container>
            <f-btn>Button</f-btn>
          </v-container>
      `
    }
  })
  .add('sizes', () => {
    return {
      components: { FBtn },
      props: {
        color: {
          default: select('Color', {
            primary: 'primary',
            secondary: 'secondary',
            accent: 'accent',
            error: 'error',
            success: 'success',
            info: 'info',
            warning: 'warning'
          }, 'primary')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container grid-list-sm>
            <v-layout column justify-center align-center>
              <f-btn :color="color" large>Large</f-btn>
              <f-btn :color="color">Regular</f-btn>
              <f-btn :color="color" small>Small</f-btn>
            </v-layout>
          </v-container>
      `
    }
  })
  .add('color', () => {
    return {
      components: { FBtn },
      props: {
        color: {
          default: select('Color', {
            primary: 'primary',
            secondary: 'secondary',
            accent: 'accent',
            error: 'error',
            success: 'success',
            info: 'info',
            warning: 'warning'
          }, 'primary')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-btn :color="color" close>Select Color in Knobs</f-btn>
          </v-container>
      `
    }
  })
  .add('outline', () => {
    return {
      components: { FBtn },
      props: {
        color: {
          default: select('Color', {
            primary: 'primary',
            secondary: 'secondary',
            accent: 'accent',
            error: 'error',
            success: 'success',
            info: 'info',
            warning: 'warning'
          }, 'primary')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-btn :color="color" close outline>Outline Button</f-btn>
          </v-container>
      `
    }
  })
  .add('disabled', () => {
    return {
      components: { FBtn },
      props: {
        color: {
          default: select('Color', {
            primary: 'primary',
            secondary: 'secondary',
            accent: 'accent',
            error: 'error',
            success: 'success',
            info: 'info',
            warning: 'warning'
          }, 'primary')
        }
      },
      data: () => ({
        val: 'active'
      }),
      template: `
          <v-container>
            <f-btn :color="color" close disabled>Disabled Button</f-btn>
          </v-container>
      `
    }
  })
  .add('contrast', () => {
    return {
      components: { FBtn },
      template: `
          <v-container>
            <f-btn color="yellow">Yellow</f-btn>
            <f-btn color="black">Black</f-btn>
          </v-container>
      `
    }
  })
