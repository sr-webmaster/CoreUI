import { csvExport, pdfExport, getAttributes, downloadAttribute, headerArray } from '@freshinup/core-ui/src/store/utils/exportData'

describe('exportData Module', () => {
  describe('method', () => {
    const depositStatuses = [
      { uuid: '32423', label: 'Deposit' },
      { uuid: '930183', label: 'On hold' }
    ]
    const exportInfo = {
      fileType: 'csv',
      exportData: [
        {
          uuid: '17249929',
          name: 'Used 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[0],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249930',
          name: 'New 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[1],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249931',
          name: 'Used 2016 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[1],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249932',
          name: 'Used 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[0],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249933',
          name: 'New 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[1],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249934',
          name: 'New 2019 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[0],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249935',
          name: 'Used 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[0],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        },
        {
          uuid: '17249936',
          name: 'Used 2018 Kenworth T270',
          stock_number: '109837',
          vin: '19UUA66295A011446',
          mileage: '00,0000',
          make: { label: 'BMW' },
          model: { label: 'i3' },
          deposit_statuses: depositStatuses[1],
          engine: { label: 'Paccar' },
          engine_model: { label: '2017 PX9 350' },
          transmission_make: { label: 'Fuller' },
          sleeper: { label: 'Truck' },
          appraisal: { appraised_value: '30000.00' }
        }
      ],
      visibleParameters: [
        'name',
        'transmission_make',
        'deposit_statuses',
        'sleeper'
      ],
      parameters: [
        { name: 'name', label: 'Truck Overview' },
        { name: 'vehicle_status', label: 'Vehicle status' },
        { name: 'weight', label: 'Weight' },
        { name: 'traction', label: 'Traction' },
        { name: 'weight', label: 'Weight' },
        { name: 'deposit_statuses', label: 'Status' },
        { name: 'stock_status', label: 'Stock status' },
        { name: 'configuration', label: 'Configuration' },
        { name: 'make', label: 'Make' },
        { name: 'model', label: 'Model' },
        { name: 'model_year', label: 'Year' },
        { name: 'sleeper', label: 'Sleeper' },
        { name: 'sofa', label: 'Sofa' },
        { name: 'transmission_make', label: 'Transimission Make' }
      ]
    }
    test('csvExport()', () => {
      expect(csvExport(exportInfo)).toEqual(1)
    })
    test('pdfExport()', () => {
      window.URL.createObjectURL = function () {}
      expect(pdfExport(exportInfo)).toEqual(1)
    })
    test('getAttributes()', () => {
      let attributesArray = getAttributes(exportInfo.exportData, exportInfo.visibleParameters)
      expect(attributesArray).toEqual([['Used 2018 Kenworth T270', 'Fuller', 'Deposit', 'Truck'], ['New 2018 Kenworth T270', 'Fuller', 'On hold', 'Truck'], ['Used 2016 Kenworth T270', 'Fuller', 'On hold', 'Truck'], ['Used 2018 Kenworth T270', 'Fuller', 'Deposit', 'Truck'], ['New 2018 Kenworth T270', 'Fuller', 'On hold', 'Truck'], ['New 2019 Kenworth T270', 'Fuller', 'Deposit', 'Truck'], ['Used 2018 Kenworth T270', 'Fuller', 'Deposit', 'Truck'], ['Used 2018 Kenworth T270', 'Fuller', 'On hold', 'Truck']]
      )
    })
    test('headerArray()', () => {
      let result = headerArray(exportInfo.visibleParameters, exportInfo.parameters)
      expect(result).toEqual(['Truck Overview', 'Transimission Make', 'Status', 'Sleeper'])
    })
    test('downloadAttribute()', () => {
      expect(downloadAttribute('csv')).toEqual('export.csv')
    })
  })
})
