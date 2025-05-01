import {apiSlice} from "@/lib/services/apiSlice";
import {finishInitialLoadUser, setUser, startInitialLoadUser} from "@/lib/features/auth/authSlice";
import {ShortUser, ShortUsers, User, UserProfile} from "@/types/types";

interface SocialAuthArgs {
  provider: string;
  state: string;
  code: string;
}

interface CreateUserResponse {
  success: boolean;
  user: User;
}


const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    retrieveUserMe: builder.query<User, any | void>({
      query: ({}) => '/auth/users/me/',
      keepUnusedDataFor: 5,
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        dispatch(startInitialLoadUser())
        try {
          const {data} = await queryFulfilled
          dispatch(setUser(data))
        } catch (err) {
        } finally {
          dispatch(finishInitialLoadUser())
        }
      },
      providesTags: ['User']
    }),
    updateUserMe: builder.mutation<User, void>({
      query: (data) => ({
        url: '/auth/users/me/',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    retrieveUserProfile: builder.query<UserProfile, any | void>({
      query: ({}) => '/users/profiles/my/',
      keepUnusedDataFor: 5,
      providesTags: ['User']
    }),
    updateUserProfile: builder.mutation<UserProfile, object>({
      query: (data) => ({
        url: '/users/profiles/my/',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserProfileImage: builder.mutation<User, void>({
      query: (data) => ({
        url: '/users/profiles/my/image/',
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUserMe: builder.mutation<User, object>({
      query: (data) => ({
        url: '/auth/users/me/',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    socialAuthenticate: builder.mutation<
      CreateUserResponse,
      SocialAuthArgs
    >({
      query: ({provider, state, code}) => ({
        url: `/auth/o/${provider}/?state=${encodeURIComponent(state)}&code=${encodeURIComponent(code)}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }),
    login: builder.mutation({
      query: ({email, password}) => ({
        url: '/auth/jwt/create/',
        method: 'POST',
        body: {email, password},
      }),
      async onQueryStarted(_args, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    register: builder.mutation({
      query: ({email, type_profile, password, re_password}) => ({
        url: '/auth/users/',
        method: 'POST',
        body: {email, type_profile, password, re_password},
      })
    }),
    verify: builder.mutation({
      query: () => ({
        url: '/auth/jwt/verify/',
        method: 'POST',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['User', "MyAlbum", "MyTrack", "MyPlaylist", "MyArtist"]
    }),
    activation: builder.mutation({
      query: ({uid, token}) => ({
        url: '/auth/users/activation/',
        method: 'POST',
        body: {uid, token},
      }),
    }),
    resetPassword: builder.mutation({
      query: email => ({
        url: '/auth/users/reset_password/',
        method: 'POST',
        body: {email},
      }),
    }),
    resendActivationCode: builder.mutation({
      query: email => ({
        url: '/auth/users/resend_activation/',
        method: 'POST',
        body: {email},
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({uid, token, new_password, re_new_password}) => ({
        url: '/auth/users/reset_password_confirm/',
        method: 'POST',
        body: {uid, token, new_password, re_new_password},
      }),
    }),
    userFollow: builder.mutation({
      query: ({userId}) => ({
        url: `/users/${userId}/follow/`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    userUnfollow: builder.mutation({
      query: ({userId}) => ({
        url: `/users/${userId}/unfollow/`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    retrieveUser: builder.query<User, number>({
      query: (id) => `/auth/users/${id}/`,
      providesTags: ["User"],
    }),
    listUserFollowers: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/followers/`,
      providesTags: ["User"],
    }),
    listUserFollowing: builder.query<ShortUser[], any | void>({
      query: ({userId}) =>
        `/users/${userId}/following/`,
      providesTags: ["User"],
    }),
    listUsersProfile: builder.query<ShortUsers, any | void>({
      query: ({page = 1, search = ''}) =>
        `/users/profiles/?page=${page}&search=${search}`,
      providesTags: ["User"],
    }),
    listUser: builder.query<User[], any | void>({
      query: ({}) => `/auth/users/`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRetrieveUserMeQuery,
  useRetrieveUserQuery,
  useUpdateUserMeMutation,
  useRetrieveUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useDeleteUserMeMutation,
  useSocialAuthenticateMutation,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useResendActivationCodeMutation,
  useUserFollowMutation,
  useUserUnfollowMutation,
  useListUserFollowersQuery,
  useListUserFollowingQuery,
  useListUserQuery,
  useListUsersProfileQuery,
} = authApiSlice