import React, {SyntheticEvent, useState} from 'react'
import Wrapper from './Wrapper'
import { useHistory } from "react-router-dom";

export default function ProductCreate() {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory();

    const addProduct = async (e: SyntheticEvent) => {
        e.preventDefault()

        const res = await fetch('http://192.168.99.100:8000/api/products', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                image: image
            })

        })

        if (res.status === 201){
            alert('Product Successfully Added!')
            history.push('/admin/products')
        } else {
            alert('Product could not add!')
        }
    }
    return (
        <Wrapper>
            <form className="col-md-8"><br></br>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input type="text" className="form-control" name="image" onChange={(e) => setImage(e.target.value)} />
                </div><br></br>
                <button onClick={addProduct} className="btn btn-success">Submit</button>
            </form>
        </Wrapper>
    )
}
