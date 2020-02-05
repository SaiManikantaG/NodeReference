 const createChuncksOfArray = (inputArray, chunckSize) => {
      const chunckedArrays = _.map(inputArray, (item, index) => (index % chunckSize === 0
        ? inputArray.slice(index, index + chunckSize)
        : null)).filter(item => item);
      return chunckedArrays;
    };

// eslint-disable-next-line consistent-return
export const getMapKeyByValue = (map, searchValue) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of map.entries()) {
    if (value === searchValue) { return key; }
  }
};

export const buildKey = (...params) => params.join('-');

// ------------------------------------
//  All test related below -----------------------


// var request = require("request");
const moment = require('moment-timezone');
const _ = require('lodash');


const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const generateStoreOrderingDetails = async (data) => {
    if (data) {
        return 'found:' + data
    }
    else {
        return 'not found'
    }
}


const promises = data.map(eachData => new Promise((resolve, reject) => {
    // console.log('--- each store --', eachData);
    generateStoreOrderingDetails(eachData).then(resolve).catch((err) => {
        return badResponse({
            message: `failed to process store: ${eachData} because ${err}`,
        });
    });
}));

const splitPromise = async (eachDataPromise) => {

    const promises = eachDataPromise.map(eachData => new Promise((resolve, reject) => {
        // console.log('--- each store --', eachData);
        generateStoreOrderingDetails(eachData).then(resolve).catch((err) => {
            return badResponse({
                message: `failed to process store: ${eachData} because ${err}`,
            });
        });
    }));
    const eachDataPromiseResult = await Promise.all(promises);
    return eachDataPromiseResult;
}

const run = async (data) => {
    console.log('data length:', data.length)
    if (data && data.length) {
        const generateSplitPromise = data.map(eachData => splitPromise(eachData));
        const splitPromiseResult = await Promise.all(generateSplitPromise);
        console.log('splitPromiseResult==>', splitPromiseResult)
        return splitPromiseResult
    }
    // const resultSet = await Promise.all(promises);
    // console.log(resultSet);
}


run((data), (result, err) => {
    if (error) {
        console.log(error);
    } else {
        console.log('done!', result);
        // console.log(data);
    }
})




// const YMD_DASH = 'YYYY-MM-DD';

// const inBetweenDatesEqual = (startDate, inputDate, endDate) => {
//     const start = moment.tz(moment.tz(startDate, 'UTC').format(YMD_DASH), 'UTC');
//     const checkDate = moment.tz(moment.tz(inputDate, 'UTC').format(YMD_DASH), 'UTC');
//     const end = moment.tz(moment.tz(endDate, 'UTC').format(YMD_DASH), 'UTC');
//     console.log(`--`, start, checkDate, end)

//     if (start.isSameOrBefore(checkDate) && checkDate.isSameOrBefore(end)) {
//         return true;
//         // eslint-disable-next-line no-else-return
//     } else {
//         return false;
//     }
// }
// const xyz = '2018-10-02T00:00:00.000+00:00';
// // console.log(inBetweenDatesEqual('2018-01-10', '2019-10-02', '2019-10-02T00:00:00.000+00:00'))
// console.log(inBetweenDatesEqual('2018-10-02T00:00:00.000+00:00', '2018-10-02', '2018-11-18'))
// console.log(moment.tz(xyz, 'America/Chicago').format())
// console.log(moment.tz('America/CHhicago'));
// console.log(moment(moment.tz('America/CHhicago')).format('YYYY-MM-DD'));
// console.log(moment.utc(moment(moment.tz('America/CHhicago')).format('YYYY-MM-DD')).toDate());

// const beginningTime = moment.tz('2019-04-10 11:59:00', 'America/Chicago').format('HH:mm');
// const endTime = moment.tz('America/Denver');
// const checkTime = moment.tz({
//     hours: 11,
//     minute: 59
// }, 'America/Denver');
// console.log(`---+++--`, checkTime, endTime, endTime.isAfter(checkTime))
// console.log(`-- time in vegas --`, moment.tz('America/Los_Angeles'))
// const checkingTIme = moment.tz('2019-11-12T09:11:24.369-06:00', 'America/Chicago');
// console.log(`-- end time --`, checkingTIme)
// const checkTimer = moment.tz({
//     hours: 10,
//     minute: 0,
// }, 'America/Chicago');
// console.log(checkingTIme.isAfter(checkTimer));

