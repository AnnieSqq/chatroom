import http from '@/utils/http'
import user from './user'
import friend from './friend'
import chat from './chat'
// 测试
export async function testHttp() {
  const res = await http.post('/api/test', { msg: '我来访问了' })
  return res
}
export default {
  user,
  friend,
  chat
}
