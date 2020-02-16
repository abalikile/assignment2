function ProductTable(props){
  const productRows =props.products.map(product =>
  //id is taken as key value which uniquely identifies a row.
  <ProductRow Key={product.id}  product={product}  />
  );
  return(
	<table className = "bordered-table">
		<thead>
		   <tr>
				<th className="color1">Product Name</th>
				<th className="color2">Price</th>
				<th className="color1">Category</th>
				<th className="color2">Image</th>
			</tr>
		</thead>
		<tbody>
			{productRows}
		</tbody>
	</table>
    );
}
 
function ProductRow (props){
	const product = props.product;
	// Appending the '$' symbol to the price value.
	const display$ = '$'+product.price;

	return(
	<tr>
		<td>{product.productname}</td>
		<td>{display$}</td>
		<td>{product.category}</td>
		<td><a href={product.image} target="_blank">View</a></td>
    </tr>											
    );
}
  
class ProductAdd extends React.Component{
	constructor(){
	super();
	//pre-populating the $ symbol
	this.state = {value:'$'};
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}
	// To read the price value using onChange.
    handleChange(e){
	this.setState({value: e.target.value});
	}
	handleSubmit(e){
	e.preventDefault();
	const form = document.forms.productAdd;

	const product = {
		productname: form.productname.value,  price: form.price.value, category: form.category.value, image: form.image.value,
	}
	this.props.createProduct(product);
	form.productname.value = "", form.price.value = "", form.category.value = "", form.image.value = "";
	}

	render(){
		return(
		<form name="productAdd" onSubmit={this.handleSubmit}>
			<div>
				<div className="fleft">
					<label for="category">Category</label><br />
					<select name="category">
						<option>Shirts</option>
						<option>Jeans</option>
						<option>Jackets</option>
						<option>Sweaters</option>
						<option>Acessories</option>
					</select>
				</div>

				<div className="fleft">
					<label for="price">Price Per Unit</label><br />
					<input type="text"   name="price" value={this.state.value} onChange={this.handleChange} />
				</div>

				<div className="fleft">
					<label   for="productname">ProductName</label><br />
					<input type="text" name="productname" />
				</div>
				 
				<div className="fleft">
					<label  for="image">Image Url</label><br/>
					<input type="url" name="image" />
				</div>


				<div>
					<button className="color3">Add Product</button>
				</div>
			</div>
		</form>
		);
		}
	}



class ProductList extends React.Component{
	constructor(){
	super();
	//assigning an empty array to the products state variable.
	this.state = { products:[]};
	// bind() method helps in passing eventhandlers and other functions as props to the child component.
	this.createProduct = this.createProduct.bind(this);
	}
	//method to add a new product
	createProduct(product){
	product.price = product.price.replace(/[$]/g,''); //stripping the $ symbol before creating array
	product.id = this.state.products.length +1;
	const newProductList = this.state.products.slice();// slice() method will make a copy of array.
	newProductList.push(product);
	//setState() method triggers UI updates
	this.setState({products: newProductList});
	}

	render(){
	return(
	<React.Fragment>
	<h1>My Company Inventory</h1>
	<p>Showing all available products</p>
	<hr/>
	<ProductTable  products={this.state.products}/>
	<p>Add a new product to inventory</p>
	<hr />
	<ProductAdd  createProduct = {this.createProduct}/>{/*passing createProduct() method itself as a part of props.*/}
	</React.Fragment>
	);
	}
}

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));