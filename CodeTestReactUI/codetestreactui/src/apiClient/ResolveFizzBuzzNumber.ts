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

import { HttpClient, RequestParams } from "./http-client";

export class ResolveFizzBuzzNumber<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FizzBuzz
   * @name ResolveFizzBuzzNumberList
   * @request GET:/ResolveFizzBuzzNumber
   */
  resolveFizzBuzzNumberList = (
    query?: {
      /** @format int32 */
      
      numberToCheck?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<string, any>({
      path: `/ResolveFizzBuzzNumber`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
