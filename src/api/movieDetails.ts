import { api } from '../utils/http'

export const fetchMovie = async (id: string) => {
  return api.get(`/v3/movies/${id}`)
}

export const fetchMovieStreaming = async (id: string) => {
  return api.post(`/v3/me/streamings`, {
    audio_language: 'SPA',
    audio_quality: '2.0',
    content_id: id,
    content_type: 'movies',
    device_serial: 'device_serial_1',
    device_stream_video_quality: 'FHD',
    player: 'web:PD-NONE',
    subtitle_language: 'MIS',
    video_type: 'trailer',
  })
}
