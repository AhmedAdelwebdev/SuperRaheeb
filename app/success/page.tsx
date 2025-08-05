'use client'
import { products } from '@/lib/data'
import { BadgeCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function DownloadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [downloads, setDownloads] = useState([])
  const [authorized, setAuthorized] = useState(false)

  const productId = searchParams.get('id')

  useEffect(() => {
    const paidProducts = JSON.parse(sessionStorage.getItem('paidProducts')) || []

    if (productId && paidProducts.includes(productId)) {
      setAuthorized(true)
      setDownloads(JSON.parse(localStorage?.getItem('downloads')) || [])
      
      if (!downloads.includes(productId)) {
        downloads.push(productId);
        localStorage.setItem('downloads', JSON.stringify(downloads))
      }
    } else router.push('/pro/'+ productId)
  }, [downloads, productId, router])

  if (!authorized) return null

  return (
    <div className="min-h-[80vh] mt-10 rounded-4xl flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 text-center">
      <BadgeCheck className='size-28 text-primary' />
      <h1 className="text-2xl md:text-3xl font-bold my-7 text-sky-800">تم الدفع بنجاح</h1>
      <p className="mb-6 text-gray-700 text-lg leading-12">يمكنك الآن تحميل المنتج الخاص بك بكل سهولة.</p>
      <a href={products[parseInt(productId) -1].downloadUrl} download className="w-44 py-4 bg-primary hover:bg-primary-light active:scale-x-95 text-white rounded-[25px_10px] shadow transition duration-200">
        تحميل المنتج
      </a>
    </div>
  )
}
