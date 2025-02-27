"use client";
import { type ChangeEvent, type ReactNode, type DragEvent, useState } from "react";
import { Spinner, Upload, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/base";
import { cn } from "@/utils/functions";
import Image from "next/image";

export type TNamedFiles = { [variable: string]: File | null };

export type TGDU = {
  recomendation?: string;
  receipt?: string;
  bill?: string;
};

export interface INameFilesProps {
  files?: Array<TNamedFiles>;
  handleChange?: (args: Array<TNamedFiles>) => void;
  handleDelete?: Function;
  isUploading?: boolean;
  limitFiles?: number;
  objectToFill?: TGDU;
}

export default function NameFilesInput(props: INameFilesProps): ReactNode {
  // Props
  const { files = [], handleChange, handleDelete, limitFiles = 0, isUploading } = props;

  // State
  const [openFile, setOpenFile] = useState<keyof TGDU>();
  const [wrkFiles, setWrkFiles] = useState<Array<TNamedFiles>>(files);
  const [previews, setPreviews] = useState<Array<string>>([]);

  openFile;

  // Consts
  const multi = limitFiles > 1;

  // Functions
  function makePreviews(files: File | Array<File>): void {
    if (Array.isArray(files)) {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => setPreviews((old) => [...old, reader.result as string]);
        reader.readAsDataURL(file);
      });
    } else {
      const reader = new FileReader();
      reader.onloadend = () => setPreviews(() => [reader.result as string]);
      reader.readAsDataURL(files);
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files) {
      const newFiles: Array<File> = Array.from(e.target.files);
      const namedFiles: Array<TNamedFiles> = newFiles.map((x) => ({ [x.name]: x }));
      setWrkFiles((old) => (multi ? [...old, ...namedFiles] : [{ file: newFiles[0] }]));
      makePreviews(multi ? newFiles : newFiles[0]);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles: Array<File> = Array.from(e.dataTransfer.files);

      //  const namedFiles: Array<TNamedFiles> = newFiles.map((x) => ({ [x.name]: x }));
      const namedFiles: Array<TNamedFiles> = newFiles.map((x, k) => {
        const fileName = prompt("Ingrese el nombre del archivo", "Archivo") ?? `Archivo ${k}`;
        return { [fileName]: x };
      });
      console.log({ namedFiles });

      setWrkFiles((old) => (multi ? [...old, ...namedFiles] : [{ file: newFiles[0] }]));
      makePreviews(multi ? newFiles : newFiles[0]);
    }
  }

  function removeFile(id: number): void {
    setWrkFiles((old) => old.filter((_, i) => i !== id));
    setPreviews((old) => old.filter((_, i) => i !== id));
    handleDelete && handleDelete(wrkFiles);
  }

  function handleUpload(): void {
    handleChange && handleChange(wrkFiles);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-content1 rounded-lg shadow-xl">
      <motion.div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        onDragOver={(e) => e.preventDefault()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onDrop={handleDrop}
      >
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12" />
          <span className="mt-2 block text-sm font-semibold">Drop files here or click to upload</span>
        </label>
        <input
          onChange={handleFileChange}
          maxLength={limitFiles}
          className="sr-only"
          name="file-upload"
          multiple={multi}
          accept="image/*"
          id="file-upload"
          type="file"
        />
      </motion.div>

      <AnimatePresence>
        {previews.length > 0 && (
          <motion.div
            animate={{ opacity: 1, height: "auto" }}
            className="mt-6 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, height: 0 }}
            exit={{ opacity: 0, height: 0 }}
          >
            {previews.map((preview = "/placeholder.svg", idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative"
                key={idx}
              >
                <Image
                  className="rounded-lg object-cover"
                  alt={`Preview ${idx + 1}`}
                  src={preview}
                  height={150}
                  width={150}
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 rounded-md"
                  aria-label={`Remove file ${idx + 1}`}
                  onClick={() => removeFile(idx)}
                >
                  <X size={16} className="text-default" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        className={cn("mt-6 w-full py-2 px-4", isUploading ? "cursor-not-allowed" : "")}
        isLoading={isUploading || wrkFiles.length === 0}
        disabled={isUploading || wrkFiles.length === 0}
        onClick={handleUpload}
        color="primary"
      >
        {isUploading ? <Spinner className="animate-spin mx-auto h-5 w-5" /> : "Upload Files"}
      </Button>
    </div>
  );
}
