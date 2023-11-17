"use client";

import CreateProduct from "@/components/createProduct/CreateProductForm";
import { toast } from "@/components/ui/use-toast";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { ContentFile, Product, ProductSnippet, ProductText } from "@/lib/types";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type PageProps = {};

const Page: React.FC<PageProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [coverPhoto, setCoverPhoto] = useState<string>(); //cover photo
  const [contentFiles, setContentFiles] = useState<ContentFile[] | []>([]); //content files
  const [productTexts, setProductTexts] = useState<ProductText>({
    name: "",
    description: "",
    price: "",
  }); //text inputs of form
  const [category, setCategory] = useState(""); //category
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [coverImageError, setCoverImageError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [contentError, setContentError] = useState(false);

  const handleProductTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductTexts((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
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

  const onSelectCotentFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        const newContentFiles: ContentFile[] = contentFiles.map((each) => {
          if (each.id === e.target.id) {
            return { ...each, file: readerEvent.target?.result as string };
          }
          return each;
        });
        setContentFiles(newContentFiles);
      }
    };
  };

  const handleRemoveFile = (id: string) => {
    const newContentFiles = contentFiles.filter((each) => each.id !== id);
    setContentFiles(newContentFiles);
  };

  const handleCreateProduct = async () => {
    if (productTexts.name) {
      setNameError("");
    }
    if (coverPhoto) {
      setCoverImageError("");
    }
    if (productTexts.description) {
      setDescriptionError("");
    }
    if (category) {
      setCategoryError("");
    }
    if (productTexts.price) {
      setPriceError("");
    }
    // if(contentError){
    //   setContentError(false)
    // }

    if (!productTexts.name) {
      setNameError("Name of product is empty");
      return;
    }
    if (!coverPhoto) {
      setCoverImageError("Please select a cover image");
      return;
    }
    if (!productTexts.description) {
      setDescriptionError("Please enter the product description");
      return;
    }
    if (!category) {
      setCategoryError("Please select a category for the product");
      return;
    }
    if (!(contentFiles.length > 0)) {
      setContentError(true);
      return;
    }

    for (let i = 0; i < contentFiles.length; i++) {
      if (!contentFiles[i].file) {
        setContentError(true);
        return;
      }
    }
    if (!productTexts.price) {
      setPriceError("Please enter a price");
      return;
    }


    setLoading(true);

    const newProduct: Product = {
      productId: nanoid(),
      creatorId: user?.uid,
      productName: productTexts.name,
      productDesc: productTexts.description,
      productPrice: productTexts.price,
      productCategory: category,
      productCoverURL: null,
      productContentURLs: [],
      sales: 0,
    };

    try {
      // const productDocRef = await addDoc(
      //   collection(firestore, "products"),
      //   newProduct
      // );
      const productDocRef = doc(firestore, "products", newProduct.productId)
      setDoc(doc (firestore, "products", newProduct.productId), newProduct)

      // await updateDoc(productDocRef, newProduct);

      const coverImageRef = ref(
        storage,
        `productCovers/${newProduct.productId}/image`
      );
      await uploadString(coverImageRef, coverPhoto!, "data_url");
      const downloadURL = await getDownloadURL(coverImageRef);
      await updateDoc(productDocRef, { productCoverURL: downloadURL });

      const links = [];
      for (let i = 0; i < contentFiles.length; i++) {
        const imageRef = ref(
          storage,
          `/contentFiles/${newProduct.productId}/${i}`
        );
        await uploadString(imageRef, contentFiles[i].file, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        links.push(downloadURL);
      }
      await updateDoc(productDocRef, { productContentURLs: links });

      const newProductSnippet: ProductSnippet = {
        productId: newProduct.productId,
        productName: newProduct.productName,
        productCategory: newProduct.productCategory,
        productCoverURL: downloadURL,
        sales: newProduct.sales,
        productPrice: newProduct.productPrice as number,
      };

      await setDoc(
        doc(firestore, `users/${user?.uid}/productSnippets`, newProduct.productId),
        newProductSnippet
      );
      toast({ title: "Product created successfully" });
      router.push("/products");
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <CreateProduct
      coverPhoto={coverPhoto}
      onSelectCoverImage={onSelectCoverImage}
      contentFiles={contentFiles}
      setContentFiles={setContentFiles}
      onSelectContentFile={onSelectCotentFile}
      handleRemoveFile={handleRemoveFile}
      productTexts={productTexts}
      handleProductTextChange={handleProductTextChange}
      setCategory={setCategory}
      setCoverPhoto={setCoverPhoto}
      handleCreateProduct={handleCreateProduct}
      loading={loading}
      nameError={nameError}
      coverImageError={coverImageError}
      descriptionError={descriptionError}
      priceError={priceError}
      categoryError={categoryError}
      contentError={contentError}
    />
  );
};
export default Page;
