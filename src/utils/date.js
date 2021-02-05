const getFullDate = (dateString) => {
  dateString = new Date(dateString);
  let year = dateString.getFullYear();
  let month = dateString.getMonth();
  let day = dateString.getDate();

  return `${day}/${month}/${year}`;
};

module.exports = getFullDate;
