import { Outlet } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { AppBar } from '../../components/AppBar'

import styles from './styles.module.scss'

export const Index = () => {
  return (
    <Container fluid className={styles.Page}>
      <AppBar />

      <Outlet />
    </Container>
  )
}
