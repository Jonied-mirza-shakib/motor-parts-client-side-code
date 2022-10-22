import './TopCategories.css'

const TopCategories = () => {
    const categories=[
        {
            "img":"https://i.ibb.co/MZX5QbM/cat1.jpg",
            "name":"WHEELS & TIRES"
        },
        {
            "img":"https://i.ibb.co/440t1XB/cat2.jpg",
            "name":"SMART DEVICES"
        },
        {
            "img":"https://i.ibb.co/9Nn7cPk/cat3.jpg",
            "name":"OILS & FLUIDS"
        },
        {
            "img":"https://i.ibb.co/37pdd3j/cat4.jpg",
            "name":"LIGHTS & LIGHTING"
        },
        {
            "img":"https://i.ibb.co/p0Z8MYW/cat5.jpg",
            "name":"REPLACEMENT PARTS"
        },
        {
            "img":"https://i.ibb.co/Bcg2Y4V/cat6.jpg",
            "name":"TOOLS & EQUIPMENT"
        }
    ]




    return (
        <div className='top-categories-main'>
             <p className='top-categories-single-title'>TOP FEATURED COLLECTIONS</p>
            <h1 className='top-categories-entry-title'>SHOP BY CATEGORIES</h1>

            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {
                categories.map(categorie => <div>
                    <div className="card w-mx-w bg-base-100 shadow-xl cursor-pointer">
                        <figure><img src={categorie.img} alt="" className='w-100' /></figure>
                        <div className="card-body">
                        <h1 className='best-seller-title'>NAME: {categorie.name}</h1>
                        <button type="button" className='btn btn-outline btn-primary'>VIEW MORE</button>
                        </div>
                    </div>
                </div>)
            }
            </div>
        </div>
    );
};

export default TopCategories;