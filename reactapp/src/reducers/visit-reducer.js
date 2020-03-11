export default function(visit = [], action) {
    if(action.type === 'addVisit') {
        var visitCopy = [...visit];
        visitCopy.push(action.visit)
        return visitCopy;
    } else if(action.type === 'rmvVisit') {
      var rmvCopy = [...visit];
      rmvCopy.splice(action.toRmv, 1);
      return rmvCopy;
    } else {
      return visit;
    }
    
}