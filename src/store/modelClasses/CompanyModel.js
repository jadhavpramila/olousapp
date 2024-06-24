import { getAwsUrlFromMedia, getAwsUrl } from "../../common/js/getAwsUrl.js";
import { Media } from "./PostModel.js";
import appConstants from "../../appConstants.js";

export class company {
  address = "";
  banner_image = "";
  catalouges = [];
  category = 0;
  city = "";
  company_followers = 0;
  company_type = 0;
  company_user_id = "";
  contacts = [];
  country = "";
  country_iso = "";
  employee_strength = 0;
  gst_number = "";
  is_catalogue_completed = false;
  is_company_stru_completed = false;
  is_compliance_completed = false;
  is_description_completed = false;
  is_experience_completed = false;
  is_financial_info_completed = false;
  is_products_completed = false;
  is_references_completed = false;
  is_registration_completed = false;
  is_resources_completed = false;
  location = "";
  logo = "";
  long_description = "";
  min_work_value = 0;
  name = "";
  processed_banner_image = "";
  processed_logo = null;
  products = [];
  search_rank = 0;
  short_desrciption = "";
  slug = "";
  state = "";
  state_iso = "";
  sub_categories = [];
  turnover = 0;
  website = "";
  social_url = "";

  constructor(data) {
    //console.log("data", data);
    this.address = data.address == undefined ? "" : data.address;
    this.banner_image = data.banner_image == undefined ? "" : data.banner_image;
    this.logo = data.logo == undefined ? "" : data.logo;
    this.processed_banner_image =
      data.processed_banner_image == undefined
        ? ""
        : data.processed_banner_image;
    this.processed_logo =
      data.processed_logo == undefined ? "" : data.processed_logo;
    let result_logo = getAwsUrl(
      appConstants.media_stored_at.MEDIA_PRODUCT,
      this.logo,
      true,
      this.processed_logo
    );
    this.logo = result_logo.awsURL;
    this.social_url = result_logo.social_url;

    let result_banner_image = getAwsUrl(
      appConstants.media_stored_at.MEDIA_PRODUCT,
      this.banner_image,
      true,
      this.processed_banner_image
    );
    this.banner_image = result_banner_image.awsURL;
    // if (this.social_url == "") {
    //   this.social_url = result_banner_image.social_url
    // }
    if (
      data.catalouges !== null &&
      data.catalouges != undefined &&
      data.catalouges.length > 0
    ) {
      for (let cat of data.catalouges) {
        let singleCatalogue = new Catalouges(cat);
        this.catalouges.push(singleCatalogue);
      }
    } else {
      this.catalouges = [];
    }

    this.category = data.category == undefined ? 0 : data.category;
    this.city = data.city == undefined ? "" : data.city;
    this.company_followers =
      data.company_followers == undefined ? 0 : data.company_followers;
    this.company_type = data.company_type == undefined ? 0 : data.company_type;
    this.company_user_id =
      data.company_user_id == undefined ? "" : data.company_user_id;
    if (
      data.contacts !== null &&
      data.contacts != undefined &&
      data.contacts.length > 0
    ) {
      for (let contact of data.contacts) {
        let singleContact = new Contacts(contact);
        this.contacts.push(singleContact);
      }
    } else {
      this.contacts = [];
    }

    this.country = data.country == undefined ? "" : data.country;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.employee_strength =
      data.employee_strength == undefined ? 0 : data.employee_strength;
    this.gst_number = data.gst_number == undefined ? "" : data.gst_number;
    this.is_catalogue_completed =
      data.is_catalogue_completed == undefined
        ? false
        : data.is_catalogue_completed;
    this.is_company_stru_completed =
      data.is_company_stru_completed == undefined
        ? false
        : data.is_company_stru_completed;
    this.is_compliance_completed =
      data.is_compliance_completed == undefined
        ? false
        : data.is_compliance_completed;
    this.is_description_completed =
      data.is_description_completed == undefined
        ? false
        : data.is_description_completed;
    this.is_experience_completed =
      data.is_experience_completed == undefined
        ? false
        : data.is_experience_completed;
    this.is_financial_info_completed =
      data.is_financial_info_completed == undefined
        ? false
        : data.is_financial_info_completed;
    this.is_products_completed =
      data.is_products_completed == undefined
        ? false
        : data.is_products_completed;
    this.is_references_completed =
      data.is_references_completed == undefined
        ? false
        : data.is_references_completed;
    this.is_registration_completed =
      data.is_registration_completed == undefined
        ? false
        : data.is_registration_completed;
    this.is_resources_completed =
      data.is_resources_completed == undefined
        ? false
        : data.is_resources_completed;
    this.location = data.location == undefined ? "" : data.location;

    this.long_description =
      data.long_description == undefined ? "" : data.long_description;
    this.min_work_value =
      data.min_work_value == undefined ? 0 : data.min_work_value;
    this.name = data.name == undefined ? "" : data.name;

    if (
      data.products !== null &&
      data.products != undefined &&
      data.products.length > 0
    ) {
      for (let product of data.products) {
        let singleProduct = new Products(product);
        this.products.push(singleProduct);
      }
    } else {
      this.products = [];
    }

    this.search_rank = data.search_rank == undefined ? 0 : data.search_rank;
    this.short_desrciption =
      data.short_desrciption == undefined ? "" : data.short_desrciption;
    this.slug = data.slug == undefined ? "" : data.slug;
    this.state = data.state == undefined ? "" : data.state;
    this.state_iso = data.state_iso == undefined ? "" : data.state_iso;
    this.sub_categories =
      data.sub_categories == undefined ? [] : data.sub_categories;
    this.turnover = data.turnover == undefined ? 0 : data.turnover;
    this.website = data.website == undefined ? "" : data.website;
  }
}
export class Catalouges {
  id = "";
  media = {};
  name = "";
  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.media = new company_media(data.media);

