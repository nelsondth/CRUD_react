
// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>ProductForm React</div> at the bottom
// of the page.

import React from 'react'
import style from './product_form.scss'

class ProductForm extends React.Component {
  constructor(){
    super();
    this.state = {
      name: '',
      description: '',
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validate = this.validate.bind(this)
    this.productTemplate = this.productTemplate.bind(this)
    this.clearState = this.clearState.bind(this)
  }

  handleChange(e) {
    let value = e.target.value
    let key = e.target.name
    this.setState({
      [key]: value
    })
  }

  validate(){
    let {name, quantity} = this.state
    let { nameInput, quantityInput } = this.refs
    if (name == '') {
      alert('El nombre no puede estar en blanco')
      nameInput.focus()
      return false
    } else if (quantity < 1) {
      alert('la cantidad dbe ser mayor a 0')
      quantityInput.focus()
      return false
    } else {
      this.handleSubmit()
    }
  }

  productTemplate(product) {
    return [
      "<div class='product_box'>",
        "<h4>",
          product.name,
        "</h4>",
        "<p>",
          product.description,
        "</p>",
        "<p>",
          product.quantity.toString(),
        "</p>",
        "<hr/>",
        "<p>",
          "<a href=/product/"+product.id+" data-method='delete'>Borrar</a>",
          "<a href=/products/"+product.id+" >Detalles</a>",
        "</p>",
      "</div>",
    ].join('\n')
  }

  clearState(){
    this.setState({
      name: '',
      description: '',
      quantity: 1
    })
  }

  handleSubmit(){
    var that = this
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
      return response.json()
    }).then(function (data) {
      that.clearState()
      var productsEl = document.getElementsByClassName('product_list')
      productsEl[0].innerHTML = productsEl[0].innerHTML + that.productTemplate(data)
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  render () {
    return (
      <div className={style.product_form}>
        <input ref='nameInput' className={'name_input'} placeholder={'Nombre'} value={this.state.name} name={'name'} type="text" onChange={this.handleChange}/>
        <input ref='descriptionInput' placeholder={'Descripcion'} value={this.state.description} name={'description'} type="text" onChange={this.handleChange}/>
        <input ref='quantityInput' type='number' placeholder={'Cantidad'} value={this.state.quantity} name={'quantity'} onChange={this.handleChange} min={1}/>
        <button onClick={this.validate}>Submit</button>
      </div>
    )
  }
}

export default ProductForm
