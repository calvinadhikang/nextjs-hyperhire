import { Lemon } from "next/font/google";
import { Cart, User } from "../interfaces/interfaces";
import axios from "axios";
import API_URLS from "../api/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { getUser } from "../utils/auth";

export default function CartItem ({
    cart, onAction
} : {
    cart: Cart,
    onAction: () => void
}) {
    
    const showModal = () => {
        const element = document.getElementById(`my_modal_${cart.id}`)
        if (element != null) {
            element.showModal()
        }
    }

    const handleDelete = async () => {
        let url = `cart/delete/${cart.id}`
        const response = await axios.post(API_URLS + url)
        alert("Success Delete")
        onAction()
    }

    return (
        <>
            <div key={cart.id} className="flex-1 flex items-center flex-row py-2 pe-16 ps-2 gap-5 rounded border">
                <img src={cart.book.image} alt="" className="bg-cover h-52"/>
                <div className="flex flex-1 items-center">
                    <div className="space-y-2 flex-1">
                        <p className="font-medium text-2xl">{cart.book.title}</p>
                        <p className="text-xl">$ {cart.book.price} x {cart.quantity} pcs</p>
                        {/* <div className="space-x-2 py-8"> */}
                            {/* <button className="btn btn-primary" onClick={() => handleCheckout()}>Purchase</button>
                            <button className="btn btn-error" onClick={()=> showModal() }>Cancel</button> */}
                        {/* </div> */}
                    </div>
                </div>
                <p className="font-medium text-3xl">$ {cart.subtotal}</p>
                <p className="text-gray-500 text-3xl" onClick={()=> showModal()}><FontAwesomeIcon icon={faTrash} className="hover:text-error"/></p>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id={`my_modal_${cart.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Cancel Order</h3>
                <p className="py-4">Are you sure you want to cancel the order of <span className="font-medium">{cart.book.title}</span> ?</p>
                <div className="modal-action">
                    <div className="flex gap-x-2">
                        <button className="btn-error btn" onClick={handleDelete}>Yes</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </div>
            </dialog>
        </>
    )
}