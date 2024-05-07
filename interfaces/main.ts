export interface ISliderProps {
  order?: any;
  locale: string;
}

export interface ISocialMediaAccountsProps {
  page?: string;
  itemsPerPage?: string;
  pagination?: string;
  locale: string;
}

export interface IDoctorsProps {
  page?: string;
  itemsPerPage?: string;
  pagination?: string;
  locale: string;
}

export interface IMenuProps {
  order?: string;
  type?: string;
  locale: string;
}

export interface IPaginationProps {
  pageCount: number;
  onPageAction?: any;
  isVisible?: boolean;
}

export interface IContactPostProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  locale: string;
}

export interface IContactProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export interface IDropdownProps {
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  onChange: any;
  name: string;
  options: any;
  value: any;
  process?: boolean;
  icon?: boolean;
}
