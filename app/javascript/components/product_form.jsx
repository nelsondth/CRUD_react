// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>ProductForm React</div> at the bottom
// of the page.

import React from 'react'

class ProductForm extends React.Component {
  constructor(){
    super();
    this.state = {
      title: '',
      description: '',
      author: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let value = e.target.value
    let name = e.target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit(){
    let {AT} = this.props
    let headers = new Headers({
      "Content-Type": "application/json",
      'X-CSRF-Token': AT
    })
    let data = this.state
    fetch("/products", {
      method: "POST",
      headers: headers,
      credentials: 'same-origin',
      body: JSON.stringify({product: data})
    }).then(function (response) {
      console.log(response);
    })
  }

  render () {
    return (
      <div>
        <input placeholder={'author'} value={this.state.author} name={'author'} type="text" onChange={this.handleChange}/>
        <input placeholder={'Titulo'} value={this.state.title} name={'title'} type="text" onChange={this.handleChange}/>
        <input placeholder={'Descripcion'} value={this.state.description} name={'description'} type="text" onChange={this.handleChange}/>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }
}

export default ProductForm
