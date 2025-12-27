import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = `${import.meta.env.VITE_API_URL}/employe`

export const employeAPI = createApi({
    reducerPath: "employeAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Employe"],
    endpoints: (builder) => ({

        GetMyTask: builder.query({
            query: () => "/my-tasks",
            providesTags: ["Employe"]
        }),

        GetMyTaskById: builder.query({
            query: (id) => `task/${id}`,
            providesTags: ["Employe"]
        }),

        UpdateTaskStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/task/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Employe"]
        }),
    })
})

export const {
    useGetMyTaskQuery,
    useGetMyTaskByIdQuery,
    useUpdateTaskStatusMutation
} = employeAPI

