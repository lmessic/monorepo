function CreateStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  function subscribe(handler) {
    listeners.push(handler);
  }

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);

    listeners.forEach((cb) => {
      cb();
    })
  }

  return {
    dispatch,
    subscribe,
  }
}

function reducer(state, action) {
  switch(action.type) {
    case 'add':
      return {...state, count: state.count++};
    default:
      throw Error('unsupported type');
  }
}

const store = CreateStore(reducer, {count: 1});