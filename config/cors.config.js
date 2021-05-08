const cors = require('cors')

const corsMiddlewate = cors({
    origin : process.env.CORS_ORIGIN|| 'http://localhost:3001'
    
})