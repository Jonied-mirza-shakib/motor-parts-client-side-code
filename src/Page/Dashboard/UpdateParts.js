import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const UpdateParts = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const imageStorageApi = '19bf4cd9f8fbd132a1a0e00b0808ce6a';
    const { id } = useParams();
    const [parts, setParts] = useState({});
    useEffect(() => {
        fetch(`https://motor-parts-server-side-code-production.up.railway.app/bestSeller/${id}`)
            .then(res => res.json())
            .then(data => setParts(data))
    }, [id])


    const onSubmit = async data => {
        console.log(data)
        const updateData = {
            name: data.name,
            price: parseInt(data.price),
            img: data.img,
        }
        const url = `https://motor-parts-server-side-code-production.up.railway.app/bestSeller/${id}`;
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                if (result) {
                    alert('parts Information updated successfully')
                } else {
                    alert('parts Information updated field')
                }
                reset()
            });
    }

    return (
        <div>
            <h1 className='text-center text-3xl text-indigo-800 my-10'>Updated Parts Information</h1>
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
                                    <span className="label-text font-bold">Photo Url</span>
                                </label>
                                <input
                                    type="text" className="input input-bordered w-full max-w-xs"
                                    {...register("img", {
                                        required: {
                                            value: true,
                                            message: 'image is Required'
                                        }
                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <input className='btn w-full max-w-xs text-white' type="submit" value='UPDATE' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateParts;