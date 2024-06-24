import { getAwsUrl } from "../../common/js/getAwsUrl.js";
import appConstants from "../../appConstants.js";
import moment from "moment";

export class UserProfileModel {
  // user = "";
  accreditions = {};
  achievements = {};
  interests = [];
  key_skills = {};
  profession_cat = [];
  sectors = [];
  soft_skills = {};
  software_proficiencies = {};
  software_details = [];
  org_details = [];
  user_details = [];
  incomplete_fields = [];
  total_leads_count = 0;
  language_details = [];
  other_details = [];
  softwareProficiencyId = "";
  distinct_profession_with_exp_per = [];
  distinct_sectors_with_exp_per = [];
  user = "";
  id = "";

  constructor(data) {
    // this.user = data.user == undefined ? "" : data.user;
    this.accreditions = new AccreditionsModel(data.accreditions);
    this.achievements = new AchievementsModel(data.achievements);
    this.interests = data.interests == undefined ? [] : data.interests;
    this.other_details =
      data.other_details == undefined
        ? {}
        : new OtherDetailWithShowOtherDetailsModel(data.other_details);
    for (let i = 0; i < data.language_details.length; i++) {
      let language_obj = new LanguageModel(data.language_details[i]);
      this.language_details.push(language_obj);
    }
    this.key_skills = new KeySkillSModel(data.key_skills);
    this.profession_cat =
      data.profession_cat == undefined ? [] : data.profession_cat;
    this.sectors = data.sectors == undefined ? [] : data.sectors;
    this.soft_skills = new SoftSkillSModel(data.soft_skills);

    this.software_proficiencies = new SoftwareProficienciesModel(
      data.software_proficiencies
    );

    this.software_details =
      new SoftwareDetailsListModel().getSoftwareDetailsList(
        data.software_details
      );

    this.org_details =
      data.org_details == undefined
        ? []
        : this.getOrgArrayObject(data.org_details);

    this.user_details =
      data.user_details == undefined
        ? []
        : this.getUsergArrayObject(data.user_details);
    this.incomplete_fields =
      data.incomplete_fields == undefined ? [] : data.incomplete_fields;
    this.total_leads_count =
      data.total_leads_count == undefined ? 0 : data.total_leads_count;
    let arrayObject = [];
    if (
      data.distinct_sectors_with_exp_per != undefined &&
      data.distinct_sectors_with_exp_per.length > 0
    ) {
      for (let item of data.distinct_sectors_with_exp_per) {
        let obj = new sectorsArrayWithExp(item);
        arrayObject.push(obj);
      }
    }

    this.distinct_sectors_with_exp_per = arrayObject;

    let arrayOfObject = [];
    if (
      data.distinct_profession_with_exp_per != undefined &&
      data.distinct_profession_with_exp_per.length > 0
    ) {
      for (let item of data.distinct_profession_with_exp_per) {
        let obj = new professionArrayWithExp(item);
        arrayOfObject.push(obj);
      }
    }

    this.distinct_profession_with_exp_per = arrayOfObject;
    this.user = data.user == undefined ? "" : data.user;
    this.id = data.id == undefined ? "" : data.id;
  }

  getOrgArrayObject(data) {
    let arrayObject = [];
    if (data.length > 0) {
      for (let item of data) {
        let obj = new OrganizationModel(item);
        arrayObject.push(obj);
      }
    }

    return arrayObject;
  }

  getUsergArrayObject(data) {
    let arrayObject = [];
    if (data.length > 0) {
      for (let item of data) {
        let obj = new User(item);
        arrayObject.push(obj);
      }
    }
    return arrayObject;
  }
}
export class sectorsArrayWithExp {
  id = "";
  value = "";
  percentage = 0;
  constructor(data) {
    this.id = data.id == undefined ? [] : data.id;
    this.value = data.value == undefined ? [] : data.value;
    this.percentage = data.percentage == undefined ? 0 : data.percentage;
  }
}
export class professionArrayWithExp {
  id = "";
  value = "";
  percentage = 0;
  constructor(data) {
    this.id = data.id == undefined ? [] : data.id;
    this.value = data.value == undefined ? [] : data.value;
    this.percentage = data.percentage == undefined ? 0 : data.percentage;
  }
}
export class AccreditionModel {
  accredition = "";
  month = "";
  year = "";

