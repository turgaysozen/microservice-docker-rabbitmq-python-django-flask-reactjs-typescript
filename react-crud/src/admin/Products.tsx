import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import { Product } from '../interfaces/product'
import { Link } from 'react-router-dom'
import {getAllProducts, deleteProduct} from '../services/fetch-service'

export default function Products() {
    const [products, setData] = useState([])

    useEffect(() => {

        (async () => {
            const res = await getAllProducts()
            const products = await res.json()
            setData(products)
        })();   
    }, []);

    const deleteSelectedProduct = async (id: Number) => {
        const res = await deleteProduct(id)
        if (res.status === 204) {
            setData(products.filter((d: Product) => d.id !== id))
        }
    }

    return (
        <Wrapper>
            <div><br></br>
                <Link to='/admin/products/create' className="btn btn-primary">Add</Link>
                <h2>Products</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">İmage</th>
                                <th scope="col">Likes</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((d: Product) => {
                                return (
                                    <tr key={Number(d.id)}>
                                        <td>{d.title}</td>
                                        <td><img src={String(d.image)} height="50" width="70" /></td>
                                        <td>{d.likes}</td>
                                        <td>
                                            {/* <button onClick={() => updateProduct(d.id)} className="btn btn-primary">Update</button> */}
                                            <Link className="btn btn-primary btn-sm" to={`/admin/products/${d.id}/update`}>Update</Link>
                                            <button style={{marginLeft:'5px'}} onClick={() => deleteSelectedProduct(d.id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper>
    )
}
