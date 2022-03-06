export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function apiAsset(asset) {
  return `${process.env.NEXT_PUBLIC_API_URL}/assets/${asset}`;
}