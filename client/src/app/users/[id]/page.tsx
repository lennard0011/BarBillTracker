export default function User({ params }: { params: { id: string } }) {
    return <div>My user: {params.id}</div>


  }