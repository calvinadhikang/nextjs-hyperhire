import axios from "axios";
import { Book } from "../interfaces/interfaces";
import { getUser } from "../utils/auth";
import API_URLS from "../api/apiConfig";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function BookItem(book: Book){
    const router = useRouter()

    const handleBuy = async () => {
        const user = getUser()
        if (user == null) {
            router.push('/login')
        }else{
            try {
                const response = await axios.post(API_URLS + 'book/buy', {
                    user: user.id,
                    book: book.id,
                    quantity: 1
                })

                router.push('/cart')
            } catch (error) {
                alert("error buy")
            }
        }
    }

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
                    { book.tags.map((tag) => <div key={tag.id} className="badge badge-outline badge-sm">{tag.name}</div> ) }
                </div>
                <button onClick={handleBuy} className="btn bg-indigo-600 text-white hover:bg-indigo-500 btn-sm mt-2 btn-block"><FontAwesomeIcon icon={faCartPlus} />Add To Cart</button>
            </div>
        </div>
    )
}