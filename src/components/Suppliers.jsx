import React, { useState } from 'react'
import { suppliersData } from '../data/suppliersData'

function Suppliers() {
    const [suppliers, setSuppliers] = useState(suppliersData);
    const [sortOrder, setSortOrder] = useState('asc'); // Initial sorting order
    const [sortedColumn, setSortedColumn] = useState(null);

    const handleDelete = (id) => {

        var result = window.confirm("Want to delete?");
        if (result) {
            var filteredSuppliers = suppliers.filter(q => q.id !== id);
            setSuppliers([...filteredSuppliers])
        }
    }

    // Dynamic sort function that works for all properties
    const handleSort = (column) => {
        // Determine the sorting order (asc or desc)
        const newSortOrder = sortedColumn === column ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        // Sort the suppliers array based on the selected column
        const sortedSuppliers = [...suppliers].sort((a, b) => {
            if (newSortOrder === 'asc') {
                return a[column] < b[column] ? -1 : 1;
            } else {
                return b[column] < a[column] ? -1 : 1;
            }
        });

        // Update the state with the sorted data and sorting information
        setSuppliers(sortedSuppliers);
        setSortOrder(newSortOrder);
        setSortedColumn(column);
    }

    const renderArrow = (column) => {
        if (sortedColumn === column) {
            return sortOrder === 'asc' ? '▲' : '▼';
        }
        return '';
    }

    return (<>
        <h1>Length: {suppliers.length}</h1>
        <table className='w3-table w3-striped'>
            <thead>
                <tr>
                    <th className="sortable-column" onClick={() => handleSort('companyName')}>Company Name {renderArrow('companyName')}</th>
                    <th>Contact Name</th>
                    <th>Contact Title</th>
                    <th>Country</th>
                    <th>Phone</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.companyName}</td>
                    <td>{supplier.contactName}</td>
                    <td>{supplier.contactTitle}</td>
                    <td>{supplier.address.country}</td>
                    <td>{supplier.address.phone}</td>
                    <td><button style={{color:"red"}} onClick={()=>handleDelete(supplier.id)}>Delete</button></td>
                  </tr>
                ))}
            </tbody>
        </table>
    </>
    )
}

export default Suppliers


