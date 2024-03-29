import { Book } from "../interfaces/interfaces";

export default function BookItem(book: Book){
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={book.image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    <p className="text-base">{book.title}</p>
                    <div className="badge badge-secondary badge-sm">$ {book.price}</div>
                </h2>
                <p className="text-sm">by <span className="text-primary font-semibold">{book.writer}</span></p>
                <div className="overflow-auto flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-sm">Fashion</div> 
                    <div className="badge badge-outline badge-sm">Products</div>
                </div>
                <button className="btn bg-indigo-600 text-white hover:bg-indigo-500 btn-sm mt-2 btn-block">Buy</button>
            </div>
        </div>
    )
}