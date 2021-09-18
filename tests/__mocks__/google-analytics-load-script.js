/**
 * Used https://jestjs.io/docs/en/manual-mocks
 * @cite https://github.com/MatteoGabriele/vue-analytics/blob/master/__mocks__/load-script.js
 * @returns {Promise<any>}
 */
export default function () {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      window.ga = jest.fn()
      return resolve()
    })
  })
}
