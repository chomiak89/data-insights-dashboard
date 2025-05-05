// src/components/FileUpload.jsx
import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Papa from 'papaparse';

function FileUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setSuccess('');

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        const { data } = results;

        // Clean data (remove empty rows)
        const cleanData = data.filter((row) => row.amount && row.customer_name);

        const { error } = await supabase.from('sales_data').insert(cleanData);

        if (error) {
          setError('Upload failed: ' + error.message);
        } else {
          setSuccess('Upload successful!');
          onUploadComplete();
        }

        setUploading(false);
      },
      error: (err) => {
        setError('Error parsing CSV: ' + err.message);
        setUploading(false);
      },
    });
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Upload Sales CSV</h2>
      <input type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
        disabled={uploading}
      />
      {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
    </div>
  );
}

export default FileUpload;
