import React from 'react'

const RevenueHistory = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Revenue History</h1>

            {/* Total Revenue */}
            <div className="bg-green-100 p-4 rounded mb-6">
                <h2 className="text-lg font-semibold">Total Revenue</h2>
                {/* <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p> */}
            </div>

            {/* Revenue Line Chart */}
            <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-lg font-semibold mb-2">Earnings Over Time</h3>
                {/* <Line data={lineData} /> */}
            </div>

            {/* Transaction History Table */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Tuition Title</th>
                                <th className="py-2 px-4 border">Student</th>
                                <th className="py-2 px-4 border">Amount</th>
                                <th className="py-2 px-4 border">Status</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {transactions.map((t) => (
                                <tr key={t._id} className="text-center border-b hover:bg-gray-50">
                                    <td className="py-2 px-4">{new Date(t.date).toLocaleString()}</td>
                                    <td className="py-2 px-4">{t.tuitionTitle}</td>
                                    <td className="py-2 px-4">{t.studentName}</td>
                                    <td className="py-2 px-4">${t.amount.toFixed(2)}</td>
                                    <td className="py-2 px-4 text-green-600 font-semibold">{t.status}</td>
                                </tr>
                            ))}
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default RevenueHistory