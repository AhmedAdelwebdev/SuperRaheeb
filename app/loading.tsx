import { Loader } from "lucide-react";

export default function loading() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <Loader className="size-16 text-primary animate-spin"/>
    </div>
  )
}
