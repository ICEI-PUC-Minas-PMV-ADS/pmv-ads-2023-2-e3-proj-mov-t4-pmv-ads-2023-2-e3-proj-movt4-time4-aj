const moment = require('moment');

module.exports={
    SLOT_DURATION: 30,
    isOpened: async (horarios) => {},
    toCents: (price) => {
        return parseInt(price.toString().replace('.', '').replace(',' ,''));
    },
    hourToMinutes: (hourMinute) =>{
        const [hour, minutes] = hourMinute.split(':');
        return parseInt(parseInt(hour) * 60 + parseInt(minutes));
    },
    sliceMinutes: (start, end, duration) => {
        const slices = [];
        let count = 0;

        start=moment(start);
        end=moment(end);


        

        while ( end > start ) {
            slices.push(start.format('HH:mm'));

            start = start.add(duration, 'minutes');
            count++;
        }

        return slices;

    },


    mergeDateTime: (date, time) => {
        const merged = `${moment(date).format('YYYY-MM-DD')}T${moment(time).format(
          'HH:mm'
        )}`;
        //console.log(merged);
        return merged;
      },


      splitByValue: (array, value) => {
        let newArray = [[]];
        array.forEach((item) => {
          if (item !== value) {
            newArray[newArray.length - 1].push(item);
          } else {
            newArray.push([]);
          }
        });
        return newArray;
      },
};