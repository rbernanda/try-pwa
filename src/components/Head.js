import React from 'react'
import { Helmet } from 'react-helmet'

export function Head({ children }) {
  return <Helmet>{children || null}</Helmet>
}
