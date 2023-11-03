"use client";

import PageContentLayout from "@/layouts/PageContentLayout";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { ContentFile, ProductText, categoriesType } from "@/lib/types";
import { nanoid } from "nanoid";
import { Loader2, X } from "lucide-react";
import { Categories } from "./categories";

type CreateProductProps = {
  coverPhoto?: string;
  onSelectCoverImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  contentFiles: [] | ContentFile[];
  setContentFiles: Dispatch<SetStateAction<[] | ContentFile[]>>;
  onSelectContentFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (id: string) => void;
  productTexts: ProductText;
  handleProductTextChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setCategory: Dispatch<SetStateAction<string>>;
  setCoverPhoto: Dispatch<SetStateAction<string | undefined>>;
  handleCreateProduct: () => void;
  loading: boolean;
  nameError: string;
  coverImageError: string;
  descriptionError: string;
  categoryError: string;
  priceError: string;
  contentError: boolean
};

const CreateProduct: React.FC<CreateProductProps> = ({
  coverPhoto,
  onSelectCoverImage,
  contentFiles,
  setContentFiles,
  onSelectContentFile,
  handleRemoveFile,
  handleProductTextChange,
  productTexts,
  setCategory,
  setCoverPhoto,
  handleCreateProduct,
  loading,
  nameError,
  categoryError,
  coverImageError,
  descriptionError,
  priceError,
  contentError
}) => {
  const selectedCoverRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<categoriesType[]>(Categories);

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
        <div className="flex flex-col gap-2 ">
          <label htmlFor="name">Name of Product</label>
          <Input
            id="name"
            placeholder="e.g Guide to cooking rice"
            value={productTexts.name}
            onChange={handleProductTextChange}
          />
          {nameError && (
            <span className="text-red-400 text-xs">{nameError}</span>
          )}
        </div>
        <div className="mt-8">
          <span>Cover image</span>
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
              <Button
                onClick={() => setCoverPhoto("")}
                className="mt-4 w-full md:w-auto"
                variant={"secondary"}
              >
                Change Photo
              </Button>
            </>
          ) : (
            <div className="mt-4 bg-accent p-4 text-center rounded-lg">
              <Button
                onClick={() => selectedCoverRef.current?.click()}
                className="mb-2"
              >
                Choose image
              </Button>
              <br />
              <span className="text-sm text-muted-foreground">
                Images should be horizontal, at least 1280x720px
              </span>
              <input
                ref={selectedCoverRef}
                type="file"
                hidden
                onChange={onSelectCoverImage}
              />
            </div>
          )}
          {coverImageError && (
            <span className="text-red-400 text-xs">{coverImageError}</span>
          )}
        </div>
        <div className="mt-8">
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            placeholder="Type your description here."
            value={productTexts.description}
            onChange={handleProductTextChange}
            className="mt-2"
          />
          {descriptionError && (
            <span className="text-red-400 text-xs">{descriptionError}</span>
          )}
        </div>
        <div className="mt-8">
          <span className="text-base">Category</span>
          <div className="mt-4 flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-6">
            {categories.map((category) => (
              <div
                onClick={() => {
                  handleSelectCategory(category.value);
                  setCategory(category.name);
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
            {categoryError && (
            <span className="text-red-400 text-xs">{categoryError}</span>
          )}
          </div>
        </div>
        <div className="mt-8">
          <span>Content</span>
          {contentFiles.length > 0 ? (
            <div className="space-y-2 mt-4">
              {contentFiles.map((each) => (
                <div key={each.id} className="relative flex items-center">
                  <Input
                    type="file"
                    id={each.id}
                    onChange={onSelectContentFile}
                    className="cursor-pointer pr-8"
                  />
                  <X
                    onClick={() => handleRemoveFile(each.id)}
                    className="absolute right-2 cursor-pointer"
                  />
                </div>
              ))}
              <Button
                className="w-full md:w-auto"
                variant={"secondary"}
                onClick={() =>
                  setContentFiles((prev) => [
                    ...prev,
                    { id: nanoid(), file: "" },
                  ])
                }
              >
                Add File
              </Button>
            </div>
          ) : (
            <div className="mt-4 bg-accent p-4 text-center rounded-lg">
              <Button
                onClick={() =>
                  setContentFiles((prev) => [
                    ...prev,
                    { id: nanoid(), file: "" },
                  ])
                }
                className="mb-2"
              >
                Choose files
              </Button>
              <br />
              <span className="text-sm text-muted-foreground">
                You can upload pdfs and images
              </span>
            </div>
          )}
          {contentError && <span className="text-xs text-red-400">Please select content files for the product</span>}
        </div>
        <div className="flex flex-col gap-2 mt-8 relative">
          <label htmlFor="price">Price</label>
          <Input
            id="price"
            placeholder="e.g 5000"
            type="number"
            className="pl-8 appearance-none"
            value={productTexts.price}
            onChange={handleProductTextChange}
          />
          <span className="absolute bottom-1.5 ml-3">₦</span>
          <div className="w-4 h-4 bg-background absolute bottom-[11px] right-3"/>
        </div>
        {priceError && (
            <span className="text-red-400 text-xs">{priceError}</span>
          )}
        <Button
          disabled={loading}
          onClick={handleCreateProduct}
          className="mt-8 md:mr-auto mb-8"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            "Save product"
          )}
        </Button>
      </div>
    </PageContentLayout>
  );
};
export default CreateProduct;
