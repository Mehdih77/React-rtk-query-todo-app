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

export const headerApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Header"],
  endpoints: (bulider) => ({
    getHeader: bulider.query({
      query: () => "/header",
      providesTags: (result) => providesList(result, "Header"),
    }),
  }),
});

export const { useGetHeaderQuery } = headerApiSlice;
