/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Activity {
  /** @format int32 */
  id?: number;
  title?: string | null;
  /** @format date-time */
  dueDate?: string;
  completed?: boolean;
}

export interface Author {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  idBook?: number;
  firstName?: string | null;
  lastName?: string | null;
}

export interface Book {
  /** @format int32 */
  id?: number;
  title?: string | null;
  description?: string | null;
  /** @format int32 */
  pageCount?: number;
  excerpt?: string | null;
  /** @format date-time */
  publishDate?: string;
}

export interface CoverPhoto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  idBook?: number;
  /** @format uri */
  url?: string | null;
}

export interface User {
  /** @format int32 */
  id?: number;
  userName?: string | null;
  password?: string | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title FakeRESTApi.Web V1
 * @version v1
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Activities
     * @name V1ActivitiesList
     * @request GET:/api/v1/Activities
     */
    v1ActivitiesList: (params: RequestParams = {}) =>
      this.request<Activity[], any>({
        path: `/api/v1/Activities`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name V1ActivitiesCreate
     * @request POST:/api/v1/Activities
     */
    v1ActivitiesCreate: (data: Activity, params: RequestParams = {}) =>
      this.request<Activity, any>({
        path: `/api/v1/Activities`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name V1ActivitiesDetail
     * @request GET:/api/v1/Activities/{id}
     */
    v1ActivitiesDetail: (id: number, params: RequestParams = {}) =>
      this.request<Activity, any>({
        path: `/api/v1/Activities/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name V1ActivitiesUpdate
     * @request PUT:/api/v1/Activities/{id}
     */
    v1ActivitiesUpdate: (id: number, data: Activity, params: RequestParams = {}) =>
      this.request<Activity, any>({
        path: `/api/v1/Activities/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Activities
     * @name V1ActivitiesDelete
     * @request DELETE:/api/v1/Activities/{id}
     */
    v1ActivitiesDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Activities/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsList
     * @request GET:/api/v1/Authors
     */
    v1AuthorsList: (params: RequestParams = {}) =>
      this.request<Author[], any>({
        path: `/api/v1/Authors`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsCreate
     * @request POST:/api/v1/Authors
     */
    v1AuthorsCreate: (data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/api/v1/Authors`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsAuthorsBooksDetail
     * @request GET:/api/v1/Authors/authors/books/{idBook}
     */
    v1AuthorsAuthorsBooksDetail: (idBook: number, params: RequestParams = {}) =>
      this.request<Author[], any>({
        path: `/api/v1/Authors/authors/books/${idBook}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsDetail
     * @request GET:/api/v1/Authors/{id}
     */
    v1AuthorsDetail: (id: number, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/api/v1/Authors/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsUpdate
     * @request PUT:/api/v1/Authors/{id}
     */
    v1AuthorsUpdate: (id: number, data: Author, params: RequestParams = {}) =>
      this.request<Author, any>({
        path: `/api/v1/Authors/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authors
     * @name V1AuthorsDelete
     * @request DELETE:/api/v1/Authors/{id}
     */
    v1AuthorsDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Authors/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name V1BooksList
     * @request GET:/api/v1/Books
     */
    v1BooksList: (params: RequestParams = {}) =>
      this.request<Book[], any>({
        path: `/api/v1/Books`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name V1BooksCreate
     * @request POST:/api/v1/Books
     */
    v1BooksCreate: (data: Book, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Books`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name V1BooksDetail
     * @request GET:/api/v1/Books/{id}
     */
    v1BooksDetail: (id: number, params: RequestParams = {}) =>
      this.request<Book, any>({
        path: `/api/v1/Books/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name V1BooksUpdate
     * @request PUT:/api/v1/Books/{id}
     */
    v1BooksUpdate: (id: number, data: Book, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Books/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Books
     * @name V1BooksDelete
     * @request DELETE:/api/v1/Books/{id}
     */
    v1BooksDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Books/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosList
     * @request GET:/api/v1/CoverPhotos
     */
    v1CoverPhotosList: (params: RequestParams = {}) =>
      this.request<CoverPhoto[], any>({
        path: `/api/v1/CoverPhotos`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosCreate
     * @request POST:/api/v1/CoverPhotos
     */
    v1CoverPhotosCreate: (data: CoverPhoto, params: RequestParams = {}) =>
      this.request<CoverPhoto, any>({
        path: `/api/v1/CoverPhotos`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosBooksCoversDetail
     * @request GET:/api/v1/CoverPhotos/books/covers/{idBook}
     */
    v1CoverPhotosBooksCoversDetail: (idBook: number, params: RequestParams = {}) =>
      this.request<CoverPhoto[], any>({
        path: `/api/v1/CoverPhotos/books/covers/${idBook}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosDetail
     * @request GET:/api/v1/CoverPhotos/{id}
     */
    v1CoverPhotosDetail: (id: number, params: RequestParams = {}) =>
      this.request<CoverPhoto, any>({
        path: `/api/v1/CoverPhotos/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosUpdate
     * @request PUT:/api/v1/CoverPhotos/{id}
     */
    v1CoverPhotosUpdate: (id: number, data: CoverPhoto, params: RequestParams = {}) =>
      this.request<CoverPhoto, any>({
        path: `/api/v1/CoverPhotos/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags CoverPhotos
     * @name V1CoverPhotosDelete
     * @request DELETE:/api/v1/CoverPhotos/{id}
     */
    v1CoverPhotosDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/CoverPhotos/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersList
     * @request GET:/api/v1/Users
     */
    v1UsersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/v1/Users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersCreate
     * @request POST:/api/v1/Users
     */
    v1UsersCreate: (data: User, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersDetail
     * @request GET:/api/v1/Users/{id}
     */
    v1UsersDetail: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Users/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersUpdate
     * @request PUT:/api/v1/Users/{id}
     */
    v1UsersUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Users/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name V1UsersDelete
     * @request DELETE:/api/v1/Users/{id}
     */
    v1UsersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/Users/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
