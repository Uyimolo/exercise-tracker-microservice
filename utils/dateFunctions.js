const formatDate = (dateString) => {
  // validate date string
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const formattedDate = date.toDateString();
  return formattedDate;
};

const validateDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(dateRegex)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Check if the date is valid
  const isValidYear = date.getFullYear() === year;
  const isValidMonth = date.getMonth() + 1 === month;
  const isValidDay = date.getDate() === day;

  if (!isValidYear || !isValidMonth || !isValidDay) {
    return false;
  }

  return true;
};

module.exports = { validateDate, formatDate };
