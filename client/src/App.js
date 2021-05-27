import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
	let cancelToken;
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	const handelChange = async (e) => {
		setSearchQuery(e.target.value);

		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel("Canceling the previous req...");
		}

		cancelToken = axios.CancelToken.source();

		const response = await axios.get(
			`${process.env.REACT_APP_BACKEND}/products/${searchQuery}`,
			{ cancelToken: cancelToken.token }
		);

		setData((data) => [...response.data]);
	};

	return (
		<div className="container">
			<div className="App">
				<div className="search_container">
					<i class="fas fa-search"></i>
					<input
						type="text"
						value={searchQuery}
						onChange={handelChange}
						placeholder="Search..."
					/>
				</div>

				{data && (
					<ul className="list_container">
						{data &&
							data.map((product) => (
								<li key={product._id}>
									<div>
										<b>{product.productName}</b>
									</div>
									<p>
										Available at {product.storeName} at cost of ${product.price}
									</p>
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default App;
