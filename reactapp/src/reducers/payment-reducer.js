export default function(currentPayment = false, action) {
    if(action.type === 'addCurrentPayment') {
      var content = action.toAdd;
        return content;
    } else {
      return currentPayment;
    }
}