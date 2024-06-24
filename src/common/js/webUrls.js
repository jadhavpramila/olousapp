import appConstants from "../../appConstants.js";
import router from "../../router";
// export function createPostUrl(host, encode_str, userSlug, title) {
//   //need to append post type 'p'
//   return (
//     host + "/post/" + `${userSlug}_${title}${appConstants.url_separator}${encode_str}${appConstants.shape_page_postfix.POST}`

//   );
// }
export function getCurrentEncodedURL() {
  let current_route = window.location.pathname;
  let encoded_route = btoa(current_route);
  // let decoded_route = atob(encoded_route);
  router.push({
    name: appConstants.routes.LOGINWITHPARAM,
    params: { current_route: encoded_route },
  });
}
export function getCurrentEncodedURLWithQueryParameter(queryParameterObj) {
  let current_route = window.location.pathname;
  let encoded_route = btoa(current_route);
  // let decoded_route = atob(encoded_route);
  router.push({
    name: appConstants.routes.LOGINWITHPARAM,
    params: { current_route: encoded_route },
    query: {
      isFromBookMark: queryParameterObj.isFromBookmark,
      bookmarkFor: queryParameterObj.job_id,
    },
  });
}
export function setCurrentDecodeURL(route) {
  // debugger;
  let previous_route = route.params.current_route;
  if (previous_route == undefined) {
    router.replace({ name: appConstants.routes.HOME });
  } else {
    if (route.query.isFromBookMark) {
      let decoded_route = atob(previous_route);
      // let decryptedId = atob(route.query.bookmarkFor);
      if (decoded_route) {
        router.replace({
          path: `${decoded_route}`,
          query: {
            isFromBookMark: route.query.isFromBookMark,
            bookmarkFor: route.query.bookmarkFor,
          },
        });
      } else {
        router.replace({ name: appConstants.routes.HOME });
      }
    } else {
      try {
        let decoded_route = atob(previous_route);
        if (decoded_route) {
          router.replace(decoded_route);
        } else {
          router.replace({ name: appConstants.routes.HOME });
        }
      } catch (err) {
        router.replace({ name: appConstants.routes.HOME });
      }
    }
  }
}
export function createPostPageUrl(host, encode_str, userSlug, title) {
  //encoded string contains post type no need to append
  if (host.charAt(host.length - 1) == "/") {
    host = host.substring(0, host.length - 1);
  }
  return (
    host +
    "/post/" +
    `${userSlug}_${title}${appConstants.url_separator}${encode_str}`
  );
}

export function createJobURL(host, result, url_separator, encode_str) {
  return `${host}jobs/${result}${url_separator}${encode_str}`;
}

export function createPostDocumentPageUrl(host, encode_str, title) {
  if (host.charAt(host.length - 1) == "/") {
    host = host.substring(0, host.length - 1);
  }
  return host + "/post/" + `${title}${appConstants.url_separator}${encode_str}`;
}

export function createUSerProfileURL(host, userSlug) {
  return `${host}${userSlug}`;
}

export function createCompanyProfileURL(host, companySlug) {
  return `${host}business/${companySlug}`;
}

export function createCompanyProductURL(host, companySlug, product_id) {
  return `${host}business/${companySlug}/product/${product_id}`;
}

export function createSignInPageURL(host) {
  return `${host}${appConstants.routes.LOGIN}`;
}

export function getCurrentHostNameWithoutslash() {
  return window.location.origin;
}

export function getCurrentHostName() {
  let host = `${window.location.origin}/`;
  return host;
}

export function createBoardPageUrl(host, boardId, userSlug, title) {
  return (
    host +
    appConstants.display_route_Name.BOARDLIST +
    `/${userSlug}_${title}${appConstants.url_separator_boards}${boardId}`
  );
}

// export function createMessagingPageUrl(host, boardId, userSlug, title) {
//   return (
//     host +
//     appConstants.display_route_Name.BOARDLIST +
//     `/${userSlug}_${title}${appConstants.url_separator_boards}${boardId}`
//   );
// }
