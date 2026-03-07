import { ApiResponse, ProductsResponse, Status } from "@/app/types/product";

// Define active status constant
const ACTIVE_STATUS: Status = {
  stId: 1,
  stCode: "ACT",
  stDescription: "Active",
};

export const DUMMY_PRODUCTS: ApiResponse<ProductsResponse> = {
  responseCode: "00",
  responseMessage: "Products retrieved successfully",
  responseData: {
    content: [
      {
        proId: 1,
        proCode: "KAN001",
        proName: "Royal Red Kanchipuram Silk Saree",
        proDescription:
          "Premium pure silk Kanchipuram saree with rich gold zari temple border and elegant peacock motifs.",
        sareeFabricType: "Pure Silk",
        sareeLengthMeters: 6.2,
        blouseFabricType: "Silk",
        blouseLengthMeters: 0.8,
        proColor: "Red",
        proPrice: 24500.0,
        categories: [
          {
            catId: 1,
            catCode: "CAT_SILK",
            catName: "Silk Collection",
            catDescription: "Luxury pure silk sarees",
            status: {
              stId: 1,
              stCode: "ACT",
              stDescription: "Active",
            },
            createdAt: "2025-01-15T10:00:00",
            updatedAt: "2025-01-15T10:00:00",
          },
        ],
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        images: [
          {
            publicId: "kanchipuram-red-1",
            imageUrl:
              "https://images.unsplash.com/photo-1652375186211-805106e54556?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 0,
            isPrimary: true,
          },
          {
            publicId: "kanchipuram-red-2",
            imageUrl:
              "https://images.unsplash.com/photo-1760613129745-418b15f91d56?q=80&w=651&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 1,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-red-3",
            imageUrl:
              "https://images.unsplash.com/photo-1760613129846-357d4b4ac931?q=80&w=653&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 2,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-red-4",
            imageUrl:
              "https://images.unsplash.com/photo-1760613130027-3959a3eb939c?q=80&w=726&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 3,
            isPrimary: false,
          },
        ],
        availableStock: 12,
        createdAt: "2025-02-10T14:30:00",
        updatedAt: "2025-03-05T09:15:00",
      },
      {
        proId: 2,
        proCode: "KAN002",
        proName: "Golden Temple Border Kanchipuram Silk",
        proDescription:
          "Classic golden Kanchipuram silk with intricate zari work and traditional motifs, perfect for special occasions.",
        sareeFabricType: "Pure Silk",
        sareeLengthMeters: 6.5,
        blouseFabricType: "Silk",
        blouseLengthMeters: 0.9,
        proColor: "Gold & Red",
        proPrice: 28500.0,
        categories: [
          {
            catId: 1,
            catCode: "CAT_SILK",
            catName: "Silk Collection",
            catDescription: "Luxury pure silk sarees",
            status: {
              stId: 1,
              stCode: "ACT",
              stDescription: "Active",
            },
            createdAt: "2025-01-15T10:00:00",
            updatedAt: "2025-01-15T10:00:00",
          },
          {
            catId: 3,
            catCode: "CAT_BRIDAL",
            catName: "Bridal Sarees",
            catDescription: "Exclusive wedding collection",
            status: {
              stId: 1,
              stCode: "ACT",
              stDescription: "Active",
            },
            createdAt: "2025-01-20T11:00:00",
            updatedAt: "2025-01-20T11:00:00",
          },
        ],
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        images: [
          {
            publicId: "kanchipuram-gold-1",
            imageUrl:
              "https://images.unsplash.com/photo-1750164875377-8dd60996fc63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
            displayOrder: 0,
            isPrimary: true,
          },
          {
            publicId: "kanchipuram-gold-2",
            imageUrl:
              "https://images.unsplash.com/photo-1750164874154-1bfa2d31af39?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 1,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-gold-3",
            imageUrl:
              "https://images.unsplash.com/photo-1750164870293-ee760fd5ba05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 2,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-gold-4",
            imageUrl:
              "https://images.unsplash.com/photo-1750164875377-8dd60996fc63?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 3,
            isPrimary: false,
          },
        ],
        availableStock: 8,
        createdAt: "2025-02-12T16:45:00",
        updatedAt: "2025-03-01T10:20:00",
      },
      {
        proId: 3,
        proCode: "KAN003",
        proName: "Peacock Motif Kanchipuram Silk Saree",
        proDescription:
          "Stunning silk saree featuring traditional peacock design in gold zari on deep maroon base.",
        sareeFabricType: "Pure Silk",
        sareeLengthMeters: 6.3,
        blouseFabricType: "Silk",
        blouseLengthMeters: 0.8,
        proColor: "Maroon",
        proPrice: 26800.0,
        categories: [
          {
            catId: 1,
            catCode: "CAT_SILK",
            catName: "Silk Collection",
            catDescription: "Luxury pure silk sarees",
            status: {
              stId: 1,
              stCode: "ACT",
              stDescription: "Active",
            },
            createdAt: "2025-01-15T10:00:00",
            updatedAt: "2025-01-15T10:00:00",
          },
        ],
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        images: [
          {
            publicId: "kanchipuram-peacock-1",
            imageUrl:
              "https://images.unsplash.com/photo-1615886753866-79396abc446e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 0,
            isPrimary: true,
          },
          {
            publicId: "kanchipuram-peacock-2",
            imageUrl:
              "https://images.unsplash.com/photo-1646481648338-3b47fc68022b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 1,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-peacock-3",
            imageUrl:
              "https://images.unsplash.com/photo-1646481648338-3b47fc68022b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 2,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-peacock-4",
            imageUrl:
              "https://images.unsplash.com/photo-1646481648338-3b47fc68022b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 3,
            isPrimary: false,
          },
        ],
        availableStock: 15,
        createdAt: "2025-02-20T09:10:00",
        updatedAt: "2025-03-03T14:40:00",
      },
      {
        proId: 4,
        proCode: "KAN004",
        proName: "Classic Orange Kanchipuram Silk Saree",
        proDescription:
          "Vibrant orange silk saree with contrasting gold border and detailed zari weaving.",
        sareeFabricType: "Pure Silk",
        sareeLengthMeters: 6.0,
        blouseFabricType: "Silk",
        blouseLengthMeters: 0.8,
        proColor: "Orange",
        proPrice: 19800.0,
        categories: [
          {
            catId: 1,
            catCode: "CAT_SILK",
            catName: "Silk Collection",
            catDescription: "Luxury pure silk sarees",
            status: {
              stId: 1,
              stCode: "ACT",
              stDescription: "Active",
            },
            createdAt: "2025-01-15T10:00:00",
            updatedAt: "2025-01-15T10:00:00",
          },
        ],
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        images: [
          {
            publicId: "kanchipuram-orange-1",
            imageUrl:
              "https://images.unsplash.com/photo-1770838550265-534760223328?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 0,
            isPrimary: true,
          },
          {
            publicId: "kanchipuram-orange-2",
            imageUrl:
              "https://images.unsplash.com/photo-1770838447142-fe777b6869d6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 1,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-orange-3",
            imageUrl:
              "https://images.unsplash.com/photo-1770838447151-05a876cdee3d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 2,
            isPrimary: false,
          },
          {
            publicId: "kanchipuram-orange-4",
            imageUrl:
              "https://images.unsplash.com/photo-1770838446951-23c2e61c3d1c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            displayOrder: 3,
            isPrimary: false,
          },
        ],
        availableStock: 10,
        createdAt: "2025-02-25T11:55:00",
        updatedAt: "2025-03-06T16:30:00",
      },
    ],
    empty: false,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 4,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      sort: [],
      unpaged: false,
    },
    size: 10,
    sort: [],
    totalElements: 4,
    totalPages: 1,
  },
};
