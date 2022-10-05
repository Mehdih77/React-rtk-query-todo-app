import { apiSlice } from "../../api/apiSlice";

//* Helper function::
function providesList(resultsWithIds, tagType) {
  return resultsWithIds
    ? [
        { type: tagType, id: "LIST" },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: "LIST" }];
}

export const todoApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      // providesTags: ["Todo"],

      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({ id }) => ({ type: "Todo", id })), "Todo"]
      //     : ["Todo"],

      providesTags: (result) => providesList(result, "Todo"),

      // providesTags: (result, error, arg) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({ type: "Todo", id })),
      //         { type: "Todo", id: "LIST" },
      //       ]
      //     : [{ type: "Todo", id: "LIST" }],
      // keepUnusedDataFor: 5,
      transformResponse: (res) => res.sort((a, b) => b.id - a.id),
    }),

    getTodo: builder.query({
      query: (id) => ({
        url: `/todos/${id}`,
      }),
      // providesTags: ["Todo"],
      providesTags: (result, error, id) => [{ type: "Todo", id }],
      // providesTags: (result, error, arg) => [{ type: "Todo", id: result.id }],
    }),

    addTodo: builder.mutation({
      query: (data) => ({
        url: "/todos",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Todo"],
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),

    updateTodo: builder.mutation({
      query: (data) => ({
        url: `/todos/${data.id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["Todo"],
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
      // invalidatesTags: (result, error, arg) => [{ type: "Todo", id: "LIST" }],
    }),

    updateCompleteTodo: builder.mutation({
      query: (data) => ({
        url: `/todos/${data.id}`,
        method: "PUT",
        body: data,
      }),
      // invalidatesTags: ["Todo"],
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),

    deleteTodo: builder.mutation({
      query: (data) => ({
        url: `/todos/${data.id}`,
        method: "DELETE",
      }),
      // invalidatesTags: ["Todo"],
      invalidatesTags: (result, error, arg) => [{ type: "Todo", id: arg.id }],
    }),
  }),
});

export const {
  useGetTodoQuery,
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useUpdateCompleteTodoMutation,
  useDeleteTodoMutation,
} = todoApiSlice;
