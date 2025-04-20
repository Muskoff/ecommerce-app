import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Rating,
  Divider,
  Card,
  CardContent,
  Tabs,
  Tab,
} from '@mui/material';
import { ShoppingCart, Favorite, Share } from '@mui/icons-material';

// Mock data - replace with API call
const product = {
  id: 1,
  name: 'Product 1',
  price: 99.99,
  image: 'https://via.placeholder.com/600',
  category: 'Electronics',
  description: 'This is a detailed product description.',
  rating: 4.5,
  reviews: [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Great product! Highly recommended.',
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good quality, fast delivery.',
    },
  ],
  specifications: {
    brand: 'Brand Name',
    model: 'Model XYZ',
    color: 'Black',
    dimensions: '10 x 5 x 2 inches',
    weight: '1.5 lbs',
  },
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto' }}
            />
          </Card>
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviews.length} reviews)
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCart />}
              size="large"
            >
              Add to Cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Favorite />}
              size="large"
            >
              Wishlist
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Share />}
              size="large"
            >
              Share
            </Button>
          </Box>

          {/* Specifications */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="body2" color="text.secondary">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Description" />
          <Tab label="Reviews" />
          <Tab label="Shipping" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {activeTab === 0 && (
            <Typography variant="body1">{product.description}</Typography>
          )}
          {activeTab === 1 && (
            <Box>
              {product.reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1">{review.user}</Typography>
                    <Rating value={review.rating} readOnly size="small" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="body2">{review.comment}</Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
            </Box>
          )}
          {activeTab === 2 && (
            <Typography variant="body1">
              Free shipping on orders over $50. Standard shipping takes 3-5 business days.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail; 