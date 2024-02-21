function formatTime(milliseconds) {
    const date = new Date(milliseconds);
    const now = new Date();
  
    const isYesterday = date.getDate() === now.getDate() - 1;
    const isToday = date.getDate() === now.getDate();
  
    let formattedTime;
  
    if (isYesterday || isToday) {
      formattedTime = formatDateWithTime(date);
    } else {
      formattedTime = formatDateWithFullDateTime(date);
    }
  
    return formattedTime;
  }
  
  function formatDateWithTime(date) {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).replace(/^0/, ''); // Remove leading zero from hour if present
  }
  
  function formatDateWithFullDateTime(date) {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).replace(/^0/, ''); // Remove leading zero from hour if present
  }

  module.exports = {formatTime}

  