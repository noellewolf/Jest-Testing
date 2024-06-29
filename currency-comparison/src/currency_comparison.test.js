import CurrencyComparison from './currency_comparison';
import fetchData from './utils/fetch-data.js'
jest.mock('./utils/fetch-data');

// Task 10: Import and mock fetchData

const testSalary = new CurrencyComparison(50000)
    
// Task 1: Create a test for testSalary.currencyConversion below
it("returns exchange rate for USD rounded to 2 decimal points", () => {
  // arrange
  const currencyCode1 = 'CAD'
  const expectedValue1 = 1.21
  const currencyCode2 = 'EUR'
  const expectedValue2 = .82
  const rates = {
    "MXN": 19.9021,
    "CAD": 1.2121, 
    "EUR": .8235  
  }
  // act
  const actualValue1 = testSalary.currencyConversion(rates, currencyCode1)
  const actualValue2 = testSalary.currencyConversion(rates, currencyCode2)
  //assert
  expect(actualValue1).toBe(expectedValue1)
  expect(actualValue2).toBe(expectedValue2)
})

// Task 5: Create a test for testSalary.hourlyPayUSD below
it("Returns hourly pay in USD from rate", () => {
  // arrange
  const rateCAD = 1.21
  const hourlyPayInCAD = testSalary.hourlyPayUSD(rateCAD)
  const expectedHourlyPay = 20.66
  //assert
  expect(hourlyPayInCAD).toBe(expectedHourlyPay)
})


// Task 6: Complete this test!
it("Respond with different salaries based on currency", (done) => {
  //arrange
  const currency = "CAD"
  const exchangeRate = 1.21
  const expectedValue = {
    USD: 25,
    CAD: 20.66,
    salary: 50000,
  }

  //act
  testSalary.response(currency, exchangeRate, result => {
    //assert
    try {
          expect(result).toEqual(expectedValue)
          done()
    } catch (error) {
      done(error)
    }
  })
})

// Task 10 & 11: Complete this test!
it("Receives current currency exchange data", async ()=>{
  //arrange
  const mockResponse = {
    status : "Mock",
    data: {
      "base": "USD",
      "rates": {
        "CCD": 50,
      },
      "date": "2021-05-17"
    }
  }
  const expectedValue = [{"CCD": 50}, "Mock"];

  // Mock the resolved value of fetchData
  fetchData.mockResolvedValueOnce(mockResponse);
  
  //act
  const actualValue = await testSalary.fetchCurrentExchange() 
  
  //assert
 
})
