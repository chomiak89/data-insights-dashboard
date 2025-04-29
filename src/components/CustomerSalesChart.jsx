// src/components/CustomerSalesChart.jsx
import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { supabase } from '../services/supabaseClient';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BD4', '#FF6666', '#33CCFF'];

function CustomerSalesChart({ refresh }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, [refresh]);

  const fetchChartData = async () => {
    const { data, error } = await supabase
      .from('sales_data')
      .select('customer_name, amount');

    if (error) {
      console.error(error);
    } else {
      // Aggregate sales by customer
      const groupedData = {};

      data.forEach((item) => {
        const customer = item.customer_name;
        const amount = parseFloat(item.amount);

        if (!groupedData[customer]) {
          groupedData[customer] = 0;
        }
        groupedData[customer] += amount;
      });

      const formatted = Object.entries(groupedData).map(([customer, totalAmount]) => ({
        name: customer,
        value: totalAmount,
      }));

      setChartData(formatted);
    }
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Sales by Customer</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomerSalesChart;
