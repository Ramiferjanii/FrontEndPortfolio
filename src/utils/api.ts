const BASE_URL = import.meta.env.PROD 
  ? 'https://backendportfolio-5m1b.onrender.com'
  : 'http://localhost:10000';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export const testConnection = async () => {
  try {
    const url = `${BASE_URL}/health`;
    console.log('Testing connection to:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Health Check:', data);
    return data;
  } catch (error) {
    console.error('API Connection Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    throw error;
  }
};

export const sendEmail = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const url = `${BASE_URL}/send-email`;
  
  console.log('Making email request:', {
    url,
    baseUrl: BASE_URL,
    method: 'POST',
    headers: defaultHeaders,
    data: formData
  });
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(formData),
      mode: 'cors',
      credentials: 'omit'
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse response as JSON:', responseText);
      throw new Error('Server returned invalid JSON response');
    }

    if (!response.ok) {
      throw new Error(responseData.message || `Server error: ${response.status}`);
    }

    return responseData;
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
}; 