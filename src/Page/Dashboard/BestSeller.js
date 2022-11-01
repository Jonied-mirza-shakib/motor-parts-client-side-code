import React from 'react';
import { useForm } from 'react-hook-form';
import './BestSeller.css'

const BestSeller = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageApi = '19bf4cd9f8fbd132a1a0e00b0808ce6a';
    const onSubmit = async data => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageApi}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                const img = result.data.url;
                if (result.success) {
                    const addParts = {
                        name: data.name,
                        price: parseInt(data.price),
                        img: img,
                    }
                    fetch('http://localhost:5000/bestSeller', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(addParts),
                    })
                        .then(response => response.json())
                        .then(result => {
                            if (result.insertedId) {
                                alert('Added best seller Parts successfully');
                                reset()
                            } else {
                                alert('Field to added best seller Parts')
                            }
                        })
                }
            })
    }
    return (
        <div>
            <h1 className='text-center text-accent sm:text-xl md:text-3xl lg:text-3xl uppercase mt-10 mb-10'>Add Best Seller Products</h1>
            <div className='form-main'>
                <div className="card max-w-screen-lg bg-base-100 shadow-xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Parts Name</span>
                                </label>
                                <input
                                    type="text" placeholder="Parts Name" className="input input-bordered w-full max-w-xs"
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name is Required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Price</span>
                                </label>
                                <input
                                    type="text" placeholder="Price" className="input input-bordered w-full max-w-xs"
                                    {...register("price", {
                                        required: {
                                            value: true,
                                            message: 'Price is Required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text font-bold">Photo</span>
                                </label>
                                <input
                                    type="file" className="input input-bordered w-full max-w-xs"
                                    {...register("image", {
                                        required: {
                                            value: true,
                                            message: 'image is Required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <input className='btn w-full max-w-xs text-white' type="submit" value='ADD' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestSeller;