  
function formatNumber(number) {
    if (isNaN(number)) return number;  
    const formatter = new Intl.NumberFormat('th-TH');
  
    return formatter.format(number);
  }

  module.exports = { formatNumber };
  