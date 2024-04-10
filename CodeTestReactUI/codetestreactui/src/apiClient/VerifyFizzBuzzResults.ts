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

import { FizzBuzzResults } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class VerifyResults<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags FizzBuzz
   * @name VerifyFizzBuzzResultsCreate
   * @request POST:/VerifyFizzBuzzResults
   */
  verifyFizzBuzzResultsCreate = (data: FizzBuzzResults[], params: RequestParams = {}) =>
    this.request<FizzBuzzResults[], any>({
      path: `/VerifyFizzBuzzResults`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
