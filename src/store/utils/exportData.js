import reduce from 'lodash/reduce'
import Jspdf from 'jspdf'
import 'jspdf-autotable'

/**
 * Quickly build a Module with our Fresh Standards
 * @param exportInfo Initial State for exporting data as CSV file
 */
export const csvExport = (exportInfo) => {
  let csvContent = 'data:text/csv;charset=utf-8,'
  let attributesArray = getAttributes(exportInfo.exportData, exportInfo.visibleParameters)
  csvContent += [
    headerArray(exportInfo.visibleParameters, exportInfo.parameters).join(';'),
    ...attributesArray.map(item => item.join(';').replace(/#/g, ''))
  ].join('\n').replace(/(^\[)|(\]$)/gm, '')
  let data = encodeURI(csvContent)
  let link = document.createElement('a')
  link.setAttribute('href', data)
  link.setAttribute('download', downloadAttribute(exportInfo.fileType))
  link.click()
  return 1
}

/**
 * Quickly build a Module with our Fresh Standards
 * @param exportInfo Initial State for exporting data as pdf file
 */
export const pdfExport = (exportInfo) => {
  var doc = new Jspdf('landscape')
  let attributesArray = getAttributes(exportInfo.exportData, exportInfo.visibleParameters)
  doc.autoTable({
    head: [headerArray(exportInfo.visibleParameters, exportInfo.parameters)],
    body: attributesArray,
    startY: 10,
    theme: 'grid'
  })
  doc.save(downloadAttribute(exportInfo.fileType))
  return 1
}

export const headerArray = (visibleParameters, parameters) => {
  return reduce(visibleParameters, (result, value, key) => {
    let headerObject = parameters.find(item => item.name === value)
    result.push(headerObject.label)
    return result
  }, [])
}

export const downloadAttribute = (fileType) => {
  if (fileType === 'csv') {
    return 'export.csv'
  }
  return 'export.pdf'
}

export const getAttributes = (arrData, visibleParameters) => {
  return reduce(arrData, (result, value, key) => {
    let elementArray = reduce(visibleParameters, (resultElement, element, key) => {
      let val = ''
      if (typeof value[element] === 'object') {
        val = value[element].label
      } else {
        val = value[element]
      }
      resultElement.push(val)
      return resultElement
    }, [])
    result.push(elementArray)
    return result
  }, [])
}
