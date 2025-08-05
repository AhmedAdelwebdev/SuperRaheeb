'use client'
import Aos from "aos";
import 'aos/dist/aos.css';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { products } from '@/lib/data';
import { Download, DownloadCloud, Loader, Star } from "lucide-react";

export default function Downloads() {
  const [isLoadingn, setIsDownload] = useState(true);
  const [downloads, setDownloads] = useState<string[]>([]);

  useEffect(() => { 
    Aos.init({ once: true, duration: 600 });

    const saved = localStorage.getItem('downloads');
    if (saved) setDownloads(JSON.parse(saved));
  }, []);

  const itemsList = products.filter((pro: {id: string}) => downloads.includes(pro.id));

  if (isLoadingn && itemsList.length == 0) {
    setTimeout(() => {setIsDownload(false)}, 500);
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <Loader className="size-16 text-primary animate-spin"/>
      </div>
    )
  }

  console.log(downloads.length == 0 , itemsList.length == 0);

  if (downloads.length == 0 || itemsList.length == 0) {
    return (
      <div className="py-10 space-y-7 sm:space-y-10 relative">
        <div data-aos="fade-up" className="mt-14 h-screen absolute inset-0">
          <div className="w-4\5 px-8 py-12 flex flex-col items-center justify-center gap-10 rounded-4xl border-4 border-primary shadow">
            <DownloadCloud className="size-14"/>
            <h2 className="text-2xl text-center leading-12">لم تقم بتحميل ملفات بعد</h2>
            {/* <button onClick={()=> localStorage.setItem('downloads', JSON.stringify('["1"]'))}>add</button> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10 space-y-7 sm:space-y-10">
      <div data-aos="zoom-in" className="banner flex items-center justify-between gap-4 text-sm sm:text-lg bg-primary-light rounded-[30px_15px] p-6 sm:p-8 mb-10">
        <p className="sm:text-xl">منتجات متاح تنزيلها</p>
        <button onClick={()=> {
          localStorage.setItem('downloads', JSON.stringify('[]')); setDownloads([])
        }} className="flex items-center gap-3 cursor-pointer hover:text-red-400 active:scale-x-95 duration-200">
          <h4>حذف الكل</h4>
        </button>
      </div>
      <ul className="flex flex-col gap-8">
        {itemsList.map((item, i) => (
          <li data-aos="fade-up" data-aos-delay={i * 200} key={item.id} className="flex p-3 space-x-5 shadow shadow-black/10 border border-bd rounded-[30px_15px] hover:bg-bd/30 duration-300">
            <Link href={"pro/" + item.id}>
              <Image src={item.img} className="size-24 rounded-xl object-cover" width={50} height={50} alt="" />
            </Link>
            
            <div className="flex flex-col gap-4 text-sm sm:text-lg">
              <h2>{item.title}</h2>
              <p className="font-sans font-bold flex items-center gap-2">
                <span>{item.rating}</span> <Star className="size-5 fill-current text-primary" />
              </p>
            </div>

            <Link href={item.downloadUrl} download className="mr-auto">
              <Download className="size-10 sm:size-12 text-text p-2 hover:bg-white rounded-xl transition-colors" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
