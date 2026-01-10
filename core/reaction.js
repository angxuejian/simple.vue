function defineReaction(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  else if (Array.isArray(obj)) {
    definePropertyArr(obj);

    obj.forEach((item) => defineReaction(item));
  } else {
    Object.keys(obj).forEach((key) => {
      defineReaction(obj[key]);
      definePropertyObj(obj, key)
    });
  }
  return obj;
}
function definePropertyObj(obj, key) {
  const _key = `_${key}`;

  Object.defineProperty(obj, `_${key}`, {
    value: obj[key],
    writable: true,
    enumerable: false,
    configurable: true,
  });

  Object.defineProperty(obj, key, {
    get() {
      // console.log(`读取: ${_key}`);
      return this[_key];
    },
    set(newVal) {
      if (newVal === this[_key]) return;

      // console.log(`赋值: ${_key}`);

      this[_key] = newVal;

      defineReaction(newVal);

      defineUpdate()
    },
  });
}

function definePropertyArr(arr) {
  const arrayPrototype = Array.prototype;
  const newArrayPrototype = Object.create(arrayPrototype);
  const resetMethods = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
  ];

  resetMethods.forEach((method) => {
    newArrayPrototype[method] = function (...args) {
      // console.log(`执行: ${method}; ${args}`);
      const result = arrayPrototype[method].apply(this, args);

      let inserted = null;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          // splice(start, deleteCount, ...items)
          inserted = args.slice(2);
          break;
      }

      // 如果有新增数据，就再次循环绑定响应式
      if (inserted) {
        inserted.forEach((item) => defineReaction(item));
      }

      defineUpdate()

      return result;
    };
  });

  arr.__proto__ = newArrayPrototype;
}

function defineReactionSet(target, key, value) {
  // 数组
  if (Array.isArray(target) && typeof key === "number") {
    target.splice(key, 1, value);
    return;
  }

  // 已有属性 → 直接走 setter
  if (key in target) {
    target[key] = value;
    return;
  }

  // 新增属性
  definePropertyObj(target, key)
  defineUpdate()
}

function defineUpdate() {
  if (typeof update === "function") {
    update();
  }
}
