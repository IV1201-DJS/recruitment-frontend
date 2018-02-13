// @ts-check
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import store from '../store'
import router from '../router'

export const httpLink = new HttpLink({
  uri: `${process.env.BACKEND}/graphql`
})

export const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    // The user is not logged in -> update the store
    store.commit('updateLoginStatus', false)
    // Save redirect router path
    const path = router.currentRoute.fullPath
    if (path !== '/login' && path !== '/register') {
      store.commit('updateLoginRedirect', path)
    }

    router.push('/login')
  }
})

export const headerLang = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const lang = localStorage.locale
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      accept: 'application/json',
      language: lang
    }
  }
})

export const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // The user is logged in -> update the store
  if (token) store.commit('updateLoginStatus', true)

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})
