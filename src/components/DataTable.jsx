// src/components/DataTable.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

function DataTable({ refresh }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [refresh]);

  const fetchRecords = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sales_data')  // your table name
      .select('*')
      .order('purchase_date', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setRecords(data);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Sales Records</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: '10px' }}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Amount</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.customer_name}</td>
                <td>{record.product_name}</td>
                <td>${parseFloat(record.amount).toFixed(2)}</td>
                <td>{new Date(record.purchase_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;
