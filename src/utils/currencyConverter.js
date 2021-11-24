const numToText = {
    ones: ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'],
    tens: ['', '', 'TWENTY', 'THIRTY', 'FOURTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'],
    sep: ['', ' THOUSAND ', ' MILLION ', ' BILLION ', ' TRILLION ', ' QUADRILLION ', ' QUINTILLION ', ' SEXTILLION ']
  }
  
for (let decimals in numToText) {
    numToText[decimals] = numToText[decimals].map(eachWord => eachWord.substring(0,1).concat(eachWord.substring(1).toLowerCase()))
}

const currencyConverter = (inputNum) => {
    if (inputNum.length === 0) {
      return ''
    }
    inputNum = inputNum.replace(/,/, '')
    if (isNaN(inputNum)) {
      return 'Invalid input'
    }
  
    // let centsStr = ""
    // let dollarArr = []
    // if (subArr.length > 2) {
    //     console.log('here')
    //     setErrorMessage("can't have over 1 full stops")
    //     setInputNum('')
    //     setTimeout(() => setErrorMessage(null), 5000)
    // } else if (subArr.length === 0) {
    //   return ''
    // }
    let [dollar, cents] = inputNum.split(".")
    let centsStr = ""
    let dollarArr = []
    console.log(dollar)
    console.log(cents)
  
    if (cents) {
      // convert decimals
      let digits
      console.log(cents)
      if (cents[0] !== '1') {
        digits = cents+"0".slice(0,2).split("")
        console.log(digits)
        centsStr = numToText.tens[+digits[0]] + " " + numToText.ones[+digits[1]]
      } else {
        if (cents.length === 1) {
          digits=[cents+"0".slice(0,2)]
        } else {
          digits = [cents]
        }
        console.log(digits)
        console.log(+digits[0])
        centsStr = numToText.ones[+digits[0]]
      }
      console.log(centsStr)
    }
  
    while (dollar) {
      dollarArr.push(dollar % 1000)
      dollar = parseInt(dollar / 1000, 10)
    }
  
    let i = 0
    let str = ""
    while (dollarArr.length) {
      str = ((a) => {
        const x = Math.floor(a/100)
        const y = Math.floor(a / 10) % 10
        const z = a % 10
  
        return (
          (x > 0
          ? numToText.ones[x] + ' hundred '
          : '') + 
          (
            y >= 2 
            ? numToText.tens[y] + ' ' + numToText.ones[z]
            : numToText.ones[10 * y + z]
          )
        )
      })(dollarArr.shift()) + numToText.sep[i++] + str
    }
    console.log(str)
    console.log(centsStr)
    return str + (str !== '' ? (str === 'One' ? ' Dollar ' : ' Dollars ')
    : '') +
      (centsStr.trim() ? (str === '' ? '' : 'and ') + centsStr + (centsStr.trim() === 'One' ? ' Cent ' : ' Cents')
      : '')
  }

export default currencyConverter