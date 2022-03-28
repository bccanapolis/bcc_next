export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function apiAsset(asset) {
  return `${process.env.NEXT_PUBLIC_API_URL}/assets/${asset}`;
}

export function stringBind(text = '', targetWord, replacingWord) {
  return text.replace(new RegExp(`{{(( )*?${targetWord}( )*?)}}`, 'gi'), replacingWord);
}

export function clearObject(obj) {
  for (let propName in obj) {
    if (!obj[propName] || obj[propName] === null || obj[propName] === undefined) {
      delete obj[propName];
    }
  }
  return obj;
}

export function urlSlugID(url) {
  return url.split(/(@)(?!.*@)/);
}

export function querySerialize(obj) {
  var str = [];
  obj = clearObject(obj);
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

export function sortByField(arr, field, reverse) {
  const factor = reverse ? -1 : 1;
  return arr.sort((a, b) => {
    if (a[field] < b[field]) {
      return -1 * factor;
    }
    if (a[field] > b[field]) {
      return 1 * factor;
    }
    return 0;
  });
}

export function onlyUniqueObject(arr, field) {
  return [...new Map(arr.map((item) => [item[field], item])).values()];
}