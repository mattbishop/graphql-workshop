import {AxiosResponse} from "axios"
import {createESConnection} from "./connect-es"


export async function deleteStreams(category: String): Promise<void> {
  const sendƒ = createESConnection('http://localhost:2113')

  const response: AxiosResponse = await sendƒ({
    method: "GET",
    url:    `/projection/${category}-list/state`,
  })

  if (response.status === 404) {
    return
  }

  for (const id of Object.keys(response.data)) {
    console.info(`deleting ${id}`)
    await sendƒ({
      method: "DELETE",
      url:    `/streams/${id}`,
    })
  }
}