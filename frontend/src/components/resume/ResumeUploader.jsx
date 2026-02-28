/**
 * Resume file uploader with drag-and-drop.
 */

import { useState, useRef } from 'react';
import API from '../../api/axios';

export default function ResumeUploader({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data } = await API.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadComplete?.(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
        ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}`}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {uploading ? (
        <p className="text-primary-600 font-medium">Uploading & analyzing...</p>
      ) : (
        <>
          <p className="text-4xl mb-3">📄</p>
          <p className="font-semibold text-gray-700">Drop your resume here or click to browse</p>
          <p className="text-sm text-gray-400 mt-1">PDF files only</p>
        </>
      )}

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
}
