import 'module-alias/register'
import 'dotenv/config'

import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/prisma'

PrismaHelper.connect()
  .then(() => {
    app.listen(5050, () => { console.log(`Server running at http://localhost:${5050 || process.env.API_PORT}`) })
  })
  .catch(console.error)
