const db = require('mongoose')

main().catch(err => console.log(err))

async function main(){// TODO: url
    await db.connect(`${process.env.DB_URL}`)
}

main();

module.exports = db;
