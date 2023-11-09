"use client";

import PageContentLayout from "@/layouts/PageContentLayout";
import React, { useRef, useState } from "react";
import useGetProductData from "../../../hooks/useGetProductData";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Loader2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "@/components/ui/use-toast";
import { buttonVariants } from "@/components/ui/button";
import { deleteObject, ref } from "firebase/storage";
import { Skeleton } from "@/components/ui/skeleton";

type pageProps = {
  params: { productId: string };
};

const Page: React.FC<pageProps> = ({ params }) => {
  const router = useRouter();
  const { result, loadingItem } = useGetProductData(params.productId);
  const [user] = useAuthState(auth);
  // const buttonRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleEditButton = () => {
    router.push(`/editproduct/${params.productId}`);
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const coverImageRef = ref(
        storage,
        `productCovers/${result?.productId}/image`
      );
      await deleteObject(coverImageRef);
      for (let i = 0; i < result?.productContentURLs.length!; i++) {
        const contentFilesRef = ref(
          storage,
          `/contentFiles/${result?.productId}/${i}`
        );
        await deleteObject(contentFilesRef);
      }

      await deleteDoc(doc(firestore, "products", result?.productId!));
      await deleteDoc(
        doc(firestore, `users/${user?.uid}/productSnippets`, result?.productId!)
      );
      toast({ title: "Product deleted" });
      router.push("/products");
    } catch (error) {
      toast({ title: "Something went wrong", variant: "destructive" });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <PageContentLayout
      pageName={result?.productName as string}
      other={
        <DropdownMenu>
          <DropdownMenuTrigger className="">
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-none">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditButton}>
              Edit Product
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger className="cursor-default rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted text-red-500">
                Delete Product
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <button
                    onClick={handleDeleteProduct}
                    className={`${buttonVariants({ variant: "destructive" })}`}
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                  {/* <AlertDialogAction ref={buttonRef} className="hidden"></AlertDialogAction> */}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      {/* <div className="flex">
        
      </div> */}

      {loadingItem ? (
        <div className="mb-8">
          <>
            <Skeleton className="w-full aspect-square max-h-[608px]" />
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <Skeleton className="w-[100px] h-[20px]" />
                <Skeleton className="w-[100px] h-[20px]" />
              </div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((each) => (
                  <Skeleton key={each} className="w-full h-[16px]" />
                ))}
              </div>
            </div>
          </>
        </div>
      ) : (
        <div className="mb-8">
          <div className="relative w-full aspect-square max-h-[608px]">
            <Image
              src={result?.productCoverURL!}
              alt=""
              fill
              objectFit="cover"
            />
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <Badge variant={"secondary"}>{result?.productCategory}</Badge>
              <span className="text-xl">₦{result?.productPrice}</span>
            </div>
            <p className="text-base text-slate-300">{result?.productDesc}</p>
          </div>
        </div>
      )}
    </PageContentLayout>
  );
};
export default Page;
