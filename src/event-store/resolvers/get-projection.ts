import {AxiosResponse} from "axios"
import {SendToESƒ} from "../index"


export async function listProjection<T>(sendƒ:  SendToESƒ,
                                        name:   string): Promise<T[]> {
  const {data, status, statusText}: AxiosResponse = await sendƒ({
    method: "GET",
    url: `/projection/${name}-list/state`,
  })

  if (status === 200) {
    return Object.values<T>(data || {})
  }
  throw new Error(statusText)
}

export async function detailsProjection(sendƒ:  SendToESƒ,
                                        name:   string,
                                        key:    string): Promise<any> {
  const {data, status, statusText}: AxiosResponse = await sendƒ({
    method: "GET",
    url: `/projection/${name}-details/state?partition=${name}-${key}`,
  })

  if (status === 200 && typeof data === "object") {
    return data
  }
  throw new Error(statusText)
}
