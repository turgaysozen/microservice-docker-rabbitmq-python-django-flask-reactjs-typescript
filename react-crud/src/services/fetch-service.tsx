export const getAllProducts = async () => {
    return await fetch('http://192.168.99.100:8000/api/products')
}

export const deleteProduct = async (id: Number) => {
    return await fetch(`http://192.168.99.100:8000/api/products/${id}`, {
        method: 'DELETE'
    })
}

export const findProduct = async (id: Number) => {
    return await fetch(`http://192.168.99.100:8000/api/products/${id}`)
}

export const updateProduct = async (id: Number, title: String, image: String) => {
   return await fetch(`http://192.168.99.100:8000/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                image
            })

        })
} 