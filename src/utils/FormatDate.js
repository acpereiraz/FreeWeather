const FormatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }).replace('.', '');
    const week = date.toLocaleString("en-US", { weekday: "long" });
    return [`${day} ${month.replace(month[0], month[0].toUpperCase())}`, week];
  };

  export default FormatDate;