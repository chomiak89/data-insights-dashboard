// src/components/ProductSalesChart.jsx
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from '../services/supabaseClient';

function ProductSalesChart({ refresh }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [refresh]);

  const fetchChartData = async () => {
    const { data, error } = await supabase
      .from('sales_data')
      .select('product_name, amount');

    if (error) {
      console.error(error);
    } else {
      // Aggregate sales by product
      const groupedData = {};

      data.forEach((item) => {
        const product = item.product_name;
        const amount = parseFloat(item.amount);

        if (!groupedData[product]) {
          groupedData[product] = 0;
        }
        groupedData[product] += amount;
      });

      const formatted = Object.entries(groupedData).map(([product, totalAmount]) => ({
        product,
        totalAmount,
      }));

      setChartData(formatted);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Sales by Product</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalAmount" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProductSalesChart;
