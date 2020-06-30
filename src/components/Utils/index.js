/**
 *
 * Receives an object containing data for all years and returns chart-friendly data for a specific year
 *
 * @param {Object} data Object which contains chart data for all years
 * @param {String} ano  String which represents the desidered year
 *
 * @return {Array} Array of chart-friendly objects containing data for a specific year.
 */
export function updateChart(data, ano){

  let filterPerYear = data.filter((year) => toString(Object.keys(year)) === toString(ano))

  let valuesForYear = filterPerYear[0]
  return Object.values(valuesForYear)[0]
}

