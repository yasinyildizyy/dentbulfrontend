import Store from "stores";
import { action, makeObservable } from "mobx";
import buildUrl from "build-url";
import { IBlogProps } from "interfaces";

export default class BlogStore {
  store: Store;
  constructor(store: Store) {
    this.store = store;

    makeObservable(this);
  }

  @action
  public getBlog = async ({
    parent,
    page = "1",
    itemsPerPage = "8",
    pagination = "false",
    order = "asc",
    locale,
  }: IBlogProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/blog_posts", {
      queryParams: {
        page,
        itemsPerPage,
        pagination,
        "order[writeAt]": order,
        "exists[parent]": parent,
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
  public getBlogPostDetail = async (locale: any, slug: any) => {
    const { apiStore } = this.store;

    const url = buildUrl("/blog_posts/" + slug, {
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
}
