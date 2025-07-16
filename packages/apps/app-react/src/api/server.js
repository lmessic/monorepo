import instance from "./request"

const COMMON_URL = "http://192.168.1.4:3010";

export function getMockList(url, opts) {
  return instance({
    url: `${COMMON_URL}/${url}?startNum=${opts.startNum}&pageSize=${opts.pageSize}`,
  })
}