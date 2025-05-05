// src/components/KPICards.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

function KPICards({ refresh }) {
  const [kpis, setKpis] = useState({
    totalSales: 0,
    totalTransactions: 0,
    uniqueCustomers: 0,
    averageSale: 0,
  });

  useEffect(() => {
    fetchKPIs();
  }, [refresh]);

  const fetchKPIs = async () => {
    const { data, error } = await supabase
      .from('sales_data')
      .select('amount, customer_name');

    if (error) {
      console.error(error);
    } else {
      const totalSales = data.reduce((sum, record) => sum + parseFloat(record.amount), 0);
      const totalTransactions = data.length;
      const uniqueCustomers = new Set(data.map((record) => record.customer_name)).size;
      const averageSale = totalTransactions > 0 ? totalSales / totalTransactions : 0;

      setKpis({
        totalSales,
        totalTransactions,
        uniqueCustomers,
        averageSale,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
      <KPI title="Total Sales" value={`$${kpis.totalSales.toFixed(2)}`} />
      <KPI title="Transactions" value={kpis.totalTransactions} />
      <KPI title="Unique Customers" value={kpis.uniqueCustomers} />
      <KPI title="Avg Sale" value={`$${kpis.averageSale.toFixed(2)}`} />
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-sm font-semibold text-gray-500 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default KPICards;
