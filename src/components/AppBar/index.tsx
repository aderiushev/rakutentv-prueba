import { Menu } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '../../assets/logo.svg'

import styles from './styles.module.scss'

export const AppBar = () => {
  const navigate = useNavigate()

  return (
    <Menu className={styles.AppBar} data-testid="app-bar">
      <Menu.Item
        className={styles.LogoItem}
        onClick={() => {
          navigate('/')
        }}
      >
        <LogoIcon />
      </Menu.Item>
      <Menu.Item name="home" onClick={() => {}}>
        Inicio
      </Menu.Item>
      <Menu.Item name="store" onClick={() => {}}>
        Tienda
      </Menu.Item>
      <Menu.Item name="free" onClick={() => {}}>
        Gratis
      </Menu.Item>
      <Menu.Item name="tv" onClick={() => {}}>
        Canales TV
      </Menu.Item>
      <Menu.Item name="subscriptions" onClick={() => {}}>
        Suscripciones
      </Menu.Item>
    </Menu>
  )
}