// const createChuncksOfArray = (inputArray, chunckSize) => {
//     const chunckedArrays = _.map(inputArray, (item, index) => (index % chunckSize === 0 ? inputArray.slice(index, index + chunckSize) : null))
//         .filter(item => item);
//     return chunckedArrays;
// };

// console.log(createChuncksOfArray([1, 2, 3, 4, 5, 6, 7, 8], 3))
// const chunckArray = createChuncksOfArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
// console.log(Math.ceil(11974 / 3000));
// const dataFUnc = async (chunckArray) => {

//     await Promise.all(chunckArray.map(async (eachUpdate) => {
//         console.log(`each one`, eachUpdate)
//     }));
// }
// dataFUnc(chunckArray).then((data) => {
//     console.log(data)
// }).catch(console.log)

// const dateDetails = [{ date: "2019-10-10" },
// { date: "2019-10-03" },
// { date: "2019-09-26" },
// { date: "2019-09-19" },
// { date: "2019-09-12" }]
// const compare = (inp1, inp2) => inp1.date < inp2.date;
// const result = dateDetails.sort(compare)
// console.log(`---sort----`, result)

// _.map(dateDetails, (eachD, i) => {
//     console.log(eachD, i)
// })
// console.log('I am here', moment.tz('2019-12-04T00:00:00.000+00:00', 'UTC').format('YYYYMMDD'))


// const cluterConfigs = {
//     ordering: () => {
//         const mongoHost = 'process.env.mongoURL';
//         const username = 'process.env.mongoUsername';
//         const password = 'process.env.mongoPassword';
//         const dbName = 'process.env.mongoDBName';

//         const MONGODB_URI = `mongodb+srv://${username}:${password}@${mongoHost}/${dbName}`;

//         console.log(`Mongo cluster we are using: ${mongoHost}`);
//         // logger.debug(`Mongo cluster we are using: ${mongoHost}`)

//         // const MONGODB_URI = process.env.MongoDBUrl;
//         const MDBOOLSIZE = 'process.env.MDBoolSize';
//         const keepAlive = 'process.env.KeepAlive';

//         return {
//             MONGODB_URI, MDBOOLSIZE, keepAlive,
//         };
//     },
// };
// const { MONGODB_URI, MDBOOLSIZE, keepAlive } = cluterConfigs.ordering();
// console.log(`--- configs ---`, MONGODB_URI, MDBOOLSIZE, keepAlive)


// const user = {
//     firstName: 'Test',
//     lastName: 'User',
//     get fullName() {
//         return this.firstName + '--' + this.lastName;
//     },
//     set age(value) {
//         if (isNaN(value)) throw Error('Age has no number');
//         this._age = Number(value);
//     },
//     get age() {
//         return this._age;
//     }
// }
// user.age = 28
// console.log(user, user.firstName, user.age)


// const mapData = new Map();
// mapData.set(1, 'he');
// mapData.set(2, 'fjk');
// console.log(`------------`, [...mapData.keys()])

// console.log(`decode here`, Buffer.from('eyJzdG9yZUlkIjoiMTg0NzMiLCJ0aW1lWm9uZSI6IkNTVCIsInRyYW5zYWN0aW9uSWQiOiI0MDY1OTY4NS02ZDU4LTQ4OWUtYTdiNS0wMWFmYThmNmFiZmQifQ==', 'base64').toString());
// const boh = -2;
// console.log(!boh, boh === null, boh < 0, !boh || boh === null || boh < 0, '---------------------');

// const mapsss = new Map();
// mapsss.set(1, 'fdsf');
// console.log(`fdsf"${JSON.stringify(mapsss)}`);
// console.log(mapsss)
// console.error('---- test----', mapsss)
// const dataview = [];
// dataview.push(1)
// dataview.push(2)
// dataview.push(3)
// dataview.push(4)
// const finalDataView = dataview.pop();
// console.log('------- last --------', finalDataView);
// console.log(Number('1'))
// console.log(Number('1.5'))
// console.log(Number('1.02'))
// const num = Number('1.69999998') * 100
// console.log(num)