  constructor(data) {
    this.accredition = data.accredition == undefined ? "" : data.accredition;
    this.month = data.month == undefined ? "" : data.month;
    this.year = data.year == undefined ? "" : data.year;
  }
}
export class LanguageModel {
  language_name = "";
  language_id = "";
  rating = "";
  id = "";

  constructor(data) {
    this.language_name =
      data.language_name == undefined ? "" : data.language_name;
    this.language_id = data.language_id == undefined ? "" : data.language_id;
    this.rating = data.rating == undefined ? "" : data.rating;
    this.id = data.id == undefined ? "" : data.id;
  }
}

export class OtherDetailModel {
  cv_country_code = "";
  cv_email = "";
  cv_phone = "";
  dob = "";
  constructor(data) {
    this.cv_country_code =
      data.cv_country_code == undefined ? "" : data.cv_country_code;
    this.cv_email = data.cv_email == undefined ? "" : data.cv_email;
    this.cv_phone = data.cv_phone == undefined ? "" : data.cv_phone;

    if (data.dob == undefined || data.dob == null || data.dob == "") {
      this.dob = "";
    } else {
      let lcoaldate = moment
        .utc(data.dob == undefined ? "" : data.dob)
        .local()
        .format("L");
      this.dob = lcoaldate;
    }
    // let lcoaldate = moment
    //   .utc(data.dob == undefined ? "" : data.dob)
    //   .local()
    //   .format("L");
    // this.dob = lcoaldate;
  }
}

export class OtherDetailWithShowOtherDetailsModel {
  show_other_details = false;
  other_details = {};

  constructor(data) {
    this.show_other_details =
      data.show_other_details == undefined ? false : data.show_other_details;
    this.other_details =
      data.other_details == undefined
        ? {}
        : new OtherDetailModel(data.other_details);
  }
}

export class AccreditionsModel {
  id = "";
  accreditions = [];

  constructor(data) {
    if (data == undefined) return;

    let arrayObject = [];
    if (data.accreditions != undefined && data.accreditions.length > 0) {
      for (let item of data.accreditions) {
        let obj = new AccreditionModel(item);
        arrayObject.push(obj);
      }
    }

    this.accreditions = arrayObject;
    this.id = data.id;
  }
}

export class AchievementModel {
  achievement = "";

  constructor(data) {
    this.achievement = data.achievement == undefined ? "" : data.achievement;
  }
}

export class AchievementsModel {
  id = "";
  achievements = [];

  constructor(data) {
    if (data == undefined) return;

    let arrayObject = [];
    if (data.achievements != undefined && data.achievements.length > 0) {
      for (let item of data.achievements) {
        let obj = new AchievementModel(item);
        arrayObject.push(obj);
      }
    }

    this.achievements = arrayObject;
    this.id = data.id;
  }
}

export class KeySkillModel {
  skill = "";

  constructor(data) {
    this.skill = data.skill == undefined ? "" : data.skill;
  }
}

export class KeySkillSModel {
  id = "";
  key_skills = [];

  constructor(data) {
    if (data == undefined) return;

    let arrayObject = [];
    if (data.key_skills != undefined && data.key_skills.length > 0) {
      for (let item of data.key_skills) {
        let obj = new KeySkillModel(item);
        arrayObject.push(obj);
      }
    }

    this.key_skills = arrayObject;
    this.id = data.id;
  }
}

export class SoftSkillModel {
  skill = "";

  constructor(data) {
    this.skill = data.skill == undefined ? "" : data.skill;
  }
}
export class SoftSkillSModel {
  id = "";
  soft_skills = [];

  constructor(data) {
    if (data == undefined) return;

    let arrayObject = [];
    if (data.soft_skills != undefined && data.soft_skills.length > 0) {
      for (let item of data.soft_skills) {
        let obj = new SoftSkillModel(item);
        arrayObject.push(obj);
      }
    }

    this.soft_skills = arrayObject;
    this.id = data.id;
  }
}

export class SoftwareProficiencyModel {
  stars = "0";
  software = "";
  id = "";

  constructor(data) {
    this.stars = data.stars == undefined ? "0" : data.stars;
    this.software = data.software == undefined ? "" : data.software;
    this.id = data.id == undefined ? "" : data.id;
  }
}

export class SoftwareProficienciesModel {
  id = "";
  software_proficiencies = [];

