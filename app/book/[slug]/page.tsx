import NavBar from "@/app/components/NavBar"

export default function Page({ params } : { params: { slug: string } }) {
    return (
        <>
            <p>{params.slug}</p>
        </>
    )
}