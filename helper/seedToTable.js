const fs = require("fs")
const path = require("path")

function seedToTable(queryInterface, fileName, tableName) {
    const rawData = fs.readFileSync(
        path.join(process.cwd(), "data", fileName)
    )
    const parsedData = JSON.parse(rawData)

    const processedData = parsedData.map((data) => {
        return {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })

    return queryInterface.bulkInsert(tableName, processedData);
}

module.exports = seedToTable