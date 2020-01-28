const moment = require('moment');

const DateForString = (date) => {
    let formatDate = moment(date).format("DD/MM/YYYY");
    return formatDate;
};

module.exports = {
    DateForString
};