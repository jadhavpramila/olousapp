export class Lead {
  id = "";
  category = "";
  sub_category = [];
  category_name = "";
  sub_categorie_name = "";
  type_of_contract_name = "";
  project_type_name = "";
  appx_area_name = "";
  contractor_turnover_name = "";
  contractor_should_have_done_name = "";
  min_work_value_name = "";
  company_name = "";
  country = "";
  country_code = "";
  country_iso = "";
  state = "";
  state_iso = "";
  city = "";
  lat = "";
  lng = "";
  pin = "";
  status = "";
  address = "";
  min_work_value = 1;
  contact_name = "";
  email = "";
  phone = "";
  requirement = "";
  urgent = false;
  no_of_applicants = 0;

  appx_area = "";
  contractor_should_have_done = "";
  contractor_turnover = "";
  mandatory_location = false;
  project_type = "";
  type_of_contract = "";

  city_state_country = "";
  title = "";
  required_entity_type = 0;
  creator_type = 0;
  last_applied_on = "";
  expires_at = "";
  approved_at = "";
  created_at = "";
  user_id = "";
  encrypted_id = "";

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.category = data.category == undefined ? "" : data.category;
    this.sub_category = data.sub_category == undefined ? [] : data.sub_category;
    this.company_name = data.company_name == undefined ? "" : data.company_name;

    this.country = data.country == undefined ? "" : data.country;

    this.country_code = data.country_code == undefined ? "" : data.country_code;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.state = data.state == undefined ? "" : data.state;
    this.state_iso = data.state_iso == undefined ? "" : data.state_iso;
    this.city = data.city == undefined ? "" : data.city;

    this.lat = data.lat == undefined ? "" : data.lat;
    this.lng = data.lng == undefined ? "" : data.lng;
    this.pin = data.pin == undefined ? "" : data.pin;

    this.address = data.address == undefined ? "" : data.address;

    this.status = data.status == undefined ? "" : data.status;
    this.min_work_value =
      data.min_work_value == undefined ? 1 : data.min_work_value;

    this.contact_name = data.contact_name == undefined ? "" : data.contact_name;
    this.email = data.email == undefined ? "" : data.email;
    this.phone = data.phone == undefined ? "" : data.phone;

    this.requirement = data.requirement == undefined ? "" : data.requirement;
    this.urgent = data.urgent == undefined ? "" : data.urgent;

    this.no_of_applicants =
      data.no_of_applicants == undefined || data.no_of_applicants == null
        ? 0
        : data.no_of_applicants;

    this.appx_area = data.appx_area == undefined ? "" : data.appx_area;
    this.contractor_should_have_done =
      data.contractor_should_have_done == undefined ||
      data.contractor_should_have_done == null
        ? ""
        : data.contractor_should_have_done;
    this.contractor_turnover =
      data.contractor_turnover == undefined ? "" : data.contractor_turnover;
    this.mandatory_location =
      data.mandatory_location == undefined ? false : data.mandatory_location;
    this.project_type = data.project_type == undefined ? "" : data.project_type;
    this.type_of_contract =
      data.type_of_contract == undefined || data.type_of_contract == null
        ? ""
        : data.type_of_contract;

    this.category_name =
      data.category_name == undefined ? "" : data.category_name;
    this.sub_categorie_name =
      data.sub_categorie_name == undefined ? "" : data.sub_categorie_name;
    this.type_of_contract_name =
      data.type_of_contract_name == undefined ? "" : data.type_of_contract_name;
    this.project_type_name =
      data.project_type_name == undefined ? "" : data.project_type_name;
    this.appx_area_name =
      data.appx_area_name == undefined ? "" : data.appx_area_name;
    this.contractor_turnover_name =
      data.contractor_turnover_name == undefined
        ? ""
        : data.contractor_turnover_name;
    this.contractor_should_have_done_name =
      data.contractor_should_have_done_name == undefined
        ? ""
        : data.contractor_should_have_done_name;
    this.min_work_value_name =
      data.min_work_value_name == undefined ? "" : data.min_work_value_name;

    this.city_state_country = this.getFullAddress();
    this.title = data.title == undefined ? "" : data.title;
    this.required_entity_type =
      data.required_entity_type == undefined ? 0 : data.required_entity_type;
    this.creator_type = data.creator_type == undefined ? 0 : data.creator_type;
    this.last_applied_on =
      data.last_applied_on == undefined ? "" : data.last_applied_on;
    this.expires_at = data.expires_at == undefined ? "" : data.undefined;
    this.approved_at = data.approved_at == undefined ? "" : data.approved_at;
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.user_id = data.user_id == undefined ? "" : data.user_id;
    this.encrypted_id = data.encrypted_id == undefined ? "" : data.encrypted_id;
  }

  getFullAddress() {
    let arr = [];
    if (this.city != "") arr.push(this.city);
    if (this.state != "") arr.push(this.state);
    if (this.country != "") arr.push(this.country);
    return arr.join(", ");
  }
}
