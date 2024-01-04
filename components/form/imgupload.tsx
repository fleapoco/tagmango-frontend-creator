import { LoadingOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import { MdOutlineUpload } from 'react-icons/md';
import { PrimaryButton } from '../common/button';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

interface ImageUploadProps {
  handleUpload?: (fileUrl: string) => void;
  message?: string;
  existImageUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  handleUpload,
  message,
  existImageUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (existImageUrl) setImageUrl(existImageUrl);
  }, [existImageUrl]);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      if (info.file?.response?.error) {
        alert(info.file?.response?.message);
      }

      if (info.file?.response?.fileUrl)
        if (handleUpload) handleUpload(info.file?.response?.fileUrl);

      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div className='over-buttons-wrapper'>
      {loading ? (
        <div className='uploading-state'>
          <LoadingOutlined size={36} />
          <h6>Uploading</h6>
        </div>
      ) : (
        <div className='inner-wrap'>
          <PrimaryButton
            variant='dark'
            text='Upload images or videos'
            icon={<MdOutlineUpload />}
          />
          <p>
            Images Should be horizontal, at least 1280x720, and 72 DPI (dots per
            inch)
          </p>
        </div>
      )}
    </div>
  );

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <div className='image-uploader'>
        <Upload
          name='file'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action={`${process.env.NEXT_PUBLIC_API_BASE_URL}/s3-upload/upload`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          onPreview={onPreview}
        >
          {imageUrl ? (
            <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    </>
  );
};

export default ImageUpload;