// const dataArray = [1, 2, 3, 4, 5];
// const len = dataArray.length;
// console.log(dataArray[len - 1], dataArray[len - 2], dataArray[len - 3], dataArray[len - 4])

// function chunkArrayInGroups(arr, size) {
//     var myArray = [];
//     for (var i = 0; i < arr.length; i += size) {
//         myArray.push(arr.slice(i, i + size));
//     }
//     return myArray;
// }
// console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));
// console.log(Math.ceil(403000 / 100000))

// const createChunckedOfArrays = (inputArray, groupSize) => {
//     const groups = _.map(inputArray, (item, index) => {
//         return index % groupSize === 0 ? inputArray.slice(index, index + groupSize) : null;
//     }).filter(function (item) {
//         return item;
//     });
//     return groups;
// }

// console.log(createChunckedOfArrays(["a", "b", "c", "d"], 2), createChunckedOfArrays(["a", "b", "c", "d"], 2).length)
// const details = {
//     ['ss']: 10,
//     ['dl']: 3
// }

// console.log(Object.keys(details))
// console.log(moment('2019-10-21T04:32:52.000+00:00').format('HH'))
// console.log(moment('2019-10-21T04:32:52.000+00:00').format('hh'))
// console.log(Math.round(1.9))
// console.log(Math.round(1.4))
// console.log(Math.round(1.5))
// console.log(Math.floor(1.9))
// console.log(Math.floor(1.4))
// console.log(Math.floor(2))

// const myfunc = (firstOrderQuantityFlag, firstOrderQuantity, pendingDeliveryQuantity, minimumOnHandQuantity, minAllowableOrderQuantity, itemForecastQuantity, boh) => {
//     // Calculate Carry Over Quantity
//     pendingDeliveryQuantity = parseInt(pendingDeliveryQuantity); // In db is string, convert it to number
//     carryOverQuantity = (boh || 0) + (pendingDeliveryQuantity || 0);
//     console.log(`--`, carryOverQuantity, `==`, boh, pendingDeliveryQuantity)
//     if (carryOverQuantity < 0) {
//         carryOverQuantity = 0;
//     }

//     untransmittedOrderQuantity = Number((itemForecastQuantity + (minimumOnHandQuantity || 0) - (carryOverQuantity || 0)).toFixed()); // 116029 defect fix
//     console.log(`---untransmistted calc`, untransmittedOrderQuantity, itemForecastQuantity, minimumOnHandQuantity, carryOverQuantity)

//     if (isNaN(untransmittedOrderQuantity)) {
//         throw new InputValidationError(`untransmitted quantity genrated is not a number:${untransmittedOrderQuantity}`);
//     }

//     if (untransmittedOrderQuantity <= 0) {
//         console.log(`---untransmistted set to 0`, untransmittedOrderQuantity)
//         untransmittedOrderQuantity = 0;
//     } else if (untransmittedOrderQuantity < minAllowableOrderQuantity) {
//         console.log(`---untransmistted set to min`, untransmittedOrderQuantity, minAllowableOrderQuantity)
//         untransmittedOrderQuantity = minAllowableOrderQuantity;
//     }
//     console.log(`-final-`, untransmittedOrderQuantity)
// }
// console.log(myfunc(false, 4, 0, 3, 1, 2.8999999999999995, 6))

// const items = [
//     {
//         "itemId": 173246,
//         "itemSize": 2,
//         "linkedItem": []
//     },
//     {
//         "itemId": 173253,
//         "itemSize": 2,
//         "linkedItem": []
//     },
//     {
//         "itemId": 173256,
//         "itemSize": 4,
//         "linkedItem": [
//             {
//                 "id": 12345,
//                 "itemSize": 1
//             }
//         ]
//     }
// ];
// const respone = [
//     {
//         "storeId": "36312",
//         "itemId": 173246,
//         "summary": [
//             {
//                 "date": "2019-09-25",
//                 "fc": 8,
//                 "dl": 8,
//                 "or": 8
//             }
//         ]
//     },
//     {
//         "storeId": "36312",
//         "itemId": 12345,
//         "summary": [
//             {
//                 "date": "2019-09-25",
//                 "fc": 8,
//                 "dl": 8,
//                 "or": 8
//             }
//         ]
//     },
//     {
//         "storeId": "36312",
//         "itemId": 173253,
//         "summary": [
//             {
//                 "date": "2019-09-25",
//                 "fc": 5,
//                 "dl": 5,
//                 "or": 5
//             }
//         ]
//     },
//     {
//         "storeId": "36312",
//         "itemId": 173256,
//         "summary": [
//             {
//                 "date": "2019-09-25",
//                 "or": 6,
//                 "fc": 6
//             }
//         ]
//     }
// ];

