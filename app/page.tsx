'use client'

import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { products, categories } from '@/lib/data';

export default function Home() {
  const ProPerPage = 3;
  const [showAllId, setShowAllId] = useState('');

  useEffect(() => { AOS.init({ once: true, duration: 600 }); }, []);

  function Products({showAllId, cateId, ProPerPage}:{showAllId: string, cateId: string, ProPerPage: number}) {
  
    const productsList = products.filter(pro => pro.categoryId == cateId);
    const data = (showAllId == cateId) ? productsList : productsList.slice(0, ProPerPage);

    return data.map((pro, i) => (
      <div key={pro.id} data-aos="zoom-in" className={`${(showAllId == cateId ? false : i >= (ProPerPage-1)) && 'hidden md:block'} relative rounded-4xl border-2 border-bd overflow-hidden`}>
        <Link href={"pro/" + pro.id}> 
          <Image src={pro.img} unoptimized className="w-full min-h-10 object-cover hover:scale-105 duration-300" width={100} height={100} alt='pro'/>
        </Link>
        <div className="absolute inset-0 top-auto text-xl font-sans font-bold bg-gradient-to-t from-black/25 to-white/25 backdrop-blur-[2px] px-5 py-3 flex flex-wrap items-center justify-between">
          <h3 className="w-full line-clamp-1 mb-2">{!!pro.show_title && pro.title}</h3>
          <h4 dir='ltr'>{pro.price} USD</h4>
          <h4 className="flex items-center gap-3"><span>{pro.rating}</span><Star className='size-6 fill-current text-primary'/></h4>
        </div>
      </div>
    ))
  }

  return (
    <div className="container space-y-7">
     
      <div data-aos="fade" className="banner flex items-center bg-primary-light rounded-[30px_15px] p-6 my-10">
        <div data-aos="fade-left" className="text-base sm:text-xl">
          <p>مرحبا بك فى افضل متجر</p>
          <p className='mt-3'>للمنتجات الرقمية</p>
        </div>
        <Image src='/logo.png' data-aos="fade-right" unoptimized className='hidden md:block w-38 mr-auto object-contain' alt='robot' width={50} height={50}/>
      </div>

      <div className="relative *:duration-200">
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 bg-body *:h-36 *:sm:h-42">
          {categories.map((cate, i)=> { 
            const Icon = cate.icon;
            return (i != 1) ? (
            <Link href={`#${cate.id}`} key={cate.id} data-aos="zoom-in" className={`${i == 2 ?'hidden md:flex':'flex'} flex-col items-center justify-center gap-3 relative z-10 bg-body border-[3px] border-primary rounded-2xl shadow-xl hover:shadow active:bg-gray-100`}>
              <Icon className='size-12' />
              <h3 className='text-lg'>{cate.name}</h3>
              {cate.soon && (<span className='absolute top-3 right-3 text-xs text-text/80'>قريباً</span>)}
            </Link>
          ) : (
            <div key={cate.id} className="relative">
              <div data-aos="fade" className="z-0 absolute bottom-30 sm:bottom-36 left-1/2 -translate-x-1/2 overflow-hidden">
                <Image src='/robot.png' unoptimized className='w-38 min-w-38 md:min-w-44 scale-125 object-contain' alt='robot' width={50} height={50}/>
              </div>
              <Link href={`#${cate.id}`} data-aos="zoom-in" className="relative z-10 h-full bg-body border-[3px] border-primary rounded-2xl flex flex-col items-center justify-center gap-3 shadow-xl hover:shadow active:bg-gray-100">
                <Icon className='size-12' />
                <h3 className='text-lg'>{cate.name}</h3>
                {cate.soon && (<span className='absolute top-3 right-3 text-xs text-text/80'>قريباً</span>)}
              </Link>
            </div>
          )})}
        </div>
      </div>
    
      <section>
        {categories.map(cate => (cate.soon == false) && (
        <div key={cate.id} id={cate.id} className="space-y-14">
          <h2 data-aos="zoom" className="cate-titel pt-14">
            {cate.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7"> 
            <Products showAllId={showAllId} cateId={cate.id} ProPerPage={ProPerPage}/>
          </div>

          <button onClick={()=> setShowAllId(showAllId == cate.id ?'': cate.id)}
            data-aos="fade" className={`py-3 w-42 text-sm whitespace-nowrap rounded-2xl shadow-md shadow-black/20 border-2 border-primary hover:bg-primary hover:text-white active:scale-x-95 mx-auto cursor-pointer duration-200
            ${products.filter(pro => pro.categoryId == cate.id).length > ProPerPage ?'block':'hidden'}`}>
            {showAllId == cate.id ?'عرض اقل':'عرض الكل'} 
          </button>
        </div>
        ))}
      </section>

    </div>
  );
}
