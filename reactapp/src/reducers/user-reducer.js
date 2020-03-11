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
        ...currentUser,
        ...action.info
       }
      return currentUserCopy
      
    } else if (action.type === 'signout'){

      return false;
    } else {
      return currentUser;
    }
    
}