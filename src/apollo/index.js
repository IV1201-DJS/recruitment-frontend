// @ts-check
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { ApolloLink } from 'apollo-link'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import {
  errorLink,
  authLink,
  headerLang,
  httpLink
} from './links'

// Install middleware
Vue.use(VueApollo)

// Create the apollo client
const defaultClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    headerLang,
    httpLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export default new VueApollo({
  defaultClient
})
