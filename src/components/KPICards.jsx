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
    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
      <KPI title="Total Sales" value={`$${kpis.totalSales.toFixed(2)}`} />
      <KPI title="Transactions" value={kpis.totalTransactions} />
      <KPI title="Unique Customers" value={kpis.uniqueCustomers} />
      <KPI title="Avg Sale" value={`$${kpis.averageSale.toFixed(2)}`} />
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div style={{
      flex: 1,
      background: '#f7f7f7',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ marginBottom: '10px', color: '#555' }}>{title}</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}

export default KPICards;
