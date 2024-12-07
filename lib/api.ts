import axios, { Method } from 'axios';
import * as fs from 'fs';
import FormData from 'form-data';

const API_BASE_URL = 'http://localhost:8000';

async function apiRequest(
  method: Method, 
  endpoint: string, 
  data: any = null
): Promise<void> {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    console.log(response.data);
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
  }
}

export const createBucket = async () => (bucket: string) => apiRequest('POST', '/buckets', { bucketName: bucket });
export const listBucket = async () => apiRequest('GET', '/buckets');
export const viewBucket = async (bucket: string) => apiRequest('GET', `/buckets/${bucket}`);
export const listBucketFiles = async (bucket: string) => apiRequest('GET', '/buckets/myBucket/files');
export const getFileInfo = async (bucket: string, fileName: string) => apiRequest('GET', `/buckets/${bucket}/files/${fileName}`);

async function uploadFile(bucketName: string, filePath: string): Promise<void> {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
  
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