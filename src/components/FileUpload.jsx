// src/components/FileUpload.jsx
import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import Papa from 'papaparse';

function FileUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results) {
        console.log(results.data); // Preview parsed data

        setUploading(true);
        try {
          const { data, error } = await supabase
            .from('sales_data') // your table name
            .insert(results.data);

          if (error) {
            console.error(error);
            setMessage('Error uploading data.');
          } else {
            console.log(data);
            setMessage('Data uploaded successfully!');
            if (onUploadComplete) {
                onUploadComplete();
            }
          }
        } catch (err) {
          console.error(err);
          setMessage('Unexpected error.');
        }
        setUploading(false);
      },
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {uploading && <p>Uploading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
