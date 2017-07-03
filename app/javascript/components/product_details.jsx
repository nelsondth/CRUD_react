import React from 'react'

class ProductDetails extends React.Component {
  constructor(){
    super()
    this.state = {
      product: {}
    }
  }

  componentDidMount() {
    let {id} = this.props
    var that = this
    fetch('/product/'+id).then(function (response) {
      return response.json()
    }).then(function (product) {
      that.setState({
        product
      })
    })
  }

  render () {
    let {name, description, quantity} = this.state.product
    return (
      <div>
        <p>
          <a href="/products">Volver</a>
        </p>
        <p>{name}</p>
        <p>{description}</p>
        <p>{quantity}</p>
      </div>
    )
  }
}

export default ProductDetails;
