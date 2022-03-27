export function fullName(user) {
  return `${user.first_name} ${user.last_name}`;
}

export function urlLattes(lattes) {
  return `http://lattes.cnpq.br/${lattes}`;
}

export function sortByFullName(arr, reverse = false) {
  return arr.sort((a, b) => {
    const aName = fullName(a.user), bName = fullName(b.user);
    const factor = reverse ? -1 : 1;
    if (aName < bName) {
      return -1 * factor;
    }
    if (aName > bName) {
      return 1 * factor;
    }
    return 0;
  });
}