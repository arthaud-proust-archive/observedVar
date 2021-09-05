# Package ObservedVar

## What is it?
A package which simply allows you to attach listeners to your variables.

## How to install ?
```shell
$ npm i observedvar
```

## How it works?

#### Includes package 
```js
const { ObservedVar } = require('observedvar');
// or (shorthand)
const { Ov } = require('observedvar');
```

#### Create an observed variable
```js
const foo = new ObservedVar('defaultValue');
// or (shorthand with the right import)
const foo = new Ov('defaultValue');
```

#### Set value 
```js
foo.set('new value')
```

#### Get value
Be attentive to shallow copy (this fonctionnality can be added to the package, you can propose a modification)
```js
foo.value()
// or 
foo.get()
```

#### Add a listener, for everytime or once
It return a listener object, use his id to unsubscribe.
```js
const callback = (listener, newValue)=>{
    console.log(`(listener ${listener.id}) Foo value changed, his value is now ${newValue}`)
    if(conditionToDestroy) {
        listener.destroy();
    }
};

const fooListener = foo.subscribe(
    callback,
    isDirectlyDestroyedAfterBeingCalled // default is false
);
// shorthands
foo.sub(...)
foo.once(...) // equals to foo.sub(callback, true)
```

#### Remove a listener
With the Ov variable
```js
foo.unsubscribe(fooListener.id);
// shorthand
foo.unsub(...);
```
Or directly from the listener
```js
fooListener.destroy();
```



#### The method once has another use  
You could use a listener to handle a fetch result.
To prevent the following case
```js
const fetchedData = new ObservedVar(null);
fetch(...).then(data=>{
    fetchedData.set(data);
});

...

if(fetchedData===null) {
    // supposing the data is fetching.
    // so we need to subscribe a listener
    fetchedData.subscribe(()=>handleData());
} else {
    // supposing the data is already fetched.
    // we don't need a listener
    handleData();
}
```
Use `once()` like that:
```js
const fetchedData = new ObservedVar(null);
fetch(...).then(data=>{
    fetchedData.set(data);
});

...

fetchedData.once(
    handleData,
    null // The value expected to subscribe a listener
);
```

## Listener object
It is returned when the method `.subscribe(...)` is called, or within the callback
```js
const fooListener = foo.sub(listener=>{
    console.log(listener)
}, once);

console.log(fooListener)

// listener = fooListener = {
//      once: false,
//      id: 0,
//      destroy: [Function: destroy],
//      callback: [Function: callback]
// }

```

## Shorthands
|Full|Shorthand|
|---|---|
|`new ObservedVar(defaultValue)`|`new Ov(defaultValue)`|
|`.subscribe(listener)`|`.sub(listener)`|
|`.unsubscribe(listenerId)`|`.unsub(listenerId)`|
|`.subscribe(listener, true)`|`.once(listener)`|