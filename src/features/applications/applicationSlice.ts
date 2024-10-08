import { Result, Results, ApplicationParams, Application } from "../../types/Application";
import { apiSlice } from "../api/apiSlice";

const endpointUrl = "/applications";

function parseQueryParams(params: ApplicationParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    query.append("search", params.search);
  }

  return query.toString();
}

function getApplications({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search };

  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function createApplicationMutation(application: Application) {
  return { url: endpointUrl, method: "POST", body: application };
}

function updateApplicationMutation(application: Application) {
  return {
    url: `${endpointUrl}/${application.id}`,
    method: "PUT",
    body: application,
  };
}

function getApplication({ id }: { id: string }) {
  return `${endpointUrl}/${id}`;
}

export const applicationsApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getApplications: query<Results, ApplicationParams>({
      query: getApplications,
      providesTags: ["Applications"],
    }),
    getApplication: query<Result, { id: string }>({
      query: getApplication,
      providesTags: ["Applications"],
    }),
    createApplication: mutation<Result, Application>({
      query: createApplicationMutation,
      invalidatesTags: ["Applications"],
    }),
    updateApplication: mutation<Result, Application>({
      query: updateApplicationMutation,
      invalidatesTags: ["Applications"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useGetApplicationQuery,
} = applicationsApiSlice;
