import { CategoryResponse } from "@/app/types/category";
import apiClient from "./client";
import { processCategoriesWithImages } from "../utils/categoryImages";

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    // In production, this would be your actual API endpoint
    // const response = await apiClient.get('/categories');
    // const data = response.data;

    // For now, return dummy data with images processed
    const dummyData = dummyCategoryResponse;

    // Process categories to add images
    const processedContent = processCategoriesWithImages(
      dummyData.responseData.content,
    );

    return {
      ...dummyData,
      responseData: {
        ...dummyData.responseData,
        content: processedContent,
      },
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getActiveCategories = async (): Promise<CategoryResponse> => {
  try {
    // const response = await apiClient.get('/categories/active');
    // return response.data;

    // Filter dummy data to return only active categories
    const dummyData = dummyCategoryResponse;
    const activeCategories = dummyData.responseData.content.filter(
      (category) => category.status.stCode === "ACT",
    );

    // Process active categories to add images
    const processedActiveCategories =
      processCategoriesWithImages(activeCategories);

    return {
      ...dummyData,
      responseData: {
        ...dummyData.responseData,
        content: processedActiveCategories,
        totalElements: processedActiveCategories.length,
        numberOfElements: processedActiveCategories.length,
      },
    };
  } catch (error) {
    console.error("Error fetching active categories:", error);
    throw error;
  }
};

// Dummy data based on your JSON response
const dummyCategoryResponse: CategoryResponse = {
  responseCode: "00",
  responseMessage: "Categories retrieved successfully",
  responseData: {
    content: [
      {
        catId: 6,
        catCode: "C005",
        catName: "Casual Sarees",
        catDescription: "Everyday casual wear sarees",
        status: {
          stId: 2,
          stCode: "INACT",
          stDescription: "Inactive",
        },
        createdAt: "2026-02-02T23:59:35",
        updatedAt: "2026-02-02T23:59:35",
      },
      {
        catId: 7,
        catCode: "C006",
        catName: "Casual Sarees",
        catDescription: "Everyday casual wear sarees",
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        createdAt: "2026-03-01T02:44:08",
        updatedAt: "2026-03-01T02:44:08",
      },
      {
        catId: 3,
        catCode: "C003",
        catName: "Office Wear Sarees 22",
        catDescription: "Comfortable sarees suitable for office wear 222222",
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        createdAt: "2026-02-02T23:06:39",
        updatedAt: "2026-03-02T03:25:40",
      },
      {
        catId: 2,
        catCode: "C002",
        catName: "Party Wear Sarees",
        catDescription: "Party Wear Sarees",
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        createdAt: "2026-02-02T23:05:33",
        updatedAt: "2026-02-02T23:19:00",
      },
      {
        catId: 12,
        catCode: "",
        catName: "Sarees 22",
        catDescription: "kkkkkkkkkkkk",
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        createdAt: "2026-03-02T03:26:33",
        updatedAt: "2026-03-02T03:26:33",
      },
      {
        catId: 1,
        catCode: "C001",
        catName: "Sri Lankan Bride Sarees",
        catDescription: "Sri Lankan Bride Sarees 1990 Look and Feel",
        status: {
          stId: 1,
          stCode: "ACT",
          stDescription: "Active",
        },
        createdAt: "2026-02-02T22:59:42",
        updatedAt: "2026-02-02T23:03:46",
      },
      {
        catId: 4,
        catCode: "C004",
        catName: "Traditional Sarees",
        catDescription: "Classic traditional sarees",
        status: {
          stId: 2,
          stCode: "INACT",
          stDescription: "Inactive",
        },
        createdAt: "2026-02-02T23:06:48",
        updatedAt: "2026-02-02T23:06:48",
      },
    ],
    empty: false,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 7,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      paged: true,
      sort: [
        {
          ascending: true,
          descending: false,
          direction: "ASC",
          ignoreCase: false,
          nullHandling: "NATIVE",
          property: "catName",
        },
      ],
      unpaged: false,
    },
    size: 10,
    sort: [
      {
        ascending: true,
        descending: false,
        direction: "ASC",
        ignoreCase: false,
        nullHandling: "NATIVE",
        property: "catName",
      },
    ],
    totalElements: 7,
    totalPages: 1,
  },
};
