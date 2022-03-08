export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function apiAsset(asset) {
  return `${process.env.NEXT_PUBLIC_API_URL}/assets/${asset}`;
}

export function stringBind(text = '', targetWord, replacingWord) {
  return text.replace(new RegExp(`{{(( )*?${targetWord}( )*?)}}`, 'gi'), replacingWord);
}