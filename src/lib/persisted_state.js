import merge from 'lodash.merge'
import localforage from 'localforage'
import { each, get, set, cloneDeep } from 'lodash'

let loaded = false

const defaultReducer = (state, paths) => (
  paths.length === 0 ? state : paths.reduce((substate, path) => {
    set(substate, path, get(state, path))
    return substate
  }, {})
)

const saveImmedeatelyActions = [
  'markNotificationsAsSeen',
  'clearCurrentUser',
  'setCurrentUser',
  'setHighlight',
  'setOption',
  'setClientData',
  'setToken',
  'clearToken',
  'emojiUsed',
]

const defaultStorage = (() => {
  return localforage
})()

export default function createPersistedState ({
  key = 'vuex-lz',
  paths = [],
  getState = (key, storage) => {
    let value = storage.getItem(key)
    return value
  },
  setState = (key, state, storage) => {
    if (!loaded) {
      console.log('waiting for old state to be loaded...')
      return Promise.resolve()
    } else {
      return storage.setItem(key, state)
    }
  },
  reducer = defaultReducer,
  storage = defaultStorage,
  subscriber = store => handler => store.subscribe(handler)
} = {}) {
  return getState(key, storage).then((savedState) => {
    return store => {
      try {
        if (savedState !== null && typeof savedState === 'object') {
          // build user cache
          const usersState = savedState.users || {}
          usersState.usersObject = {}
          const users = usersState.users || []
          each(users, (user) => { usersState.usersObject[user.id] = user })
          savedState.users = usersState

          store.replaceState(
            merge({}, store.state, savedState)
          )
        }
        loaded = true
      } catch (e) {
        console.error("Couldn't load state")
        console.error(e)
        loaded = true
      }
      subscriber(store)((mutation, state) => {
        try {
          if (saveImmedeatelyActions.includes(mutation.type)) {
            setState(key, reducer(cloneDeep(state), paths), storage)
              .then(success => {
                if (typeof success !== 'undefined') {
                  if (mutation.type === 'setOption' || mutation.type === 'setCurrentUser') {
                    store.dispatch('settingsSaved', { success })
                  }
                }
              }, error => {
                if (mutation.type === 'setOption' || mutation.type === 'setCurrentUser') {
                  store.dispatch('settingsSaved', { error })
                }
              })
          }
        } catch (e) {
          console.error("Couldn't persist state:")
          console.error(e)
        }
      })
    }
  })
}
