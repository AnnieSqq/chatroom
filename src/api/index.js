import http from '@/utils/http'
export async function testHttp() {
  const res = await http.post('/api/test', { msg: '我来访问了' })
  return res
}
