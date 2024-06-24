import appConstants from "../../appConstants.js";

export function getCurrencySymbol(currency) {
    if (currency == appConstants.Currency.INR){
        return "₹"
    }
    if (currency == appConstants.Currency.USD){
        return "$"
    } 

  }