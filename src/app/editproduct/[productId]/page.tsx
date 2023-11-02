"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useGetProductData from "@/hooks/useGetProductData";
import PageContentLayout from "@/layouts/PageContentLayout";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Categories } from "@/components/createProduct/categories";
import { Product, categoriesType } from "@/lib/types";

type PageProps = {
  params: { productId: string };
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { result } = useGetProductData(params.productId);

  const selectedCoverRef = useRef<HTMLInputElement>(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCoverImage, setProductCoverImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<string>();

  const [categories, setCategories] = useState<categoriesType[]>(Categories);

  useEffect(() => {
    const newCat: categoriesType[] = categories.map((each) =>
      each.name === result?.productCategory
        ? { ...each, isSelected: true }
        : { ...each, isSelected: false }
    );
    setCategories(newCat);
    setProductName(result?.productName!);
    setProductDesc(result?.productDesc!);
    setProductCategory(result?.productCategory!);
    setProductPrice(result?.productPrice as string)
  }, [result]);

  const handleSelectCategory = (value: string) => {
    const newCategories: categoriesType[] = categories.map((category) =>
      category.value === value
        ? { ...category, isSelected: true }
        : { ...category, isSelected: false }
    );
    setCategories(newCategories);
  };

  const onSelectCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setCoverPhoto(readerEvent.target.result as string);
      }
    };
  };

  const handleUpdateProduct = () => {

    const newProduct: Product = {
        productId: result?.productId!,
        creatorId: result?.creatorId!,
        creatorDisplayName: result?.creatorDisplayName!,
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,
        productCategory: productCategory,
        productContentURLs: result?.productContentURLs!,
        productCoverURL: result?.productCoverURL!,
        sales: result?.sales!
    }

    if (coverPhoto){
        
    }
  }

  return (
    <PageContentLayout pageName="Edit Product">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="name">Name of Product</label>
        <Input
          id="name"
          placeholder="e.g Guide to cooking rice"
          defaultValue={result?.productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <>
        <div>
          {coverPhoto ? (
            <>
              <div className="w-fill max-h-[608px] aspect-square relative mt-4">
                <Image
                  src={coverPhoto}
                  alt="cover photo"
                  fill={true}
                  objectFit="cover"
                />
              </div>
            </>
          ) : (
            <div className="w-fill max-h-[608px] aspect-square relative mt-4">
              <Image
                src={result?.productCoverURL!}
                alt="cover photo"
                fill={true}
                objectFit="cover"
              />
            </div>
          )}

          <Button
            onClick={() => selectedCoverRef.current?.click()}
            className="mt-4 w-full md:w-auto"
            variant={"secondary"}
          >
            Change Photo
          </Button>
        </div>
        <input
          ref={selectedCoverRef}
          type="file"
          hidden
          onChange={onSelectCoverImage}
        />
      </>
      <div className="mt-8">
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          placeholder="Type your description here."
          defaultValue={result?.productDesc}
          onChange={(e) => setProductDesc(e.target.value)}
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
                setProductCategory(category.name);
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
      <div className="flex flex-col gap-2 mt-8 relative">
        <label htmlFor="price">Price</label>
        <Input
          id="price"
          placeholder="e.g 5000"
          className="pl-8 appearance-none"
          defaultValue={result?.productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <span className="absolute bottom-1.5 ml-3">₦</span>
      </div>
      <Button
        //   disabled={loading}
        //   onClick={handleCreateProduct}
        className="mt-8 md:mr-auto mb-8"
      >
        "Update product"
      </Button>
    </PageContentLayout>
  );
};
export default Page;
