import React from "react";
import ReactDOM from "react-dom";

import "./App.css";

import StripeCheckout from "react-stripe-checkout";
import { db } from "./firebase";

import "react-toastify/dist/ReactToastify.css";

function App() {
	const [product] = React.useState({
		name: "Tesla Beast",
		price: 100589,
		description: "Cool car",
	});

	async function handleToken(token, addresses) {
		// console.log("token", token);
		// console.log("addresses", addresses);
		if (token.livemode === false) {
			console.log("Aman Singh");
			
			await db.collection("stripe_payment").add({
				id: token.id,
				paymentAt: token.created,
				email: token.email,
				paymentDetails: token.card,
				userName: addresses.billing_name
			});
			alert("Payment Successfull and data get stored in firebase!!");
		} else {
			alert("Something went wrong");
		}
	}
	return (
		<div className="container">
			<div className="product">
				<h1>{product.name}</h1>
				<h3>On Sale · ${product.price}</h3>
			</div>
			<StripeCheckout
				stripeKey="pk_test_51IVth1KTvdb7gF3hLlkuPXKwOZ1CvSY8l5RhPpXDLG8oXQh0oLPw1VJCrFKzIkSVa6bcUapi0rxNFJSivpunCUXJ00zjMbn7UV"
				token={handleToken}
				amount={product.price * 100}
				name="Tesla Beast"
				billingAddress
				shippingAddress
			/>
		</div>
	);
}

export default App;
