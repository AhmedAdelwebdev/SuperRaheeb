import { BookOpen, Palette, Code } from "lucide-react";

export const categories = [
  { id: "books", name: "الكتب", icon: BookOpen, soon: false },
  { id: "design", name: "تصميم", icon: Palette, soon: true },
  { id: "code", name: "اكواد", icon: Code, soon: true },
];

export const products = [
  {
    id: "1",
    rating: 4.9,
    downloads: 0,
    price: "1.00",
    show_title: false,
    img: "/book-1.jpg",
    categoryId: "books",
    title: "كيف تصنع دخلًا سلبيًا بـ AI",
    desc: "اكتشف أبسط 10 طرق لصناعة دخل سلبي باستخدام أدوات الذكاء الاصطناعي. لا تحتاج خبرة تقنية، فقط عقل متفتح ورغبة في البدء.",
    downloadUrl: "https://drive.google.com/file/d/1YBO8YVi4VvN6lWldgsnZ9G5_Rvk897_O/view?usp=drive_link",
  },
];
