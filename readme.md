# Package observedVar

## What is it?
A package to simply add possibility to attach listeners to your variables.

## How to install ?
```
npm i observedvar
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
// or 
const foo = new Ov('defaultValue');
```

#### Set value 
```js
foo.set('new value)
```

#### Get value
```js
foo.value
// or 
foo.get()
```

#### Add a listener, for everytime or once
It return listener id, required to remove it.
```js
const listenerId = foo.subscribe(
    ()=>console.log('Foo value changed'),
    isDestroyedAfterBeingCalled // default is false
);
// shorthands
foo.sub(...)
foo.once(...) // equals to foo.sub(..., true)
```

#### Remove a listener
```js
foo.unsubscribe(listenerId);
// shorthand
foo.unsub(...);
```



#### The method once has another use  
You could use a listener to handle a fetch result.
To prevent the following case
```
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
```
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

## Shorthands
|Full|Shorthand|
|---|---|
|`new ObservedVar(defaultValue)`|`new Ov(defaultValue)`|
|`.subscribe(listener)`|`.sub(listener)`|
|`.unsubscribe(listenerId)`|`.unsub(listenerId)`|
|`.subscribe(listener, true)`|`.once(listener)`|