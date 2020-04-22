import { useSelector } from 'react-redux';

export default function useUploads() {
  const uploads = useSelector(state => state.uploads);

  function getUploadById(id) {
    return uploads.find(u => u.id === id);
  }

  return {
    uploads,
    getUploadById
  };
}
