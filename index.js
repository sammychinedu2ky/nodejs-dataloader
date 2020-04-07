const DataLoader = require('dataloader');
const db = require('./db')
async function batchFunction(keys) {
    const results = await new Promise(async (res) => {
        let response = []
        setTimeout(() => {
            keys.forEach(item => {
                let val = db.find(val => val.index == item)
                if (val != undefined) {
                    response.push(db.find(val => val.index == item))
                }
                else response.push(('not found in db'))
            })
            res(response)
        }, 5000)
    })
    return results
}


function createLoader() {
    return {
        user: new DataLoader(batchFunction)
    }
}
let loader = createLoader();
async function test() {
    //you would see that 3 returns not found in  db 
    //you would also notice that during the first call
    //to the db. it took 5 seconds to return the data
    // and when we needed the information for the id(1)
    // it didn't have to take 5seconds rather the response
    // was instant
    console.log(await (loader.user.loadMany([1, 3, 2])))
    console.log(await loader.user.load(1))
}
test()





