import axios, { Method } from 'axios';
import FormData from 'form-data';

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(
  method: Method, 
  endpoint: string, 
  data: any = null
): Promise<any> {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    return response.data
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
  }
}

export const createBucket =  async (bucket: string) => apiRequest('POST', '/buckets', { bucketName: bucket });
export const listBucket = apiRequest('GET', '/buckets');
export const viewBucket = async (bucket: string) => apiRequest('GET', `/buckets/${bucket}`);
export const listBucketFiles = async (bucket: string) => apiRequest('GET', `/buckets/${bucket}/files`);
export const getFileInfo = async (bucket: string, fileName: string) => apiRequest('GET', `/buckets/${bucket}/files/${fileName}`);
export const downloadFile = async (bucket: string, fileName: string) => apiRequest('GET', `/buckets/${bucket}/files/${fileName}/download`);
// export const uploadFile

async function uploadFile(bucketName: string, filePath: string): Promise<void> {
    const form = new FormData();
    
  
    try {
      const response = await axios.post(
        `${API_BASE_URL}/buckets/${bucketName}/files`,
        form,
        {
          headers: form.getHeaders(),
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response ? error.response.data : error.message);
    }
  }