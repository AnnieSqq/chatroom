import http from '@/utils/http'
export default {
  async register(data) {
    const res = await http.post('/api/user/register', data)
    return res
  },
  async login(data) {
    return await http.post('/api/user/login', data)
  },
  async logout() {
    return await http.get('api/user/logout')
  },
  async update(data) {
    return await http.post('api/user/update', data)
  },
  async heart() {
    return await http.get('api/user/heart')
  }
}
