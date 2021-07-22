import React, { useState, useEffect } from 'react'
import ProductCreate from '../admin/ProductCreate'
import { Product } from '../interfaces/product'
import { getAllProducts } from '../services/fetch-service'

export default function Main() {
    const [products, setProducts] = useState([] as Product[])

    useEffect(() => {
        (
            async () => {
                const res = await getAllProducts()
                const products = await res.json()
                setProducts(products)
            }
        )()
    }, [])

    const likeProduct = async (id: Number) => {
        const res = await fetch(`http://192.168.99.100:8001/api/products/${id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                like: 1
            })
        })
        if (res.status === 200) {
            const res = await getAllProducts()
            const products = await res.json()
            products.map((p: Product) => {
                if (p.id === id) {
                    p.likes++
                }
                return p
            })
            setProducts(products)
        }

    }
    return (
        <main>
            <div className="album py-5 bg-light">
                <div className="container">
                    <h2>All Products</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                        {products.map((p: Product) => {
                            return (
                                <div key={Number(p.id)} className="col">
                                    <div className="card shadow-sm">
                                        <img src={String(p.image)} height="200px" width="100%" />
                                        <div className="card-body">
                                            <p className="card-text">{p.title}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                    <button onClick={() => likeProduct(p.id)} type="button" className="btn btn-sm btn-outline-secondary">Like {p.likes}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>

        </main>

    )
}
