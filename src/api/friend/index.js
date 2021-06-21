import http from '@/utils/http'
export default {
  async search(data) {
    return await http.get('/api/friend/search', { params: data })
  },
  async add(data) {
    return await http.post('/api/friend/add', data)
  },
  async delete(data) {
    return await http.post('/api/friend/delete', data)
  },
  async list() {
    return await http.get('/api/friend/list')
  }
}
