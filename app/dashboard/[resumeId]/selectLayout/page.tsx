"use client";

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SelectLayout = () => {
  const [layout, setLayout] = useState(1);
  const router=useRouter()
    const { resumeId } = useParams<{ resumeId: string }>()
  
  const layouts = [
    { id: 1, image: '/image.png', name: "Layout 1" },
    { id: 2, image: '/layout2.png', name: "Layout 2" },
    { id: 3, image: '/layout3.png', name: "Layout 3" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Choose Your Resume Layout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {layouts.map((item) => (
          <div
            key={item.id}
            onClick={() => setLayout(item.id)}
            className={`group relative rounded-2xl bg-white border-2 p-6 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary ${
              layout === item.id ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'
            }`}
          >
            <div className="absolute top-4 right-4 z-10">
              {layout === item.id && <CheckCircle className="text-primary" size={24} />}
            </div>

            <div className="flex flex-col items-center justify-center h-[280px] relative z-0">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="rounded-md object-contain"
              />
              <h2 className="mt-4 text-lg font-semibold text-gray-700 group-hover:text-primary">
                {item.name}
              </h2>
            </div>

            <Button 
            onClick={()=>router.push(`/dashboard/${resumeId}/edit/?layout=${layout}`)}
              className={`mt-6 w-full ${
                layout === item.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 cursor-pointer'
              }`}
            >
              {layout === item.id ? "Selected" : "Continue with Layout"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectLayout;
