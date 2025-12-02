import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ambulanceApi = createApi({
  reducerPath: "ambulance",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({


     getAllAmbulance: builder.query({
      query: () => `/api/ambulance`,
    }),

       getAAmbulance: builder.query({
      query: (id) => `/api/ambulance/${id}`,
    }),

    updateAmbulance: builder.mutation({
        query: ({ id, updateAmbulance}) => {
          return {
            url: `/api/ambulance/${id}`,
            method: 'PUT',
            body: updateAmbulance,
          };
        },
      }),


    registerAmbulance: builder.mutation({
        query: ({   serviceName,
        address,
        latitude,
        longitude,
        phone,
        email,
        password,
        vehicleType
       }) => {
          return {
            url: `/api/ambulance/register`,
            method: 'POST',
            body: {  serviceName,
        address,
        latitude,
        longitude,
        phone,
        email,
        password,
        vehicleType},
          };
        },
      }),


    loginAmbulance: builder.mutation({
        query: (formData) => {
          return {
            url: `/api/ambulance/login`,
            method: 'POST',
            body: formData,
          };
        },
      }),

        forgotAmbulance: builder.mutation({
        query: (formData) => {
          return {
            url: `/api/ambulance/forgot`,
            method: 'POST',
            body: formData,
          };
        },
      }),

        passwordChangeAmbulance: builder.mutation(
          {
        query: ( formData) => {
          console.log(formData, "guuuu");
          
          return {
            url: `/api/ambulance/changepassword`,
            method: 'PUT',
            body: formData,
          };
        },
      }),


      deleteAmbulance: builder.mutation({
        query: (id) => {
          return {
            url: `/api/ambulance/${id}`,
            method: 'DELETE',
          };
        },
      }),

  }),
});




export const {
    useDeleteAmbulanceMutation,
   useGetAAmbulanceQuery,
   useGetAllAmbulanceQuery,
   useRegisterAmbulanceMutation,
   useUpdateAmbulanceMutation,
   useLoginAmbulanceMutation,
   useForgotAmbulanceMutation,
   usePasswordChangeAmbulanceMutation
  } =  ambulanceApi; 
  