
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const adminUserRoutes = require('./src/routes/adminUserRoutes');
const productRoutes = require('./src/routes/productRoutes');
const productRequestRoutes = require('./src/routes/productRequestRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const shippingRoutes = require('./src/routes/shippingRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const containerRoutes = require('./src/routes/containerRoutes');
const spaceQuotaRoutes = require('./src/routes/spaceQuotaRoutes');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/user', userRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api', productRoutes);
app.use('/api', productRequestRoutes);
app.use('/api', orderRoutes);
app.use('/api', shippingRoutes);
app.use('/api', categoryRoutes);
app.use('/api', containerRoutes);
app.use('/api', spaceQuotaRoutes);
app.use('/upload/images', express.static('/tmp'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