// const itemsMap = new Map();

// respone.forEach(eachResponse => {
//     itemsMap.set(`36312-${eachResponse.itemId}`, eachResponse.summary)
// })
// console.log(itemsMap)
// const finalData = [];
// items.forEach(eachItem => {
//     const linkedForecastData = [];
//     const finalMixedForecast = [];
//     const linkedSummary = [];
//     if (eachItem.linkedItem && eachItem.linkedItem.length) {
//         const eachLinkedItem = eachItem.linkedItem;
//         eachLinkedItem.forEach(eachLinked => {
//             if (itemsMap.has(`36312-${eachLinked.id}`)) {

//                 linkedForecastData.push({ id: eachLinked.id, summary: itemsMap.get(`36312-${eachLinked.id}`) });

//                 const currentSummary = itemsMap.get(`36312-${eachLinked.id}`);
//                 if (currentSummary && currentSummary.length) {
//                     currentSummary.forEach(eachSummary => {
//                         let forecastMapped = {};
//                         // fc: eachSummary.fc ? ((eachSummary.fc * eachLinked.itemSize) / eachItem.itemSize) : null
//                         const objectKeys = Object.keys(eachSummary);
//                         if (objectKeys && objectKeys.length) {
//                             objectKeys.forEach(eachKey => {
//                                 if (eachKey != 'date') {
//                                     forecastMapped = {
//                                         ...forecastMapped,
//                                         [eachKey]: (eachSummary[eachKey] * eachLinked.itemSize) / eachItem.itemSize
//                                     }
//                                 }
//                             })
//                         }
//                         finalMixedForecast.push({
//                             date: eachSummary.date,
//                             ...forecastMapped
//                         });
//                     });
//                 }
//                 linkedSummary.push({
//                     id: eachLinked.id, summary: finalMixedForecast
//                 })
//             }
//         });
//     }
//     finalData.push({
//         ...eachItem,
//         orderableSummary: itemsMap.get(`36312-${eachItem.itemId}`),
//         sellableSummary: linkedForecastData,
//         linkedSummary: linkedSummary
//     });
// });
// console.log(`---`, JSON.stringify(finalData))

// const related = { date: '2019-09-22', ss: 100 };
// let dats = { ...related };
// delete dats.date;
// console.log(dats, related)

// console.log(typeof moment.tz('America/Chicago').format());



// const length = 100;

// console.log(Math.ceil(100 / 30))
// console.log(moment().format())
// console.log(moment.tz("America/Chicago").format())
// console.log(moment.tz("UTC").format());
// console.log(moment("2019-10-12T21:21:32-05:00").format("YYYY/MM/DD"))
// console.log(moment.utc(moment.tz("2019-08-10", "America/Chicago").format("YYYY-MM-DD")).toDate())
// console.log(moment.tz("America/Denver").format('HH:mm'))
// console.log("3021271" > "701641")
// const data = (...params) => {
//     const finalData = [...params];
//     console.log(finalData)
// }

// data('idea', 'idea2');





// const validate = (value) => {
//     if (value !== "" && value !== null && Number.isInteger(value) && value >= 0) {
//         return true;
//     }
//     return false
// }

// console.log(validate(1), validate('1'), validate(0), validate(1.5), validate(), validate(""))




// console.log(moment.tz("2019-10-11T11:10:56-05:00", "UTC").format("hh:mm:ss"));
// console.log(moment.tz("2019-10-11T11:10:56-05:00", "America/Chicago").format("hh:mm:ss"));

