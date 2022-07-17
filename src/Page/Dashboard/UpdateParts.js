import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateParts = () => {
    const { id } = useParams();
    const [parts, setParts] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/parts/${id}`)
            .then(res => res.json())
            .then(data => setParts(data))
    }, [id])

    const handleSubmit = event => {
        event.preventDefault()
        const name = event.target?.name?.value;
        const description = event.target?.description?.value;
        const photoURL = event.target?.img?.value;
        const price = event.target?.price?.value;
        const quantity = event.target?.quantity?.value;
        const minimum_order_quantity = event.target?.minimum_order_quantity?.value;
        const data = { name, description, photoURL, price, quantity, minimum_order_quantity }
        const url = `http://localhost:5000/parts/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                if (result) {
                    alert('parts Information updated successfully')
                } else {
                    alert('parts Information updated field')
                }
            });
        event.target.reset();
    }

    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Updated Parts Information</h1>
            <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">Product Name</span>
                            </label>
                            <input type="text" name="name" placeholder='name' className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">Product Description</span>
                            </label>
                            <input type="text" placeholder='description' name="description" className="input input-bordered w-full max-w-xs mb-5" />
                        </div>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">PhotoUrl</span>
                            </label>
                            <input type="text" name="img" placeholder='photoUrl' className="input input-bordered w-full max-w-xs mb-5" />
                        </div>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">Price</span>
                            </label>
                            <input type="text" name="price" placeholder='price' required className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">Quantity</span>
                            </label>
                            <input type="text" name="quantity" placeholder='quantity' required className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text font-bold">Minimum Order Quantity</span>
                            </label>
                            <input type="text" name="minimum_order_quantity" placeholder='minimum_order_quantity' required className="input input-bordered w-full max-w-xs mb-5" />
                        </div>
                        <input style={{ width: '330px' }} type="submit" value="UPDATED INFORMATION" className='btn btn-accent text-white' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateParts;