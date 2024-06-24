import { uuid } from "vue3-uuid";

export function getUserNameInitials(first_name, last_name) {
    let initialLetters =
    first_name.trim().charAt(0).toUpperCase() +
    last_name.trim().charAt(0).toUpperCase();
    return initialLetters;
  }

export function intToString(num) {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
      return num;
  }
  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }

  let res = (Math.round((num / si[index].v) * 10) / 10)
  return res.toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}  

export function getUUID(){
  return uuid.v1()
}

export function replaceNewLineWithBreakLine(str){
  return str.replace(/\n/g, "<br />");
  
}

export function copyTextToClipboard(TextToCopy){
  try{
    // let text =  TextToCopy.replace(/\n/g, "<br />");
    navigator.clipboard.writeText(TextToCopy)
    return true
  }
  catch(ex){
    return false
  }
  
}
export function getRandomString() {
  // eslint-disable-next-line no-unused-vars
  let r = (Math.random() + 1).toString(36).substring(7)
  return r
}

export function convertFileSize(bytes) {
  if (bytes < 1024) {
      return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}


// export function isMobileDevice(){
//   /* Storing user's device details in a variable*/
//   let details = navigator.userAgent;
  
//   /* Creating a regular expression 
//   containing some mobile devices keywords 
//   to search it in details string*/
//   let regexp = /android|iphone|kindle|ipad/i;

//   /* Using test() method to search regexp in details
//   it returns boolean value*/
//   let isMobileDevice = regexp.test(details);

//   if (isMobileDevice) {
//     console.log("in if")
//      return true;
//   } else {
//     console.log("in else")
//       return false;
//   }
// }