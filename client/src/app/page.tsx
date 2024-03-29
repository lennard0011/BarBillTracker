import Link from 'next/link';

export default function Home() {
  return (<div>
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Home 🏠</h1>
      <h2><Link href="/people">People</Link></h2>
      <h2><Link href="/time-duration">Time Duration</Link></h2>
      <div></div>
    </main></div>
  )
}