  constructor(data) {
    if (data == undefined) return;

    let arrayObject = [];
    if (
      data.software_proficiencies != undefined &&
      data.software_proficiencies.length > 0
    ) {
      for (let item of data.software_proficiencies) {
        let obj = new SoftwareProficiencyModel(item);
        arrayObject.push(obj);
      }
    }

    this.software_proficiencies = arrayObject;
    this.id = data.id;
  }
}

export class SoftwareDetailsModel {
  id = "";
  software_id = "";
  stars = 0;
  experience = [];
  education = [];
  software_experience = 0;
  software = "";

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.software_id = data.software_id == undefined ? "" : data.software_id;
    this.stars = data.stars == undefined ? 0 : data.stars;
    this.experience = data.experience == undefined ? [] : data.experience;
    this.education = data.education == undefined ? [] : data.education;
    this.software_experience =
      data.software_experience == undefined ? 0 : data.software_experience;
    this.software = data.software == undefined ? "" : data.software;
  }
}

export class SoftwareDetailsListModel {
  getSoftwareDetailsList(data) {
    if (data == undefined) return [];
    let arrayObject = [];

    if (data != undefined && data.length > 0) {
      for (let item of data) {
        let obj = new SoftwareDetailsModel(item);
        arrayObject.push(obj);
      }
    }

    return arrayObject;
  }
}

export class RegisterdOrganizationModel {
  id = "";
  name = "";

  constructor(data) {
    if (data != undefined) {
      this.id = data.id;
      this.name = data.name;
    }
  }
}

export class OrganizationModel {
  id = "";
  address = "";
  current_org = false;
  degree = "";
  degree_id = "";
  department = "";
  department_id = "";
  designation = "";
  designation_id = "";
  end_date = "";
  is_edu_detail = false;
  organization = {};
  profession_cat = [];
  responsibilities = [];
  sectors = [];
  software_proficiencies = [];
  start_date = "";
  year = "";
  city = "";
  country = "";
  country_iso = "";
  country_code = "";
  state = "";
  state_iso = "";

  constructor(data) {
    this.id = data.id == undefined ? "" : data.id;
    this.address = data.address == undefined ? "" : data.address;

    this.current_org = data.current_org;
    this.degree = data.degree == undefined ? "" : data.degree;
    this.degree_id = data.degree_id == undefined ? "" : data.degree_id;
    this.department = data.department == undefined ? "" : data.department;
    this.department_id =
      data.department_id == undefined ? "" : data.department_id;
    this.designation = data.designation == undefined ? "" : data.designation;
    this.designation_id =
      data.designation_id == undefined ? "" : this.designation_id;
    this.end_date = data.end_date == undefined ? "" : data.end_date;
    this.is_edu_detail = data.is_edu_detail;

    this.organization = new RegisterdOrganizationModel(data.organization);

    this.profession_cat =
      data.profession_cat == undefined || data.profession_cat == null
        ? []
        : data.profession_cat;
    this.responsibilities =
      data.responsibilities == undefined || data.responsibilities == null
        ? []
        : data.responsibilities;
    this.sectors =
      data.sectors == undefined || data.sectors == null ? [] : data.sectors;
    this.software_proficiencies =
      data.software_proficiencies == undefined ||
      data.software_proficiencies == null
        ? []
        : data.software_proficiencies;
    this.start_date = data.start_date == undefined ? "" : data.start_date;
    this.year = data.year == undefined ? "" : data.year;
    this.city = data.city == undefined ? "" : data.city;
    this.country = data.country == undefined ? "" : data.country;
    this.country_code = data.country_code == undefined ? "" : data.country_code;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.state = data.state == undefined ? "" : data.state;
    this.state_iso = data.state_iso == undefined ? "" : data.state_iso;
  }
}

export class User {
  id = "";
  email = "";
  first_name = "";
  last_name = "";
  full_name = "";
  name_initials = "";
  is_admin = false;
  is_chat_private = true;
  country_code = "";
  city = "";
  country = "";
  country_iso = "";
  cv_country_code = "";
  interests = [];
  // language_details = [];
  sectors = [];
  numberOfFollowers = 0;
  numberOfFollowings = 0;
  is_pseudo_user = "";
  is_vendor = "";
  parent_user = null;
  designation = "";
  profile_image = "";
  processed_profile_image = "";
  created_at = "";
  about = "";
  phone = null;
  user_rank = 0;
  profession_cat = [];
  software_proficiencies = [];
  cv_email = "";
  cv_phone = "";
  dob = "";
  total_exp = "";
  slug = "";
  is_following = "";

