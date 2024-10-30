const API_URL = 'http://localhost:3000/api';

export const analyzeImage = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/analyze-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to analyze image');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
};