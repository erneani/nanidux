type State = any | undefined;

interface Action<T = any> {
  type: T;
}

interface AnyAction extends Action {
  [extraProps: string]: any;
}

type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

/*
  createStore creates a store with methods:
  - getState: returns the current state
  - subscribe: add a listener
  - unsubscribe: remove a listener
  - dispatch: take an action and update the state
*/
type Store = {
  state: State;
  listeners: any[];
  dispatch: (action: Action) => void;
  subscribe: (listener: () => {}) => void;
  getState: () => object;
};

export default function createStore(
  reducer: Reducer,
  initialState: State = undefined
): Store {
  const store: Store = {
    state: initialState,
    listeners: [],
    getState,
    subscribe,
    dispatch,
  };

  function getState() {
    return store.state;
  }

  function subscribe(listener: () => {}) {
    store.listeners.push(listener);
  }

  function dispatch(action: Action) {
    store.state = reducer(store.state, action);
    store.listeners.forEach((listener) => listener());
  }

  return store;
}
