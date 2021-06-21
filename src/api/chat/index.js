import http from '@/utils/http'
export default {
  async sendText(data) {
    return await http.post('/api/chat/text', data)
  },
  async sendFile(data) {
    return await http.post('/api/chat/filetext', data)
  },
  async sendImg(data) {
    return await http.post('/api/chat/imgtext', data)
  },
  async list(data) {
    return await http.get('/api/chat/list', { params: data })
  }
}
