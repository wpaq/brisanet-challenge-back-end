import 'module-alias/register'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { PrismaHelper } from '@/infra/db/prisma'

PrismaHelper.connect('prod')
  .then(() => {
    app.listen(5050, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
