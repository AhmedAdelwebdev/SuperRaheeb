import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function loading() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 font-sans font-bold">
      <TriangleAlert className="size-16 text-primary animate-ping mb-5"/>
      <Link href="/" className="text-xl text-primary" dir="ltr">
        404 // Go To Home
      </Link>
    </div>
  )
}
