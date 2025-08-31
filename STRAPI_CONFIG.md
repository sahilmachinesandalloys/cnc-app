# Strapi CMS Configuration for SahilCNC Mobile App

## ✅ Configuration Complete!

The Strapi API is now configured with the actual credentials from your web version using Expo's environment variable system:

### Environment Variables Configuration

Environment variables are configured in `app.json` under the `extra` section:

```json
{
  "expo": {
    "extra": {
      "EXPO_PUBLIC_STRAPI_URL": "https://admin.sahilcnc.com/graphql",
      "EXPO_PUBLIC_API_KEY": "642fa036209462c2f72a0f8087f0a81149b54c4ed6842e2368ee365a18aa0449b6b0282bc705887ac161a5217747037b55ce31613dd202be56ae07c70aa3f3325ec8767e6e84795d88f98927df7901c6ba1dbf751ddb1928177c7e219d26866add3a8f223faa07527f2f1338999e6fa40420a3e9044816055760e48e8871ba36",
      "EXPO_PUBLIC_API_SECRET": "cf1158adcc93715bbc6000c40ce3d1ec1ef0908204e7cd542254a2fbbb4fcbcb537a9991abafb2bcf901ad02cbdbdc827c925d84ed38d7138a94bd2c97f8ee334910b7f9dd0f553fd6677cc294d232d3fcd1f1e4e229a491b35a62562f8ec795d572268c4819094ee2c5ba929b3761cd904f12e64be659ee27ae0249fd3d1d82"
    }
  }
}
```

### Accessing Environment Variables

The app uses `Constants.expoConfig.extra` to access these variables:

```typescript
import Constants from 'expo-constants';

const strapiUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_STRAPI_URL;
const apiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_KEY;
const apiSecret = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_SECRET;
```

## Current Configuration

### 1. Strapi GraphQL Endpoint
- **URL**: `https://admin.sahilcnc.com/graphql`
- **Status**: ✅ Configured and ready

### 2. API Authentication
- **API Token**: ✅ Configured for read operations
- **API Secret**: ✅ Configured for form submissions
- **Status**: ✅ Ready for use

## Content Types Available

Based on the web version, these content types are available:

### Collection Types
- `Category` - Product categories
- `Product` - Products with images and details
- `SubCategory` - Sub-categories
- `Faqs` - FAQ items
- `service` - Services
- `blog` - Blog posts
- `HeroSection` - Hero carousel slides
- `Industry` - Industry types

### Single Types
- `Home Page` - Main homepage content
- `ServicePage` - Service page content
- `about-*` - About page sections

## Authentication Headers

The app automatically includes authentication headers:

### For Read Operations
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_TOKEN}`
}
```

### For Form Submissions
```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_SECRET}`
}
```

## Next Steps

1. ✅ **Strapi API configured** with actual credentials in app.json
2. 🔄 **Update GraphQL queries** to match Strapi schema
3. 🔄 **Implement CMS data** in components
4. 🔄 **Test the connection** and ensure everything works

## Testing the Connection

The app is now ready to connect to your Strapi CMS. You can:

1. **Run the app** to test the connection
2. **Check console logs** for any connection errors
3. **Verify data loading** from Strapi

## Troubleshooting

- **Connection errors**: Check if Strapi server is running
- **Authentication errors**: Verify API token permissions
- **Data not loading**: Check GraphQL query structure
- **Form submission errors**: Verify API secret permissions
- **Environment variables not loading**: Restart the development server after changing app.json
