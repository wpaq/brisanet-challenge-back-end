import 'module-alias/register'
import env from '@/main/config/env'
import express from 'express'

const app = express()
app.listen(5050, () => { console.log(`Server running at http://localhost:${env.port}`) })
