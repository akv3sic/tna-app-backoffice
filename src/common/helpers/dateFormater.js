function formatDate(inputDate) {
    const [datePart, timePart] = inputDate.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
  
    const outputDate = `${day}.${month}.${year.slice(-2)}. ${hour}:${minute}`;
  
    return outputDate;
  }
  
  module.exports = { formatDate };