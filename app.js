const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db');
const { sequelize, User, FundraisingCampaign } = require('./models');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Add middleware and routes here



// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware for handling CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Nichangie API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Nichangie application',
    },
    basePath: '/api',
  },
  apis: ['./swagger.yaml'], // Replace with the actual path to your Swagger YAML file
};


// Create Swagger spec
const swaggerSpec = swaggerJSDoc(swaggerOptions);


// Serve Swagger documentation and UI
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// User


// Create a new user
app.post('/api/users', async (req, res) => {
  try {
    const { email, username, firstName, lastName, phone_number } = req.body;
    const newUser = await User.create({
      email,
      username,
      firstName,
      lastName,
      phone_number,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user by ID
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update(updatedUserData);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete user by ID
app.delete('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// FundraisingCampaign



// Create a new fundraising campaign
app.post('/api/campaigns', async (req, res) => {
  try {
    const campaignData = req.body;
    const newCampaign = await FundraisingCampaign.create(campaignData);
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all fundraising campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await FundraisingCampaign.findAll();
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get campaign by ID
app.get('/api/campaigns/:id', async (req, res) => {
  const campaignId = req.params.id;
  try {
    const campaign = await FundraisingCampaign.findByPk(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.json(campaign);
  } catch (error) {
    console.error('Error fetching campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update campaign by ID
app.put('/api/campaigns/:id', async (req, res) => {
  const campaignId = req.params.id;
  const updatedCampaignData = req.body;
  try {
    const campaign = await FundraisingCampaign.findByPk(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    await campaign.update(updatedCampaignData);
    res.json(campaign);
  } catch (error) {
    console.error('Error updating campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete campaign by ID
app.delete('/api/campaigns/:id', async (req, res) => {
  const campaignId = req.params.id;
  try {
    const campaign = await FundraisingCampaign.findByPk(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    await campaign.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting campaign:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.use(express.json());

// Define a route to get all items
app.get('/api/items', (req, res) => {
  // Implement code to fetch data from the PostgreSQL database
});


app.get('/api/items', async (req, res) => {
    try {
      const client = await db.connect(); // Get a client from the pool
  
      // Execute a SQL query
      const result = await client.query('SELECT * FROM items');
  
      // Release the client back to the pool
      client.release();
  
      // Send the query result as a JSON response
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing SQL query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Define a route to create a new item
app.post('/api/items', (req, res) => {
  // Implement code to insert data into the PostgreSQL database
});

// Define a route to update an item
app.put('/api/items/:id', (req, res) => {
  // Implement code to update data in the PostgreSQL database
});

// Define a route to delete an item
app.delete('/api/items/:id', (req, res) => {
  // Implement code to delete data from the PostgreSQL database
});



// Sync the models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database and tables synced');
  }).catch((err) => {
    console.error('Error syncing database:', err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