// const data = [
//     {
//         id: 1
//     }, {
//         id: 2
//     }, {
//         id: 3
//     }
// ]
// const data1 = [
//     {
//         name: 1
//     },
//     {
//         name: 3
//     }
// ]
// console.log(moment.tz("America/Chicago").toDate())
// console.log([...data, ...data1])
// console.log(moment.tz("2019-10-14T00:00:00.000+00:00", "UTC").format('YYYY-MM-DD'))
// const data = [
//     {
//         date: "2019-08-07",
//         SALE: 10
//     },
//     {
//         date: "2019-08-10",
//         SALE: 11
//     },
//     {
//         date: "2019-07-10"
//     }
// // ]
// const dateDetails = [{ date: "2019-10-10" },
// { date: "2019-10-03" },
// { date: "2019-09-26" },
// { date: "2019-09-19" },
// { date: "2019-09-12" }]
// const compare = (inp1, inp2) => inp1.date < inp2.date;
// const result = dateDetails.sort(compare)
// console.log(`---sort----`, result)


// const data = "1,2,3,4,3,3,3,3,3,3"

// const duplciates = data.split(",");
// const nonDuplciates = [];
// duplciates.forEach(x => {
//     if (!nonDuplciates.includes(x)) {
//         nonDuplciates.push(x);
//     }
// });
// console.log(typeof [1, 2, 3, 4, 5].join())

// console.log(nonDuplciates);
// console.log("2019-08-17" > "2019-08-18")

// let closeTime = new Date();
// closeTime.setHours(10);
// closeTime.setMinutes(0);
// console.log(moment.tz('America/Chicago').format('HH:mm'), moment(closeTime).format('HH:mm'), closeTime.getTime())
// console.log((moment.tz('America/Chicago').format('HH:mm')) > (moment(closeTime).format('HH:mm')))

// console.log(moment.tz('America/Chicago').add(1, 'days').format('YYYY-MM-DD'))
// console.log(moment.tz('America/Los_Angeles').add(1, 'day').format('YYYY-MM-DD'))
// console.log(new Date("2019-09-26"))

// const storeId = '036302';
// console.log(storeId.replace('0', ''))
// console.log(moment.tz('2019-08-10', 'America/New_York').toDate())
// const date = moment.tz('2019-08-10', 'EST').toDate()
// const formatDate = moment(date).format('YYYY-MM-DD')
// console.log(moment.utc('2019-01-28T00:00:00.000+00:00').toDate())
// console.log(date, formatDate)
// console.log(moment.tz('2019-10-05', 'America/Chicago').toDate())
// console.log(moment.utc('2019-01-28T05:00:00.000+00:00').toDate())

// console.log(moment.utc(moment.tz('2019-09-17', 'EST').format('YYYY-MM-DD')).toDate())
// console.log(moment.tz('America/New_York').toDate())
// console.log(moment.utc().toDate())
// console.log(moment.tz.guess())
// console.log(moment.tz('America/Chicago').format("HHmmss"))
// console.log(moment.tz('UTC').format("YYYYMMDD"))
// console.log(moment.tz('2019-09-26T23:21:35.141Z', 'UTC').format('YYYY-MM-DD'))
// console.log(moment.tz('2019-09-26T04:21:35.141Z', 'America/Chicago').format('YYYY-MM-DD'))
// console.log(moment.tz('America/Chicago').toDate().getTime())
// console.log(moment.tz('America/Chicago').format('YYYYMMDD'),
//     moment.tz('America/Chicago').format('HHmmss'),
//     String(moment.tz('America/Chicago').toDate().getMilliseconds()).substring(0, 2))
// console.log((`H00000001232019092717143630`).length)
// console.log(('D10184731011717202019093018.330000149').length)
// console.log(Math.round(1.4))
// console.log(Math.round(1.5))
// console.log(Math.round(1.6))
// console.log(Math.round(6))



// console.log(moment('2019-09-19').toISOString())
// console.log(Number(1.09 * 100))
// console.log(parseInt(1.09 * 100, 10))
// let untransmittedOrderQuantity = 10;
// const deliverableUnits = 6;
// let lduMultiple;
// if (untransmittedOrderQuantity % deliverableUnits) {
//     lduMultiple = (untransmittedOrderQuantity % deliverableUnits);
//     untransmittedOrderQuantity += (deliverableUnits - lduMultiple);
// }
// console.log(lduMultiple, untransmittedOrderQuantity)
// const data = new Map();
// data.set(1, { timeZone: '1', risk: 'u' });
// data.set(2, { timeZone: '2', risk: 'f' });
// // const finalData = [];
// orderChangeStatus: RECEIVED_STRING,
//         itemOrderQty: { $nin: [null, ''] },

