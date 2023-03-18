import { Swiper, SwiperSlide } from 'swiper/react'
import { Movie } from '../../types/types'
import { Image, Icon, Button } from 'semantic-ui-react'
import { useRef } from 'react'
import cx from 'classnames'

import 'swiper/swiper.min.css'

import styles from './styles.module.scss'

type Props = {
  items: Movie[]
  className?: string
  onSelect?: (id: string) => void
}

export const Gallery = (props: Props) => {
  const swiperRef = useRef(null)

  return (
    <Swiper
      ref={swiperRef}
      loop
      slidesPerGroupAuto
      spaceBetween={0}
      slidesPerView="auto"
      className={cx(styles.Slider, props.className)}
    >
      <div>
        <Button
          icon
          className={cx(styles.PaginationButton, styles.PaginationButtonPrev)}
          onClick={() => swiperRef.current.swiper.slidePrev(1500)}
        >
          <Icon name="backward" />
        </Button>

        <Button
          icon
          className={cx(styles.PaginationButton, styles.PaginationButtonNext)}
          onClick={() => swiperRef.current.swiper.slideNext(1500)}
        >
          <Icon name="forward" />
        </Button>
      </div>

      {props.items.map((item, index) => (
        <SwiperSlide
          key={index}
          className={styles.Slide}
          onClick={() => props.onSelect(item.id)}
          data-testid={`movie-${item.id}`}
        >
          <Image src={item.images.artwork} size="small" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
