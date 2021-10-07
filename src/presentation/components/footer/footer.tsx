import React, { memo } from 'react'
import Styles from './footer-styles.scss'

const LoginFooter: React.FC = () => {
  return <footer className={Styles.footer} />
}

export default memo(LoginFooter)
