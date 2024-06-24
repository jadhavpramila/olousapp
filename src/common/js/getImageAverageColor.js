export function getAverageRGB() {
    
    var blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext("2d"),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    var imgEl = document.createElement('img');
    // imgEl.crossOrigin = "Anonymous";
    // imgEl.referrerpolicy="no-referrer"
    var imageURL = "https://daifhb63cb3v5.cloudfront.net/media/images/1622402119045.jpg"
    imgEl.onload = function() {
        debugger;
        // alert(this.width + 'x' + this.height);
        

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        // context.drawImage(imgEl, 0, 0);
        context.drawImage(
            imgEl,
            0,
            0,
            height,
            width
          );

        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }

        length = data.data.length;

        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return rgb;
    }
    imgEl.src = imageURL
    

}