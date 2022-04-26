import React, { ReactElement } from 'react'
import { useUserPreferences } from '../../../providers/UserPreferences'
import Input from '../../atoms/Input'

export default function Debug(): ReactElement {
  const { debug, setDebug } = useUserPreferences()

  return <li></li>
}
