//: set all properties with value the same.
export const setAllValueObject = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
//: set all properties value null.
export const setAllNullObject = obj => setAllValueObject(obj, null);

// 2023-01-31: Define cartesian join (Cross Join)
const cartesianField = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
export const cartesian = (a, b, ...c) => (b ? cartesian(cartesianField(a, b), ...c) : a);

export default { setAllValueObject, setAllNullObject, cartesian }