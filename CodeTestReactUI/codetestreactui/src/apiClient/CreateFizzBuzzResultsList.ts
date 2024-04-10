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

import { FizzBuzzResults, } from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";


export class FizzBuzzResultsList<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FizzBuzz
   * @name CreateFizzBuzzResultsListList
   * @request GET:/CreateFizzBuzzResultsList
   */
  createFizzBuzzResultsListList = (
    query?: {
      /** @format int32 */
      startNumber?: number;
      /** @format int32 */
      totalNumbers?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<FizzBuzzResults[], any>({
      path: `/CreateFizzBuzzResultsList`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
