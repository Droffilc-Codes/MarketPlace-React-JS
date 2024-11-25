const myName = "Colif"
// console.log(myName)



const test = {
  'David': 385000,
    "Emeka": 8750, 
    "Iya Gbemisola": 2275,
    "Iya Tobi": 4560,
    "Iya Oni": 4000,
    "Iya Sola": 6500,
    "date": 20-1-1992
}

// console.log(test)

const getShops = Object.entries(test).filter(item => item[0] !== "date" )

// console.log(getShops)

// const testGround = getShops.map(([shopName, totalAmount])=>(

// ))
const testA = [1, 2, 3, 4, 5, 6, 9]
const againtTest = testA.map(item => item + 5)

console.log(againtTest)