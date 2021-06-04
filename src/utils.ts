import request, { CoreOptions } from 'request'

export const requestPromise = (url: string, options?: CoreOptions) =>
  new Promise<request.Response>((resolve, reject) => {
    request(url, options, function (err, response) {
      if (err) {
        reject(err)
        return
      }
      resolve(response);
    });
  });

export const getCookieObject = (cookieStr: string[]) => {
  const cookieObject: { [x: string]: string } = {};
  const cookieList = cookieStr.map((val) => val.split('; ')[0]);
  cookieList.forEach((val) => {
    const valSplit = val.split('=');
    const [key, value] = valSplit;
    cookieObject[key] = value;
  });
  return cookieObject;
}
