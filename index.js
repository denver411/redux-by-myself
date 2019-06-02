'use strict'

function createStore(reducer, initialState) {
    const currentReducer = reducer;
    let state = initialState;
    let subscribers = [];

    return {
        getState: () => {
            return state;
        },
        dispatch: (action) => {
            state = currentReducer(state, action);
            subscribers.forEach(fn => fn());
        },
        subscribe: (fn) => {
            subscribers.push(fn); // добавляем в подписчики
            return () => {
                subscribers = subscribers.filter(f => f !== fn);
            }
        }
    }
}

function nameReducer(state, action) {
    if (action.type === 'CHANGE_NAME') {
        return action.name;
    }
    if (action.type === 'PLUS_NAME') {
        return state + ' ' + action.name;
    }
    return state;
}

function teamReducer(state, action) {
    if (action.type === 'CHANGE_TEAM') {
        return action.team;
    }
    return state;
}

const reducer = (state, action) => {
    return {
        name: nameReducer(state.name, action),
        team: teamReducer(state.team, action)
    }
};

const store = createStore(reducer, {
    name: 'denis',
    team: 'ninja'
});

console.log(store.getState());

const changeName = (name) => ({ type: 'CHANGE_NAME', name });

store.dispatch(changeName('anton'));

console.log(store.getState());

store.dispatch({
    type: 'PLUS_NAME',
    name: 'ololo'
});

console.log(store.getState());