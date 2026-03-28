const express = require('express');
const app = express();
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;

// ! connect database
connectDB();

app.use(express.json())

app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/post', require('./routes/api/post'))
app.use('/api/profile', require('./routes/api/profile'))

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))

