import Store from "stores";
import { action, makeObservable } from "mobx";
import buildUrl from "build-url";
import { ITestimonialsProps } from "interfaces";

export default class TestimonialsStore {
  store: Store;
  constructor(store: Store) {
    this.store = store;

    makeObservable(this);
  }

  @action
  public getTestimonials = async ({
    page = "1",
    itemsPerPage = "6",
    pagination = "false",
    order,
    isShowHomepage,
    locale,
  }: ITestimonialsProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/customer_comments", {
      queryParams: {
        page: page,
        pagination: pagination,
        itemsPerPage: itemsPerPage,
        "order[position]": order,
        isShowHomepage: isShowHomepage,
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
}
