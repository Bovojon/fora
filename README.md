# Fora - a social calendar

Find a time that works for everyone.

* Create a new calendar
* Join a calendar

### Planning
* Login with phone number or email.
* Mark times that _don’t work_ or times that _do work_.
* Times that work for everyone are displayed.

### Possible next steps
* Build the Home (landing) page.
* Build functionality to add times.
* Improve the UI
  * Show times 7am-11pm.
* Build backend with AWS Lambda.
* Integrate with twilio

### FFTT (Future Featues To Test)
* Design itinerary.

## Structure

Optionally, use functions from `@reduxjs/toolkit` to reduce boilerplate.

1. `src/store`
    * Optionally, create the preloaded store:
        ```
        const initialState = {
            posts: []
        };
        ```

2. `src/actions`
    * Separated into constants and action creators, which take constant and payload and return action objects.

3. `src/reducers`
    * Use `concat()`, `slice()`, or the spread syntax for arrays.
    * Use `Object.assign()` or spread syntax for objects.

4. `src/components`
    * Connect components to the store using `react-redux`.
    * When transforming and computing derived data in `mapStateToProps()`, use 
    [memoized selector functions](https://redux.js.org/recipes/computing-derived-data#creating-a-memoized-selector).

5. `src/middleware`
    * Contains all business logic (e.g. Asynchronous API calls, logging, routing).


## Best Practices

### Fetching Data from API
* When fetching data, it is best to first set the component in a pending state and show a loading spinner. Then, the data can be loaded successfully or the error message can be displayed:
```
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
```