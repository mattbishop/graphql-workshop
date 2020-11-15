import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import {SendToESƒ} from "./index"


export function createESConnection(url: string): SendToESƒ {
  const client = axios.create({
    auth: {
      username: "admin",
      password: "changeit"
    },
    baseURL: url,
    timeout: 360_000, // 5 minutes
    timeoutErrorMessage: "Event Store server timed out!",
    validateStatus: (status) => (status >= 200 && status < 300)
      || status === 400
      || status === 401
      || status === 404
      || status === 409
  })

  return (request) => _send(client, request)
}

async function _send(client:  AxiosInstance,
                     request: AxiosRequestConfig): Promise<AxiosResponse> {
  // console.log(request)
  return await client.request(request)
}