    this.name = data.name == undefined ? "" : data.name;
  }
}
export class Contacts {
  address = "";
  city = "";
  code = "";
  contact_type = 0;
  coordinates = {
    lng: 0,
    lat: 0,
  };
  country = "";
  designation = null;
  email = "";
  id = "";
  is_primary = false;
  iso_code = {
    country: "",
    state: "",
  };
  locality = "";
  name = "";
  phone = "";
  pin = "";
  state = "";
  constructor(data) {
    this.address = data.address == undefined ? "" : data.address;
    this.city = data.city == undefined ? "" : data.city;
    this.code = data.code == undefined ? "" : data.code;
    this.contact_type = data.contact_type == undefined ? 0 : data.contact_type;
    if (
      data.coordinates != undefined &&
      data.coordinates.lat != undefined &&
      data.coordinates.lng != undefined
    ) {
      this.coordinates.lng = data.coordinates.lng;
      this.coordinates.lat = data.coordinates.lat;
    }
    this.country = data.country == undefined ? "" : data.country;
    this.designation = data.designation == undefined ? "" : data.designation;
    this.email = data.email == undefined ? "" : data.email;
    this.id = data.id == undefined ? "" : data.id;
    this.is_primary = data.is_primary == undefined ? false : data.is_primary;
    if (
      data.iso_code != undefined &&
      data.iso_code.country != undefined &&
      data.iso_code.state != undefined
    ) {
      this.iso_code.country = data.iso_code.country;
      this.iso_code.state = data.iso_code.state;
    }
    this.locality = data.locality == undefined ? "" : data.locality;
    this.name = data.name == undefined ? "" : data.name;
    this.phone = data.phone == undefined ? "" : data.phone;
    this.pin = data.pin == undefined ? "" : data.pin;
    this.state = data.state == undefined ? "" : data.state;
  }
}
export class Products {
  company_category = 0;
  company_id = "";
  company_name = "";
  company_slug = "";
  company_sub_categories = [];
  company_type = 0;
  cover_image = "";
  description = "";
  id = "";
  location = "";
  medias = [];
  name = "";
  order = -1;
  search_keywords = "";
  constructor(data) {
    this.company_category =
      data.company_category == undefined ? 0 : data.company_category;
    this.company_id = data.company_id == undefined ? "" : data.company_id;
    this.company_name = data.company_name == undefined ? "" : data.company_name;
    this.company_slug = data.company_slug == undefined ? "" : data.company_slug;
    this.company_sub_categories =
      data.company_sub_categories == undefined
        ? []
        : data.company_sub_categories;
    this.company_type = data.company_type == undefined ? 0 : data.company_type;
    this.cover_image = data.cover_image == undefined ? "" : data.cover_image;
    this.description = data.description == undefined ? "" : data.description;
    this.id = data.id == undefined ? "" : data.id;
    this.location = data.location == undefined ? "" : data.location;
    if (
      data.medias !== null &&
      data.medias != undefined &&
      data.medias.length > 0
    ) {
      for (let media of data.medias) {
        let singleMedia = new company_media(media);

        this.medias.push(singleMedia);
      }
    } else {
      this.medias = [];
    }
    this.name = data.name == undefined ? "" : data.name;
    this.order = data.order == undefined ? -1 : data.order;
    this.search_keywords =
      data.search_keywords == undefined ? "" : data.search_keywords;
  }
}
export class company_media extends Media {
  is_primary = true;
  mediaPath = null;

  constructor(data) {
    super(data);

    this.is_primary = data.is_primary == undefined ? true : data.is_primary;
    this.mediaPath = data.mediaPath == undefined ? "" : data.mediaPath;
    // getAwsUrlFromMedia(this)
  }
}
