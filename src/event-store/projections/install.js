const fs = require("fs")
const http = require("http")
const path = require("path")

const projectionsDir = "src/get-event-store/projections/"

function processFile(file) {
  const name = file.substr(0, file.indexOf("."))
  const filePath = path.join(projectionsDir, file)
  fs.readFile(filePath, "utf8", (err, data) => {
    const request = http.request({
      host: "localhost",
      port: 2113,
      auth: "admin:changeit",
      method: "POST",
      path: `/projections/continuous?name=${name}&type=js&enabled=true&emit=false`,
      headers: {
        "content-type": "application/javascript",
        "content-length": data.length
      }
    }, function (res) {
      console.log(name, res.statusCode)
    })
    request.write(data)
    request.end()
  })
}

fs.readdirSync(projectionsDir)
  .filter((file) => file !== "install.js")
  .forEach(processFile)
