import { DEFAULT_TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function(url, uploadData = undefined){
  const fetchPro = uploadData ?  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(uploadData)
  }) : fetch(url);
  try {
    const res = await Promise.race([fetchPro, timeout(DEFAULT_TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.statusText} (${data.message})`);
    return data;
  } catch (e) {
    throw e;
  }
}