import React, { useState } from 'react'
import useTokensend from 'hook/useTokensend';

const Tokensendtransfer = () => {

    const [amountuser, setAmountuser] = useState("");
    const [toAddress, setToAddress] = useState("");

    const { handleSendToken } = useTokensend()



    const handlePayment = () => {
        if (!amountuser && !toAddress) {
            alert('Please fill in both address and amount');
            return
        }
        try {

            const send = handleSendToken(toAddress, amountuser)


            console.log(send)
        } catch (error) {
            console.log(error)

        }

    }

    return (
        <>
            <div>
                <div >
                    <h2>Transfer Sepolia</h2>
                    <div >
                        <input
                            type="text"
                            placeholder="Recipient Address"
                            value={toAddress}
                            onChange={(e) => setToAddress(e.target.value)}
                            style={{ width: '500px', height: '20px', fontSize: '16px', padding: '8px', color: 'black' }}
                            className='border-4'
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Amount"
                            value={amountuser}
                            onChange={(e) => setAmountuser(e.target.value)}
                            style={{ width: '200px', height: '20px', fontSize: '16px', padding: '8px', marginTop: "10px", color: 'black', }}
                            className='border-4'
                        />
                    </div>
                </div>
                <button
                    style={{
                        color: 'black'
                    }}
                    className='text-black'
                    onClick={handlePayment}
                >
                    Pay Now
                    {/* {started ? "Confirming..." : "Pay Now"} */}
                </button>
            </div>
        </>
    )
}

export default Tokensendtransfer