import React from 'react';
import request from '@/api/request';

export const uploadMultiImage = async (localImages = []) => {
  const token = await React.$Store.getData('auth_token');
  const formData = new FormData();

  localImages.forEach(file => {
    console.log(file);
    formData.append('multipartFile', file);
  });

  const res = await request({
    url: `/api/v1/assets?token=${token}`,
    method: 'POST',
    data: formData,
  });

  console.log(res);
  return [];
};