// for (let [k, v] of data) {
//     console.log(k, v, `--`)
//     if (v.timeZone === '1') {
//         finalData.push(k);
//     }
// }
// console.log(finalData)

// var options = {
//     method: 'GET',
//     url: 'https://72b0uqva0i.execute-api.us-east-1.amazonaws.com/live/stores/18473/ordering/dailyorders/2019-09-19',
//     // qs: { orderCycleTypeCode: 'DAILY FRESH FOODS' },
//     headers:
//     {
//         'cache-control': 'no-cache',
//         Connection: 'keep-alive',
//         'Accept-Encoding': 'gzip, deflate',
//         'Cache-Control': 'no-cache',
//         Accept: '*/*',
//         'x-api-key': 'hydRCx060z2bOSeA4hMJ75obJrZZAUZt33oo269z'
//     }
// };

// request(options, function (error, response, body) {
//     if (error) throw new Error(error);
//     const details = JSON.parse(body)
//     console.log(details['NON-DAILY']);
// });

// const details = new Map();

// details.set('hi', 'hello');
// details.set('hi2', 'hello2');
// details.set('hi3', 'hello3');

// let keys = [...details.keys()];
// console.log(keys);
// keys.forEach(eachKey => {
//     console.log(eachKey, details.get(eachKey))
// })
// console.log(moment.tz('2019-09-13', 'America/Chicago').toDate())
// const folderName = 'storeOrders/Archive/roc.dxtx.reg_order_snd.20190914.053235.00002038';

// const prefixValues = folderName.split('/');
// console.log(prefixValues)
// if (prefixValues && prefixValues.length) {
//     console.log(prefixValues[prefixValues.length - 1])
// }
// console.log(moment.tz('Asia/Calcutta').format('DD/MM'))
// console.log(moment.tz('Asia/Calcutta').add(-1, 'days').format('DD/MM'))
// console.log(moment().tz('America/New_York').hours())
// console.log(moment('2019-09-19').tz('America/New_York').subtract(7, 'days').format('YYYY-MM-DD'))
// const dt = null;
// const dt1 = undefined;
// console.log(!dt, dt === null, !dt1)
// const data = [{
//     storeId: '18473',
//     fileName: 'roc.dxtx.reg_order_snd.20190911.014001.00002038',
//     zone: 'C'
// },
// {
//     storeId: '34556',
//     fileName: 'roc.dxtx.reg_order_snd.20190911.014001.00004064',
//     zone: 'C'
// }];

// const finalStoreData = new Map();

// if (data && data.length) {
//     data.forEach(eachData => {
//         finalStoreData.set(eachData.storeId,
//             {
//                 fileName: eachData.fileName,
//                 timeZone: eachData.zone
//             })
//     })
// }

// console.log(finalStoreData)
// const moment = require('moment-timezone');
// // const storeData = require('./store.json')

// const ddate = moment.tz('UTC').format()

// const ddyy = moment("2019-01-14T01:23:15.000+00:00")

// const deplay = (iptime) => moment.tz(iptime, 'UTC').format('HH:mm')

// const inputDate1Greater = (inputDate1, inputDate2) => moment.tz(inputDate1, 'UTC').isAfter(moment.tz(inputDate2, 'UTC'))

// console.log(ddate)
// console.log(inputDate1Greater(ddate, "2019-01-14T01:23:15.000+00:00"))

// console.log(deplay(`2019 - 09 - 01T15: 01: 40.858Z`))

// console.log(new Date("2019-09-05T19:41:08.096+00:00"))
// const he = 'hello'
// console.log(he.toUpperCase())

// console.log(`--`, moment.tz('UTC').toDate())

// console.log(`********* `, moment.utc('2019-01-25T00:00:00.000+00:00').toDate());

// console.log(`-- - `, ('fd').replace('d', ''))
