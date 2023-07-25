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
    
    let orderedDifflist = quickSort([...datesDiffArr], dates, values)
    let j = 0;
    let finalList = [];
    datesDiffArr.forEach(val => {
        i = orderedDifflist.indexOf(val)
        finalList[i] = values[j]
        j++;
    })
    return finalList
}
//  sort = (dates, values, requirement) => {
//     //sort the data according to specified criteria
//     //return the sorted data
//     //dates is an array of dates and values is an array of values
//     // requirement is a string
//     //requirement can be 7, 30, 90, 180, 365
//     //but default is 6 months

//     // dates = Object.keys(data)
//     // dataValues = Object.values(data)
//     dataDates = dates
//     requirement = parseInt(requirement)
//     console.log(`requirement ${requirement}`)
//     a = moment()
//     for(let i = 0; i < dates.length; i++){
//         console.log(`current date ${dates[i]}`)
//         let date1 = a.diff(dates[i], 'days')
//         console.log(`date1 ${date1}`)
//         let date2 = a.diff(dates[i+1], 'days')
//         console.log(`date2 ${date2}`)
//         checkIfItSuitsRequirement(date1, date2, dates, values, requirement)
//         if(date1>date2){
//             console.log(`date1>date2 ${date1>date2}`)
//             if(dates[i+1] == undefined){
//                 break;
//             }
//             x= dates[i]
//             y= values[i]
//             dates[i] = dates[i+1]
//             values[i] = values[i+1]
//             dates[i+1] = x
//             values[i+1] = y
//         }
//         for(let j = 0; j < dates.length; j++){
//             console.log(`current date ${dates[j]}`)
//             console.log(`current date ${dates[j+1]}`)
//             let date3 = a.diff(dates[j], 'days')
//             console.log(`date3 ${date3}`)
//             let date4 = a.diff(dates[j+1], 'days')
//             console.log(`date4 ${date4}`)
//             if(date3 >= requirement){
//                 console.log(`dates.splice ${dates.splice(0, 1)}`)
//                 dates.splice(j, 1)
//                 values.splice(j, 1)
//                 break
//             }
//             if(date3>date4){
//                 console.log(`date3>date4 ${date3>date4}}`)
//                 if(dates[j+1] == undefined){
//                     break;
//                 }
//                 x= dates[j]
//                 y= values[j]
//                 dates[j] = dates[j+1]
//                 values[j] = values[j+1]
//                 dates[j+1] = x
//                 values[j+1] = y
//             }
//         }
//         }
//         if(dates.length > 0 && values.length > 0){
//             return [dates, values]
//         }
//         else return [[], []]
// }
