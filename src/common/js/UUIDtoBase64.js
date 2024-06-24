// Convert GUID string to Base-64 in Javascript
// https://stackoverflow.com/questions/6095115/javascript-convert-guid-in-string-format-into-base64

var hexlist = "0123456789abcdef";
var b64list =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// GUID string with four dashes is always MSB first,
// but base-64 GUID's vary by target-system endian-ness.
// Little-endian systems are far more common.  Set le==true
// when target system is little-endian (e.g., x86 machine).
//
function uuidToBase64(g, le) {
  var s = g.replace(/[^0-9a-f]/gi, "").toLowerCase();
  if (s.length != 32) return "";

  if (le)
    s =
      s.slice(6, 8) +
      s.slice(4, 6) +
      s.slice(2, 4) +
      s.slice(0, 2) +
      s.slice(10, 12) +
      s.slice(8, 10) +
      s.slice(14, 16) +
      s.slice(12, 14) +
      s.slice(16);
  s += "0";

  var a, p, q;
  var r = "";
  var i = 0;
  while (i < 33) {
    a =
      (hexlist.indexOf(s.charAt(i++)) << 8) |
      (hexlist.indexOf(s.charAt(i++)) << 4) |
      hexlist.indexOf(s.charAt(i++));

    p = a >> 6;
    q = a & 63;

    r += b64list.charAt(p) + b64list.charAt(q);
  }
  r += "==";

  return r;
} // guid_to_base64()

export function getUUIDtoEncodedString(uuid) {
  let uuid_array_ = uuid.split("-");
  let result = "";
  for (let index in uuid_array_) {
    let char_array = uuid_array_[index].split("");
    uuid_array_[index] = char_array.reverse().join("");
  }
  result = uuid_array_.join("-");
  let base64 = uuidToBase64(result, false);

  base64 = base64.replace(/\+/g, "-");
  base64 = base64.replace(/\//g, "_");
  base64 = base64.replace(/\=/g, "");

  // base64 = base64.replace(new RegExp('+', 'g'), "-")
  // base64 = base64.replace(/\//g, "_")
  // base64 = base64.replace(/=/g, "")

  // base64 = base64.replaceAll('+', "-")
  // base64 = base64.replaceAll('/', "_")
  // base64 = base64.replaceAll('=', "")
  return base64;
}

// https://gist.github.com/brianboyko/1b652a1bf85c48bc982ab1f2352246c8
// converts a UUID to a URL-safe version of base 64.
export function encodeUUID(uuid) {
  const stripped = uuid.replace(/-/g, ""); // remove dashes from uuid
  const true64 = btoa(
    String.fromCharCode.apply(
      null,
      stripped
        .replace(/\r|\n/g, "")
        .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
        .replace(/ +$/, "")
        .split(" ")
    )
  ); // turn uuid into base 64
  const url64 = true64.replace(/\//g, "_").replace(/\+/g, "-"); // replace non URL-safe characters
  return url64;
}

// https://gist.github.com/brianboyko/1b652a1bf85c48bc982ab1f2352246c8
// takes a URL-safe version of base 64 and converts it back to a UUID.
export function decodeUUID(url64) {
  const true64 = url64.replace(/_/g, "/").replace(/-/g, "+"); // replace url-safe characters with base 64 characters
  const raw = atob(true64); // decode the raw base 64 into binary buffer.

  let hex = ""; // create a string of length 0
  let hexChar; // mostly because you don't want to initialize a variable inside a loop.
  for (let i = 0, l = raw.length; i < l; i++) {
    hexChar = raw.charCodeAt(i).toString(16); // get the char code and turn it back into hex.
    hex += hexChar.length === 2 ? hexChar : "0" + hexChar; // append hexChar as 2 character hex.
  }
  hex = hex.toLowerCase(); // standardize.
  // pad zeroes at the front of the UUID.
  while (hex.length < 32) {
    hex = "0" + hex;
  }
  // add dashes for 8-4-4-4-12 representation
  const uuid = hex.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  return uuid;
}
