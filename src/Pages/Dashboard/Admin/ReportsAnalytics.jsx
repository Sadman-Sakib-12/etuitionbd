import React from 'react'

const ReportsAnalytics = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

            {/* Total Earnings */}
            <div className="bg-green-100 p-4 rounded mb-6">
                <h2 className="text-lg font-semibold">Total Earnings</h2>
                {/* <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p> */}
            </div>

            {/* Charts */}
            {/* <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Earnings Over Time</h3>
                    <Line data={lineData} />
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Earnings by Payment Type</h3>
                    <Pie data={pieData} />
                </div>
            </div> */}

            {/* Transaction History Table */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">User</th>
                                <th className="py-2 px-4 border">Type</th>
                                <th className="py-2 px-4 border">Amount</th>
                                <th className="py-2 px-4 border">Status</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {transactions.map((t) => (
                                <tr key={t._id} className="text-center border-b">
                                    <td className="py-2 px-4">{new Date(t.date).toLocaleString()}</td>
                                    <td className="py-2 px-4">{t.userName}</td>
                                    <td className="py-2 px-4">{t.type}</td>
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

export default ReportsAnalytics