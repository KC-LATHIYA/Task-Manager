import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3000/admin"

export const adminAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include"
    }),
    tagTypes: ["Admin"],
    endpoints: (builder) => ({

        GetAllTask: builder.query({
            query: () => "/all-tasks",
            providesTags: ["Admin"]
        }),

        GetAllUsers: builder.query({
            query: () => "/all-users",
            providesTags: ["Admin"]
        }),

        GetTaskById: builder.query({
            query: (id) => `task/${id}`,
            providesTags: ["Admin"]
        }),

        CreateTask: builder.mutation({
            query: (data) => ({
                url: "/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Admin"]
        }),

        UpdateTask: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Admin"]
        }),

        DeleteTask: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Admin"]
        }),
    })
})

export const {
    useGetAllTaskQuery,
    useGetAllUsersQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation
} = adminAPI