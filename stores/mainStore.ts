import Store from "stores";
import { action, makeObservable } from "mobx";
import buildUrl from "build-url";
import { IContactPostProps, IMenuProps, ISliderProps, ISocialMediaAccountsProps, IDoctorsProps } from "interfaces";

export default class MainStore {
  store: Store;
  constructor(store: Store) {
    this.store = store;

    makeObservable(this);
  }

  @action
  public getMenu = async ({ locale, type = "header", order = "asc" }: IMenuProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/menus", {
      queryParams: {
        type: type,
        "order[position]": order,
        "exists[parent]": "false",
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getSlider = async ({ locale, order = "asc" }: ISliderProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/sliders", {
      queryParams: {
        "order[position]": order,
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getSettings = async (locale: string) => {
    const { apiStore } = this.store;

    const url = buildUrl("/settings", {
      queryParams: {
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getFaq = async ({ locale, order = "asc" }: any) => {
    const { apiStore } = this.store;

    const url = buildUrl("/faq_groups", {
      queryParams: {
        "order[position]": order,
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getFaqById = async (locale: string, id: string) => {
    const { apiStore } = this.store;

    const faqId = id.split("/_api/faq_groups/")[1];

    const url = buildUrl("/faq_groups/" + faqId, {
      queryParams: {
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getStaticPages = async (locale: any, slug: any) => {
    const { apiStore } = this.store;

    const url = buildUrl("/pages/" + slug, {
      queryParams: {
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getGalleryCategories = async (locale: string, slug: any) => {
    const { apiStore } = this.store;

    const url = buildUrl("/gallery_categories/" + slug, {
      queryParams: {
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getDoctors = async ({ locale, page = "1", itemsPerPage = "20", pagination = "true" }: IDoctorsProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/doctors", {
      queryParams: {
        page,
        itemsPerPage,
        pagination,
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getSocialMediaAccounts = async ({
    page = "1",
    itemsPerPage = "10",
    pagination = "true",
    locale,
  }: ISocialMediaAccountsProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/social_media_accounts", {
      queryParams: {
        page,
        itemsPerPage,
        pagination,
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public postContact = async (locale: string, values: IContactPostProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/contact_forms", {
      queryParams: {
        locale: locale,
      },
    });

    values.locale = locale;

    const { data, status } = await apiStore.fetch({
      method: "post",
      form: values,
      url: url,
      auth: true,
    });

    return { data, status };
  };
}
