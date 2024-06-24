export function addValueToSession(id) {
  //   console.log("addValueToSession", id);
  let temp = JSON.parse(window.sessionStorage.getItem("followIds"));
  if (temp == null) {
    temp = [];
  }
  if (temp.includes(id)) {
    return false;
  } else {
    temp.push(id);
    window.sessionStorage.setItem("followIds", JSON.stringify(temp));
  }
}

export function removeValueFromSession(id) {
  //   console.log("removeValueToSession");
  let temp = JSON.parse(window.sessionStorage.getItem("followIds"));
  if (temp == null) {
    temp = [];
  }
  if (temp.includes(id)) {
    //console.log("in if");
    temp.map((res) => {
      if (res == id) {
        temp.splice(res, 1);
      }
    });
    window.sessionStorage.setItem("followIds", JSON.stringify(temp));
  } else {
   // console.log("in else");
    return false;
  }
}

export function isFollowing(id) {
    // console.log("isFollowing", id);
  let temp = JSON.parse(window.sessionStorage.getItem("followIds"));
  if (temp == null) {
    // console.log("is null")
    temp = [];
  }
  if (temp.includes(id)) {
    // console.log("in if");
    return true;
  } else {
    // console.log("in else")
    return false;
  }
}