  constructor(data) {
    //console.log(data);
    this.id = data.id == undefined ? "" : data.id;
    this.email = data.email == undefined ? "" : data.email;
    this.first_name = data.first_name == undefined ? "" : data.first_name;
    this.last_name = data.last_name == undefined ? "" : data.last_name;
    this.full_name = this.getFullName();
    this.name_initials = this.getNameInitials();
    this.is_admin = data.is_admin == undefined ? false : data.is_admin;
    this.is_chat_private =
      data.is_chat_private == undefined ? true : data.is_chat_private;
    this.country_code = data.country_code == undefined ? "" : data.country_code;
    this.city = data.city == undefined ? "" : data.city;
    this.country = data.country == undefined ? "" : data.country;
    this.country_iso = data.country_iso == undefined ? "" : data.country_iso;
    this.cv_country_code =
      data.cv_country_code == undefined ? "" : data.cv_country_code;
    this.interests = data.interests == undefined ? [] : data.interests;
    // this.language_details = data.language_details == undefined ? [] : data.language_details;
    this.sectors = data.sectors == undefined ? [] : data.sectors;
    this.numberOfFollowers =
      data.numberOfFollowers == undefined ? 0 : data.numberOfFollowers;
    this.numberOfFollowings =
      data.numberOfFollowings == undefined ? 0 : data.numberOfFollowings;
    this.is_pseudo_user =
      data.is_pseudo_user == undefined ? "" : data.is_pseudo_user;
    this.is_vendor = data.is_vendor == undefined ? "" : data.is_vendor;
    this.parent_user = data.parent_user == undefined ? "" : data.parent_user;
    this.designation = data.designation == undefined ? "" : data.designation;
    this.profile_image =
      data.profile_image == undefined ? "" : data.profile_image;
    this.processed_profile_image =
      data.processed_profile_image == undefined
        ? ""
        : data.processed_profile_image;
    if (this.is_pseudo_user == true) {
      let res = getAwsUrl(
        appConstants.media_stored_at.MEDIA_PRODUCT,
        this.profile_image,
        true,
        this.processed_profile_image
      );
      this.profile_image = res.awsURL;
    } else {
      let res = getAwsUrl(
        appConstants.media_stored_at.MEDIA_IMAGES,
        this.profile_image,
        true,
        this.processed_profile_image
      );
      this.profile_image = res.awsURL;
    }
    this.created_at = data.created_at == undefined ? "" : data.created_at;
    this.about = data.about == undefined ? "" : data.about;
    this.phone = data.phone == undefined ? "" : data.phone;
    this.user_rank = data.user_rank == undefined ? 0 : data.user_rank;
    this.profession_cat =
      data.profession_cat == undefined ? [] : data.profession_cat;
    this.slug = data.slug == undefined ? "" : data.slug;
    this.is_following = data.is_following == undefined ? "" : data.is_following;
    let arrayObject = [];
    if (
      data.software_proficiencies != undefined &&
      data.software_proficiencies.length > 0
    ) {
      for (let item of data.software_proficiencies) {
        let obj = new SoftwareProficiencyModel(item);
        arrayObject.push(obj);
      }
    }

    this.software_proficiencies = arrayObject;
    this.cv_email = data.cv_email == undefined ? "" : data.cv_email;
    this.cv_phone = data.cv_phone == undefined ? "" : data.cv_phone;
    this.dob = data.dob == undefined ? "" : data.dob;
    this.total_exp = data.total_exp == undefined ? "" : data.total_exp;
  }

  getFullName() {
    let fullName = "";
    let firstName = this.first_name.trim();
    let last_name = this.last_name.trim();

    fullName = `${firstName} ${last_name}`;

    let res = fullName.trim();
    return res;
  }

  getNameInitials() {
    let name = "";

    name = `${this.first_name} ${this.last_name}`;
    let nameArray;
    let nameInitial;
    if (name != null) {
      nameArray = name.split(" ");
      if (nameArray.length >= 2) {
        nameInitial =
          nameArray[0].trim().charAt(0).toUpperCase() +
          nameArray[1].trim().charAt(0).toUpperCase();
      } else {
        nameInitial =
          nameArray[0].trim().charAt(0).toUpperCase() +
          nameArray[0].trim().charAt(1).toUpperCase();
      }
    }
    return nameInitial;
  }
}
