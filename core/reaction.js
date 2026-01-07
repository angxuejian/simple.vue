function defindReaction(obj) {
  if (typeof obj !== "object" || obj === null) return obj;

  Object.keys(obj).forEach((key) => {
    defindReaction(obj[key]);

    const _key = `_${key}`;

    Object.defineProperty(obj, `_${key}`, {
      value: obj[key],
      writable: true,
      enumerable: false,
      configurable: true,
    });

    Object.defineProperty(obj, key, {
      get() {
        console.log(`读取: ${_key}`);
        return this[_key];
      },
      set(newVal) {
        if (newVal === this[_key]) return;

        console.log(`赋值: ${_key}`);

        this[_key] = newVal;

        defindReaction(newVal);

        if (typeof update === "function") {
          update();
        }
      },
    });
  });
  
  return obj;
}
