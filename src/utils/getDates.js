import moment from 'moment';

function getDates(startDate, stopDate) {
    var dateArray = [];
    let currentDate = startDate;
    let endDate = stopDate;
    if (!moment.isMoment(startDate)) currentDate = moment(startDate);
    if (!moment.isMoment(stopDate)) endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}

export default getDates;