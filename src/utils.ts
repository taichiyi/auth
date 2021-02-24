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
