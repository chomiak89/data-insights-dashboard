// src/components/SalesChart.jsx
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { supabase } from '../services/supabaseClient';

function SalesChart({ refresh }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [refresh]);

  const fetchChartData = async () => {
    const { data, error } = await supabase
      .from('sales_data')
      .select('amount, purchase_date')
      .order('purchase_date', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      // Format data for the chart
      const formatted = data.map((item) => ({
        amount: Number(item.amount),
        date: new Date(item.purchase_date).toLocaleDateString(),
      }));
      setChartData(formatted);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Sales Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
