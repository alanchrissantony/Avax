import {ChangeEvent, FormEvent} from 'react'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface LoginForm extends FormSubmit {
  email: string
  password: string
}

export interface BaseApi {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface ListBaseApi {
  count: number;
  next: string;
  previous: string;
}

export interface User extends BaseApi {

}

export interface Artist extends BaseApi {
  slug: string;
  user: {
    id: number;
    displayName: string;
    type_profile: string;
    image: string;
    is_premium: boolean;
  };
  first_name: string;
  last_name: string;
  display_name: string;
  image: string;
  is_verify: boolean;
}

export interface Artists extends ListBaseApi {
  results: Artist[];
}