import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header';

export const SamparkYuvakInfo = () => {

    const [qMandal, setQMandal] = useState("");

    return (
        <>
            <Header />
            <h4 style={{ marginTop: "22px" }}>SJ: Team A</h4>
            <h6>(75/110)</h6>
            <Box mb={2} mx={1}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search here..."
                    value={qMandal}
                    onChange={(e) => setQMandal(e.target.value)}
                />
            </Box>

            <div style={{ overflowX: "auto", marginTop: "20px", marginInline: "12px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>ID</th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Address</th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>DOB</th>
                            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>1</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>Ravi Patel</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>B14 Tulsidham Society 390011</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>12-04-2000</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>9876543210</td>
                        </tr>

                        <tr>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>2</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>Aryan Vyas</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>A-22 Opp. Jay Ambe School 390011</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>05-06-1997</td>
                            <td style={{ border: "1px solid #ddd", padding: "10px" }}>8765432109</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
