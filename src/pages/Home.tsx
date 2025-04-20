import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Product 1',
    price: 99.99,
    image: 'https://via.placeholder.com/300',
    description: 'This is a featured product description.',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 149.99,
    image: 'https://via.placeholder.com/300',
    description: 'Another featured product description.',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 199.99,
    image: 'https://via.placeholder.com/300',
    description: 'Yet another featured product description.',
  },
];

const categories = [
  {
    id: 1,
    name: 'Electronics',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 2,
    name: 'Clothing',
    image: 'https://via.placeholder.com/300',
  },
  {
    id: 3,
    name: 'Books',
    image: 'https://via.placeholder.com/300',
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our E-Commerce Store
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Discover amazing products at great prices
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={RouterLink}
          to="/products"
          sx={{ mt: 2 }}
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Products */}
      <Typography variant="h4" component="h2" gutterBottom>
        Featured Products
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {featuredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={`/products/${product.id}`}
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Categories */}
      <Typography variant="h4" component="h2" gutterBottom>
        Shop by Category
      </Typography>
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={12} sm={6} md={4}>
            <Card
              component={RouterLink}
              to={`/products?category=${category.id}`}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 