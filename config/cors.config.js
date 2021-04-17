const cors = require('cors')

const corsMiddlewate = cors({
    origin : process.env.CORS_ORIGIN|| 'HTTP://LOCALHOST:3000'
    
})