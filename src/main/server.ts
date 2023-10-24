import 'module-alias/register'
import 'dotenv/config'

import app from '@/main/config/app'
import { PrismaHelper } from '@/infra/db/prisma'

PrismaHelper.connect()
  .then(() => {
    app.listen(process.env.API_PORT || 5050, () => { console.log(`Server running at http://localhost:${process.env.API_PORT || 5050}`) })
  })
  .catch(console.error)
