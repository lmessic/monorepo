function deepClone(obj, hash = new WeakMap()) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	let cloneObj = Array.isArray(obj) ? [] : {};
  // 解决循环引用问题 let target = {name: 'a'} target.target = target;
  if(hash.has(obj)){
    return hash.get(obj);
  } else {
    hash.set(obj, cloneObj);
  }

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === "object") {
				cloneObj[key] = deepClone(obj[key], hash);
			} else {
				cloneObj[key] = obj[key];
			}
		}
	}
	return cloneObj;
}
