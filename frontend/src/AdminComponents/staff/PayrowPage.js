import React from 'react'
import ListTable from '../shared/ListTable';
import Payrow from './SearchPayrow'

function PayrowPage() {
   const data = [
       {id: "123", name: "Rudo Mapfumba", role: "Teacher", bank: "Bank of China", accNum: "21294040392043205050", salary: "2500", status: "Paid"},
       {id: "124", name: "Rudo Mapfumba", role: "Teacher", bank: "Bank of China", accNum: "21294040392043205050", salary: "2500", status: "Paid"},
       {id: "125", name: "Rudo Mapfumba", role: "Teacher", bank: "Bank of China", accNum: "21294040392043205050", salary: "2500", status: "Paid"},
       {id: "126", name: "Rudo Mapfumba", role: "Teacher", bank: "Bank of China", accNum: "21294040392043205050", salary: "2500", status: "Paid"},
       {id: "127", name: "Rudo Mapfumba", role: "Teacher", bank: "Bank of China", accNum: "21294040392043205050", salary: "2500", status: "Paid"}
   ];
   const tableHeadings = [
       {id: "id", name: "Staff ID"},
       {id: "name", name: "Name"},
       {id: "role", name: "Staff Type"},
       {id: "bank", name: "Bank"},
       {id: "accNum", name: "Account Number"},
       {id: "salary", name: "Salary"},
       {id: "status", name: "Status"},

   ];

    return (
        <div>
            <Payrow/>
            <ListTable data={data} tableHeader={ tableHeadings} tableCell={tableHeadings} />
        </div>
    )
}

export default PayrowPage
