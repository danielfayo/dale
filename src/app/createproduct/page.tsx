"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageContentLayout from "@/layouts/PageContentLayout";
import Image from "next/image";
import React, { useState } from "react";

type pageProps = {};

type categoriesType = {
  name: string;
  description: string;
  value: string;
  isSelected: boolean;
};
const page: React.FC<pageProps> = () => {
    const [imageVal, setImageVal] = useState<string>()

  const [categories, setCategories] = useState<categoriesType[]>([
    {
      name: "Digital Product",
      description: "Any set of files",
      value: "digitalProduct",
      isSelected: false,
    },
    {
      name: "Educational",
      description: "Any set of files",
      value: "educational",
      isSelected: false,
    },
    {
      name: "E-Book",
      description: "Any set of files",
      value: "ebook",
      isSelected: false,
    },
    {
      name: "Audio File",
      description: "Any set of files",
      value: "audioFile",
      isSelected: false,
    },
  ]);

  const handleSelectCategory = (value: string) => {
    const newCategories: categoriesType[] = categories.map((category) =>
      category.value === value
        ? { ...category, isSelected: true }
        : { ...category, isSelected: false }
    );
    setCategories(newCategories);
  };

  return (
    <PageContentLayout pageName="Create a new product">
      <div className="flex flex-col max-w-[960px]">
        <span className="text-2xl font-semibold hidden lg:block">
          Add new product
        </span>
        <div className="flex flex-col gap-2 lg:mt-6">
          <label htmlFor="name">Name of Product</label>
          <Input name="name" placeholder="e.g Guide to cooking rice" />
        </div>
        <div className="mt-8">
          <label>Cover image</label>
          <div className="mt-4 bg-accent p-4 text-center rounded-lg">
            {/* <Image alt="image placeholder" src={"/assets/placeholder.png"} height={200} width={200} style={{borderRadius: '4px', filter: 'invert(100%)', cursor: "pointer", }}/> */}
            <Button className="mb-2">Upload image</Button>
            <br />
            <span className="text-sm text-muted-foreground">
              Images should be horizontal, at least 1280x720px
            </span>
          </div>
        </div>
        <div className="mt-8">
          <label htmlFor="description">Description</label>
          <Textarea
            name="description"
            placeholder="Type your description here."
            className="mt-2"
          />
        </div>
        <div className="mt-8">
          <span className="text-base">Category</span>
          <div className="mt-4 flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-6">
            {categories.map((category) => (
              <div
                onClick={() => {
                  handleSelectCategory(category.value);
                }}
                className={`border border-accent flex flex-col py-2 px-4 rounded-lg min-w-[200px] cursor-pointer ${
                  category.isSelected && "border-white border-2"
                }`}
                key={category.value}
              >
                <span
                  className={`text-base font-semibold ${
                    category.isSelected ? "text-white" : "text-muted-foreground"
                  } `}
                >
                  {category.name}
                </span>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <label htmlFor="content">Content</label>
          <div className="mt-4 bg-accent p-4 text-center rounded-lg">
            <Button className="mb-2">Upload files</Button>
            <br />
            <span className="text-sm text-muted-foreground">
              You can upload pdfs and images
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8 relative">
          <label htmlFor="price">Price</label>
          <Input name="price" placeholder="e.g 5000" className="pl-8" />
          <span className="absolute bottom-1.5 ml-3">₦</span>
        </div>
        <Button className="mt-8 md:mr-auto">Next</Button>
      </div>
    </PageContentLayout>
  );
};
export default page;
