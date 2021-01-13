## About

It is basically just a plain javaScript object that allows component to share state. In a way, we can think of a store as a database. On the most fundamental level, both construct allow us to store data in some form or another. Inside it, there are actions and reducers subfolder to manage redux states. Mostly, the actions and reducers will be called in the screen components so they usually named based on screen that use them. Action creators and redux thunk will handle the asynchronous http requests.

**`actions`**\

- it is the plain javaScript object which  is used to carries a payload information from the components to store. It have a type attribute to indicate the type of action performed. it tells us what had happend.
- All the types for the action are stored in the Constant folder.

**`actions/ constant`**\
it contain all the constant value for ACTION TYPE.

**`reducer`**\

- reducer are pure function which are only way to change state in redux. reducer function accept the previous state and action being dispatch, calculate the next state and return the new object
