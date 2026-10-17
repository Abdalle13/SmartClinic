import React, { useState } from 'react';
import { Upload, Loader2, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';
import api from '../../utils/api';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const ImageUpload = ({ label = 'Image', value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [showUrlField, setShowUrlField] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const base64 = await fileToBase64(file);
      const { data } = await api.post('/upload/file', { file: base64, fileName: file.name });
      onChange(data.url);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. You can paste an image URL instead below.');
      setShowUrlField(true);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlField(false);
      setError('');
    }
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      
      <div className="flex items-start gap-4 p-3 bg-gray-50/70 rounded-xl border border-gray-200">
        <div className="w-20 h-20 rounded-xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0 shadow-sm relative group">
          {value ? (
            <>
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/100x100?text=No+Image';
                }}
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <ImageIcon size={24} className="text-gray-300" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm transition-all">
              {uploading ? <Loader2 size={13} className="animate-spin text-emerald-600" /> : <Upload size={13} />}
              {uploading ? 'Uploading...' : value ? 'Change File' : 'Upload File'}
              <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
            </label>

            <button
              type="button"
              onClick={() => setShowUrlField(!showUrlField)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm transition-all"
            >
              <LinkIcon size={12} />
              {showUrlField ? 'Hide URL' : 'Paste URL'}
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-xs text-red-500 hover:text-red-700 px-2 py-1 font-medium transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          {showUrlField && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/doctor-photo.jpg"
                className="input-field text-xs py-1.5 flex-1"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleApplyUrl(); } }}
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          )}

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          <p className="text-[11px] text-gray-400">Supported: JPG, PNG, WebP or direct image web links</p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
