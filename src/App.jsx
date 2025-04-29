import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from './services/supabaseClient'
import FileUpload from './components/FileUpload'
import DataTable from './components/DataTable'
import SalesChart from './components/SalesChart'
import ProductSalesChart from './components/ProductSalesChart'
import CustomerSalesChart from './components/CustomerSalesChart'

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let { data, error } = await supabase.from('sales_data').select('*');
  //     console.log(data, error);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div style={{ padding: '20px' }}>
        <h1>Data Insights Dashboard</h1>
        <FileUpload onUploadComplete={handleRefresh} />
        <DataTable refresh={refresh} />
        <SalesChart refresh={refresh} />
        <ProductSalesChart refresh={refresh} />
        <CustomerSalesChart refresh={refresh} />
      </div>
    </>
  )
}

export default App
