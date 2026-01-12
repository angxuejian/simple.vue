function baseHandler() {
  return {
    get(target, key, receiver) {
      console.log(target, key, receiver, "get");
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(target, key, receiver, "set");
      return Reflect.set(target, key, value, receiver);
    },
    deleteProperty(target, key) {
      console.log(target, key, "deleteProperty");
      return Reflect.deleteProperty(target, key);
    },
    has(target, key) {
      console.log(target, key, "has");
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      console.log(target, "ownKeys");
      return Reflect.ownKeys(target);
    },
  };
}

function proxyReactive(obj) {
  return new Proxy(obj, baseHandler());
}

function proxyRef(value) {
  const obj = {
    __isRef: true,
    value,
  };
  return new Proxy(obj, baseHandler());
}

const arr = proxyReactive([0]);
const age = proxyRef(0);
const obj = proxyReactive({ name: 123 });

console.log('Proxy')
console.log('==========================')
"name" in obj;
arr[0];
age.value = 20;
for (const key in obj) {
  // console.log(obj[key])
}
console.log('==========================')
console.log('end')
