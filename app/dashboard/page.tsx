export default async function DashboardPage() {
    const data = await fetch(
        process.env.API_URL || '',
        {
            method: 'POST',
            body: JSON.stringify({
                query: ``
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ).then((res) => res.json())
    return (
        <h1>{data.user}</h1>
    )
}