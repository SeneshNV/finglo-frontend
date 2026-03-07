export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: "feedback" | "designs";
  customerName?: string;
  date?: string;
}

export const galleryImages: GalleryImage[] = [
  // Customer Feedback Images
  {
    id: "feedback-12",
    src: "https://images.unsplash.com/photo-1716504628105-bd76d91e85f2?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Happy customer wearing a beautiful traditional saree",
    category: "feedback",
    customerName: "Priya Sharma",
    date: "2024-01-15",
  },
  {
    id: "feedback-22",
    src: "https://images.unsplash.com/photo-1723613293765-a99d25640fa7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Customer wearing an elegant designer saree",
    category: "feedback",
    customerName: "Anjali Patel",
    date: "2024-01-10",
  },
  {
    id: "feedback-33",
    src: "https://images.unsplash.com/photo-1665099270570-03f1a199146a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Bride style saree look with jewelry",
    category: "feedback",
    customerName: "Neha Gupta",
    date: "2024-01-05",
  },

  // Saree Design Images
  {
    id: "design-14",
    src: "https://images.unsplash.com/photo-1689595593651-10791a8c5b9e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Traditional silk saree design",
    category: "designs",
    date: "2024-01-20",
  },
  {
    id: "design-76",
    src: "https://images.unsplash.com/photo-1688673411815-bc3bbe1a28b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern embroidered designer saree",
    category: "designs",
    date: "2024-01-18",
  },
  {
    id: "design-3",
    src: "https://images.unsplash.com/photo-1640745690912-5144fd039434?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Elegant chiffon saree fashion photo",
    category: "designs",
    date: "2024-01-12",
  },
  {
    id: "feedback-1",
    src: "https://images.unsplash.com/photo-1716504628105-bd76d91e85f2?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Happy customer wearing a beautiful traditional saree",
    category: "feedback",
    customerName: "Priya Sharma",
    date: "2024-01-15",
  },
  {
    id: "feedback-2",
    src: "https://images.unsplash.com/photo-1723613293765-a99d25640fa7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Customer wearing an elegant designer saree",
    category: "feedback",
    customerName: "Anjali Patel",
    date: "2024-01-10",
  },
  {
    id: "feedback-3",
    src: "https://images.unsplash.com/photo-1665099270570-03f1a199146a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Bride style saree look with jewelry",
    category: "feedback",
    customerName: "Neha Gupta",
    date: "2024-01-05",
  },

  // Saree Design Images
  {
    id: "design-1",
    src: "https://images.unsplash.com/photo-1689595593651-10791a8c5b9e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Traditional silk saree design",
    category: "designs",
    date: "2024-01-20",
  },
  {
    id: "design-2",
    src: "https://images.unsplash.com/photo-1688673411815-bc3bbe1a28b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern embroidered designer saree",
    category: "designs",
    date: "2024-01-18",
  },
];
