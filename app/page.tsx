"use client"

import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBucket, listBucketFiles, viewBucket } from "@/lib/api";
import axios from "axios";
import { create } from "domain";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

const handleDownload = (file: File) => {
  // Create a URL for the file
  const fileUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = file.name; // Set the download name
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


export default function Home() {
  const [bucket, setBucket] = useState<any[]>([]);
  

  const {isConnected, address} = useAccount();
  const [file, setFile] = useState<File | null>(null)

  const uploadFile = async () => {
    const form = new FormData();
    if (!file) return;
    form.append("file", file)
    
    const response = await axios.post(`http://localhost:8000/buckets/${address}/files`, form);


    console.log(response.data)
  }
  const func = async () => {
    if(isConnected && address !== undefined){
      const res = await viewBucket(address)
      setBucket(res)
      console.log("Res: ", res) //contains list of files
    }    
  }
 
  useEffect(()=>{
    func()
  },[])


  return (
   <div className="w-[72vw] mx-auto pt-4">
    <Navbar />
    <div className="flex flex-row gap-2 items-center">
    <Input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
    <Button size={'icon'} disabled={!file} onClick={uploadFile} ><Upload className="h-5" /></Button>
    </div>
    
    {bucket != null ?  bucket.map((file, index) => (
        <div
          key={index}
          className="bg-green-400 flex justify-between"
          onClick={() => handleDownload(file)}
        >
          <strong>{file.name}</strong> <br />
          <small>Size: {file.size} bytes</small> <br />
          <small>Modified: {new Date(file.lastModified).toLocaleString()}</small>
        </div>
      )): <></>}

   </div>
    
  );
}
