# AI Chatbot Integration Guide

## Overview
The AI Chatbot component has been integrated into both the Driver and Admin interfaces. It's designed to be easily connected to your ML model API.

## Features
- **Context-Aware**: Different behavior for Driver vs Admin users
- **Customizable**: Adjust colors, position, and behavior
- **API-Ready**: Built-in callback function to connect to your ML model
- **Responsive**: Works on mobile and desktop
- **Modern UI**: Beautiful gradient design with smooth animations

## Integration with ML Model

### Basic Integration

To connect the chatbot to your ML model API, use the `onSendMessage` prop:

```typescript
<AIChatbot 
  context="driver"
  position="bottom-right"
  primaryColor="#3b82f6"
  onSendMessage={async (userMessage: string) => {
    // Call your ML model API here
    const response = await fetch('YOUR_ML_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
        message: userMessage,
        context: 'driver', // or 'admin'
        sessionId: getUserSessionId(), // optional
      })
    });
    
    const data = await response.json();
    return data.reply; // Return the bot's response as a string
  }}
/>
```

### Example with OpenAI API

```typescript
const handleSendMessage = async (userMessage: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful logistics assistant for delivery drivers. Help them with navigation, delivery instructions, and customer service.'
        },
        {
          role: 'user',
          content: userMessage
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
};

<AIChatbot 
  context="driver"
  onSendMessage={handleSendMessage}
/>
```

### Example with Custom ML Model

```typescript
const handleSendMessage = async (userMessage: string) => {
  // Example with a custom ML model endpoint
  const response = await fetch('https://your-model-api.com/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': 'YOUR_API_KEY'
    },
    body: JSON.stringify({
      input: userMessage,
      temperature: 0.7,
      max_tokens: 150,
      context_type: 'logistics_driver'
    })
  });

  const data = await response.json();
  return data.generated_text;
};
```

### Adding Context Data

You can enhance the ML model's responses by including delivery data:

```typescript
import { mockDeliveries } from '../../data/mockData';

const handleSendMessage = async (userMessage: string) => {
  // Get current delivery data
  const currentDeliveries = mockDeliveries.filter(
    d => d.status === 'pending' || d.status === 'out-for-delivery'
  );

  const response = await fetch('YOUR_ML_API_ENDPOINT', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: userMessage,
      context: {
        userType: 'driver',
        activeDeliveries: currentDeliveries.length,
        deliveryData: currentDeliveries.map(d => ({
          id: d.id,
          customer: d.customerName,
          address: d.address,
          status: d.status
        }))
      }
    })
  });

  const data = await response.json();
  return data.reply;
};
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSendMessage` | `(message: string) => Promise<string>` | Mock function | Callback to send messages to your ML model |
| `context` | `'driver' \| 'admin'` | `'driver'` | User context for different chatbot behaviors |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Position of the chatbot button |
| `primaryColor` | `string` | `'#3b82f6'` | Primary color for the chatbot UI |

## Current Locations

The chatbot is currently integrated in:

### Driver Pages:
- `/src/app/pages/driver/DriverDashboard.tsx`
- `/src/app/pages/driver/DeliveryList.tsx`

### Admin Pages:
- `/src/app/pages/admin/AdminDashboard.tsx`
- `/src/app/pages/admin/ShipmentsTable.tsx`
- `/src/app/pages/admin/DriverManagement.tsx`

## Recommended ML Models

### For Driver Context:
- **Navigation assistance**: Google Maps API, Mapbox
- **Customer service**: GPT-4, Claude
- **Route optimization**: Custom logistics model
- **Delivery predictions**: TensorFlow.js model

### For Admin Context:
- **Analytics**: Custom analytics model
- **Performance insights**: Business intelligence model
- **Predictive analytics**: Time-series forecasting model
- **Natural language queries**: GPT-4, Claude for data analysis

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch blocks
2. **Loading States**: The chatbot shows a loading indicator automatically
3. **Rate Limiting**: Implement rate limiting on your API endpoint
4. **Caching**: Consider caching frequent queries
5. **Context Persistence**: Store conversation history in localStorage or database
6. **Security**: Never expose API keys in frontend code - use environment variables and proxy through your backend

## Security Considerations

⚠️ **Important**: API keys should NEVER be stored in frontend code.

### Recommended Approach:
1. Create a backend endpoint that proxies requests to your ML model
2. Authenticate users before allowing chatbot access
3. Implement rate limiting to prevent abuse
4. Sanitize user input before sending to ML model
5. Use HTTPS for all API communications

Example backend proxy:

```typescript
// backend/api/chatbot.ts
export async function POST(req: Request) {
  // Verify user authentication
  const session = await getSession(req);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { message, context } = await req.json();

  // Call ML model with server-side API key
  const response = await fetch(process.env.ML_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.ML_API_KEY}`
    },
    body: JSON.stringify({ message, context })
  });

  const data = await response.json();
  return Response.json(data);
}

// frontend
const handleSendMessage = async (message: string) => {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, context: 'driver' })
  });
  const data = await response.json();
  return data.reply;
};
```

## Testing Without ML Model

The chatbot includes mock responses for testing. Simply use it without the `onSendMessage` prop:

```typescript
<AIChatbot 
  context="driver"
  position="bottom-right"
  primaryColor="#3b82f6"
/>
```

The mock responses are context-aware and will demonstrate the chatbot functionality.

## Customization Examples

### Custom Colors:
```typescript
// Blue theme for drivers
<AIChatbot primaryColor="#3b82f6" context="driver" />

// Purple theme for admins
<AIChatbot primaryColor="#8b5cf6" context="admin" />

// Teal theme
<AIChatbot primaryColor="#14b8a6" context="driver" />
```

### Left Position (for RTL layouts):
```typescript
<AIChatbot position="bottom-left" />
```

## Support

For questions or issues with the chatbot component, check the component source at:
`/src/app/components/AIChatbot.tsx`
