import React, { PropsWithoutRef, SyntheticEvent, useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { useHistory } from "react-router-dom";
import { Product } from '../interfaces/product';
import {getAllProducts, findProduct, updateProduct} from '../services/fetch-service'

export default function ProductUpdate(props: PropsWithoutRef<any>) {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory();

    useEffect(() => {
        (
            async () => {
                const res = await findProduct(props.match.params.id)
                if (res.status === 200) {
                    const product = await res.json()
                    setTitle(product.title)
                    setImage(product.image)
                } 
                else {
                    alert("Prouct not found!")
                    history.push('/admin/products')
                }
            }
        )()
    }, [])

    const updateSelectedProduct = async (e: SyntheticEvent) => {
        e.preventDefault()

        const res = await updateProduct(props.match.params.id, title, image)

        if (res.status === 202) {
            alert('Product Successfully Updated!')
            history.push('/admin/products')
        } else {
            alert('Product could not update!')
        }
    }
    return (
        <Wrapper>
            <form className="col-md-8"><br></br>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title"
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image"
                        defaultValue={image}
                        onChange={(e) => setImage(e.target.value)} />
                </div><br></br>
                <button onClick={updateSelectedProduct} className="btn btn-success">Submit</button>
            </form>
        </Wrapper>
    )
}
