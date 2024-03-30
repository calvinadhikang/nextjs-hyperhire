import NavBar from "./components/NavBar";
import BookPage from "./components/BookPage";

export default function Page() {
    return (
        <>
            <div className="w-screen max-w-7xl m-auto">
                <div className="my-10 space-y-10">
                    <h1 className="text-3xl font-medium">Featured Books</h1>
                    <BookPage></BookPage>
                </div>
            </div>
        </>
    );
}
