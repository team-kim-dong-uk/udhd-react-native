import client from './client';

export const uploadWithGoogleDrive = ({googleDriveToken, data}) => {
    return client.post(`upload/google-drive`, {
      googleDriveToken,
      fileIds: data.map(item => item.id)
    })
}

export const checkProgress = ({pollingKey}) => {
  return client.get(`upload/progress/${pollingKey}`);
}