export default (_ => {
  const curry = f => (a, ..._) =>
    _.length ? f(a, ..._) : (..._) => f(a, ..._);
  const isPromise = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

  const head = iter => isPromise(take(1, iter), ([h]) => h);
  const reduce = curry((f, acc, iter) => {
    if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);

    iter = iter[Symbol.iterator]();

    return isPromise(acc, function recur(acc) {
      let cur;
      while (!(cur = iter.next()).done) {
        const a = cur.value;
        acc = isNop(acc, cur.value, f);
        if (acc instanceof Promise) return acc.then(recur);
      }
      return acc;
    });
  });
  const go = (...args) => reduce((a, f) => f(a), args);
  const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

  const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
      res.push(i);
    }
    return res;
  };

  const take = curry((l, iterable) => {
    let res = [];
    let iterator = iterable[Symbol.iterator]();
    let cur;
    return (function recur() {
      while (!(cur = iterator.next()).done) {
        const a = cur.value;
        if (a instanceof Promise)
          return a
            .then(a => {
              res.push(a);
              return res.length == l ? res : recur();
            })
            .catch(e => (e == nop ? recur() : Promise.reject(e)));
        res.push(a);
        if (res.length == l) return res;
      }
      return res;
    })();
  });

  const L = {};
  const isIterable = a => a && a[Symbol.iterator];
  const nop = Symbol('nop');
  const isNop = (acc, a, f) =>
    a instanceof Promise
      ? a.then(
          a => f(acc, a),
          e => (e == nop ? acc : Promise.reject(e))
        )
      : f(acc, a);
  L.map = curry(function*(f, iter) {
    for (const a of iter) {
      yield isPromise(a, f);
    }
  });

  L.filter = curry(function*(f, iter) {
    for (const a of iter) {
      const b = isPromise(a, f);
      if (b instanceof Promise)
        yield b.then(b => (b ? a : Promise.reject(nop)));
      else if (b) yield a;
    }
  });

  L.range = function*(l) {
    let i = -1;
    while (++i < l) {
      yield i;
    }
  };

  L.entries = function*(obj) {
    for (const k in obj) yield [k, obj[k]];
  };

  L.flatten = function*(iter) {
    for (const a of iter) {
      if (isIterable(a)) yield* a;
      else yield a;
    }
  };

  L.flatMap = curry(pipe(L.map, L.flatten));

  L.deepFlat = function* f(iter) {
    for (const a of iter) {
      if (isIterable(a)) yield* f(a);
      else yield a;
    }
  };

  const C = {};
  function noop() {}
  const catchNoop = arr => (
    arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
  );

  C.reduce = curry((f, acc, iter) => {
    const iter2 = catchNoop(iter ? [...iter] : [...acc]);
    return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
  });

  C.take = curry((l, iter) => take(l, catchNoop([...iter])));

  C.takeAll = C.take(Infinity);

  C.map = pipe(L.map, C.takeAll);

  C.filter = curry(pipe(L.filter, C.takeAll));

  const takeAll = take(Infinity);

  const map = curry(pipe(L.map, takeAll));

  const filter = curry(pipe(L.filter, takeAll));

  const find = curry((f, iter) => go(iter, filter(f), take(1), ([a]) => a));
  const flatten = pipe(L.flatten, takeAll);
  const flatMap = curry(pipe(L.map, flatten));
  const add = (a, b) => a + b;
})(typeof global == 'object' ? global : window);
