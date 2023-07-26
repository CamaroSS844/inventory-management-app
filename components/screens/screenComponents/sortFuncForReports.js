import moment from "moment/moment";

const quickSort = (datesDiffArr) => {
    //arr = datesDiffArr
    if (datesDiffArr.length <= 1) {
      return datesDiffArr;
    }
  
    let pivot = datesDiffArr[0];
    let leftArr = [];
    let rightArr = [];
  
    for (let i = 1; i < datesDiffArr.length; i++) {
      if (datesDiffArr[i] < pivot) {
        leftArr.push(datesDiffArr[i]);
      } else {
        rightArr.push(datesDiffArr[i]);
      }
    }
  
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  };

  const itemCounter = (value, index) => {
    return value.filter((x) => x == index).length;
  };


export default sort = (dates, values, requirement) => {
    //sort the data according to specified criteria
    //return the sorted data
    //dates is an array of dates and values is an array of values
    // requirement is a string
    //requirement can be 7, 30, 90, 180, 365
    //but default is 6 months

    
    requirement = parseInt(requirement)
    a = moment()
    datesDiffArr = []
    console.log(dates)

    for(i = 0; i < dates.length; i++){
        val = a.diff(dates[i], 'days');
        if(val <= requirement){
            datesDiffArr.push(val)
            continue;
        }else if(val > requirement && requirement == 366){
            datesDiffArr.push(val)
            continue;
        }
        else{
            datesDiffArr.splice(i, 1);
            dates.splice(i, 1);
            values.splice(i, 1);
            i--;
        }
    }
    console.log(datesDiffArr)
    for(i = 0; i < datesDiffArr.length; i++){
      if (datesDiffArr[i] == datesDiffArr[i+1]){
        datesDiffArr[i+1] += 0.1;
      } 
      if (itemCounter(datesDiffArr, datesDiffArr[i]) > 1){
        datesDiffArr[i] += 0.1;
      }

    }
    let orderedDifflist = quickSort([...datesDiffArr])
    let j = 0;
    let finalValueList = [];
    let finalDatesList = [];
    datesDiffArr.forEach(val => {
        i = orderedDifflist.indexOf(val)
        finalValueList[i] = values[j]
        finalDatesList[i] = dates[j]
        j++;
    })
    return [finalDatesList, finalValueList]
}

