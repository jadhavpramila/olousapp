import { fill } from "@sentry/utils"

export function createImageUrlForOgTags(image_name, is_image_fit)
{
  let url_object = new URL(image_name)
  const domain = "https://d2ebi3hkj8dfb2.cloudfront.net/" // your cloudfront url
  let key  = url_object.pathname

  if(key.length > 0 && key[0]== "/"){
    key = key.substr(1)
  }
  let image_fit = "contain"
  if(is_image_fit){
    image_fit = "fill"
  }
  const request = {
    bucket: "olous",
    key:key, // S3 bucket name

    edits: {
      // smartCrop: true, // uncomment to crop around first face, will return nothing if no face is found
      normalize: true,
      grayscale: false,
      // small tip, if you have a mobile app you can use the following 2 lines of code to optimise your images further

      jpeg: true, // if iOS, iOS doesnt display webp so lets convert it
      sharpen: true,

      resize: {
        width: 200,
        height: 200,
        fit: "contain"
      }
    }
  }
  // console.log(request)
  const strRequest = JSON.stringify(request)
  const encRequest = btoa(strRequest)
  let url = `${domain}${encRequest}` // the image url

  return url

}