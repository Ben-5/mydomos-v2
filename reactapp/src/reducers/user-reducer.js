export default function(currentUser = false, action) {

  if(action.type === 'addUser') {

      return {...action.toAdd};
    } else if (action.type === 'changeAvatar'){

      var currentUserCopy = {...currentUser};
      currentUserCopy.userAvatar = action.avatar
      return currentUserCopy

    } else if (action.type === 'changeInfo'){
      var currentUserCopy = {...currentUser};
      console.log(currentUserCopy)
      currentUserCopy = {
        userLastname : action.info.lastname,
        userFirstname : action.info.firstname,
        userEmail : action.info.email,
        userBirthday : action.info.birthday,
        userAddress : action.info.address,
        userZIP : action.info.zip,
        userCity : action.info.city,
        userCountry : action.info.country}
      return currentUserCopy
      
    } else if (action.type === 'signout'){

      return false;
    } else {
      return currentUser;
    }
    
}