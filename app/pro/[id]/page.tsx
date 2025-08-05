'use client'
import Aos from "aos";
import 'aos/dist/aos.css';
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { products } from '@/lib/data';
import PayPalCheckout from "@/app/components/PayPalCheckout";


export default function ProductPage() {
  const { id }:{ id: string } = useParams();
  const [isDownload, setIsDownload] = useState(false)
  const pro = products[parseInt(id) -1]; 
  
   useEffect(() => {
    Aos.init({ once: true, duration: 600 })
    
    const downloads = JSON.parse(localStorage.getItem('downloads') || '[]')
    if (!!pro && downloads.includes(pro.id)) setIsDownload(true)
  }, [pro]);

  if (!!!pro) return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="space-y-8">
        <h1 className="text-3xl leading-16 text-center">هذا المنتج غير متوفر حاليا</h1>
        <Link href="/" className="block py-3 px-4 w-fit mx-auto text-center text-md md:text-xl whitespace-nowrap rounded-[25px_10px] shadow-md shadow-black/20 border-2 border-primary hover:bg-primary hover:text-white active:scale-x-95 cursor-pointer duration-200">
          الذهاب للصفحة الرئسية
        </Link>
      </div>
    </div>
  )

  return (
    <div className="py-8" data-aos="fade">
      <div data-aos="fade" className="banner text-xl sm:text-3xl text-center bg-primary-light rounded-[30px_15px] p-6 sm:p-8 mb-10">
        صفحه المنتج
      </div>
      <div className="md:flex gap-10 mx-auto h-fit *:md:w-1/2">
        <div className="rounded-4xl border-2 border-bd overflow-hidden h-fit"> 
          <Image src={pro.img} unoptimized className="w-full object-cover hover:scale-105 duration-300" width={100} height={100} alt='pro'/>
        </div>

        <div className="details flex flex-col grow">
          <div className="text-xl md:text-2xl lg:text-3xl font-sans font-bold px-5 py-3 flex flex-wrap items-center justify-between">
            <h3 className="w-full mb-4 text-2xl md:text-3xl">{pro.title}</h3>
            <h4 className="text-primary" dir="ltr">{isDownload ? 'تم الشراء' : `${pro.price} USD`}</h4>
            <h4 className="flex items-center gap-3"><span>{pro.rating}</span><Star className='size-6 md:size-8 fill-current text-primary'/></h4>
          </div>

          { isDownload 
            ? <Link href={pro.downloadUrl} download className="p-4 text-lg shadow rounded-[25px_10px] border-4 border-primary hover:bg-primary-light active:scale-x-95 duration-200 text-center mt-3"> تحميل المنتج </Link>
            : <PayPalCheckout product={pro as object}/> 
          }

          <div className="pt-10 flex flex-col grow">
            <h2 className="cate-titel">
              وصف المنتج
            </h2>
            <p className="mt-10 grow max-h-[433px] text-lg bg-gray-100 p-6 rounded-4xl leading-10 overflow-auto border-2 border-bd">
              {pro.desc}
            </p>
          </div>
        </div>
      </div>

      <div className={`mt-14 ${products.filter(p => p.categoryId == pro.categoryId && p.id != id).length == 0 && 'hidden'}`}>
        <h2 data-aos="fade" className="cate-titel text-lg">
          منتجات مشابهة
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7 mt-14"> 
          {products.filter(p => p.categoryId == pro.categoryId && p.id != id).map((pro, i) => (
            <div key={pro.id} data-aos="zoom-in" className={`${(i >= 2) && 'hidden md:block'} relative rounded-4xl border-2 border-bd overflow-hidden`}>
              <Link href={pro.id}> 
                <Image src={pro.img} unoptimized className="w-full min-h-10 object-cover hover:scale-105 duration-300" width={100} height={100} alt='pro'/>
              </Link>
              <div className="absolute inset-0 top-auto text-xl font-sans font-bold bg-gradient-to-t from-black/25 to-white/25 backdrop-blur-[2px] px-5 py-3 flex flex-wrap items-center justify-between">
                <h3 className="w-full line-clamp-1 mb-2">{!!pro.show_title && pro.title}</h3>
                <h4>{pro.price} جنية</h4>
                <h4 className="flex items-center gap-3"><span>{pro.rating}</span><Star className='size-6 fill-current text-primary'/></h4>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
