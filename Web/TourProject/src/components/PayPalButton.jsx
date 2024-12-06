import React, { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
    const [paypalReady, setPaypalReady] = useState(false);

    useEffect(() => {
        // Đảm bảo PayPal script được tải trước khi render button
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W`;
        script.async = true;
        script.onload = () => setPaypalReady(true);
        document.body.appendChild(script);
    }, []);

    if (!paypalReady) {
        return <div>Loading PayPal...</div>;
    }

    return (
        <PayPalScriptProvider options={{ "client-id": "AZUX4JxpgUbsBMZlbHYkrocFL8WrbXkSpU5Kt0VLGboGAkr7w-JMbo5PqVi-LelRRnWrOshQUoWXTO_W" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount, 
                                    currency_code: "USD",
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onSuccess(details); // Callback khi thanh toán thành công
                    });
                }}
                onError={(err) => {
                    console.error("Payment error:", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
